var ControlBarController = (function() {

	function init(gridster) {

		$('.js-seralize').on('click', function() {
			gridster.remove_all_widgets();
			$.each(serialization, function() {
				gridster.add_widget('<li />', this.size_x, this.size_y, this.col, this.row);
			});
		});

		$('.js-seralize1').on('click', function() {
			var s = gridster.serialize();
			console.log(JSON.stringify(s));
		});

		$("#orderlakestart").on('click', function() {
			$.ajax({
				url : 'service/dataservice/orderlakestart/' + 'run',
				success : function(result) {

					$("#orderlakestart").attr("disabled", "disabled");
					$("#orderlakestart").val('Running');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Status: " + textStatus);
					console.log("Error: " + errorThrown);
				}
			});
		});
		
		$("#datamovestart").on('click', function() {
			
			
			$("#datamovestart").attr("disabled", "disabled");
			$("#datamoveestart").val('Running');
			
			$.ajax({
				url : 'service/dataservice/datamove/' + 'run',
				success : function(result) {
					console.log('data move success');
					
					$("#datamovestart").removeAttr("disabled");
					$("#datamoveestart").val('Start');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Status: " + textStatus);
					console.log("Error: " + errorThrown);
				}
			});
		});
		
		$("#mapreducestart").on('click', function() {
			
			$("#mapreducestart").attr("disabled", "disabled");
			$("#mapreducestart").val('Running');
			
			$.ajax({
				url : 'service/dataservice/mapreduce/' + 'run',
				success : function(result) {
					console.log('map reduce success');
					$("#mapreducestart").removeAttr("disabled");
					$("#mapreducestart").val('Start');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Status: " + textStatus);
					console.log("Error: " + errorThrown);
				}
			});
		});

		$("#cleardatastart").on('click', function() {
			
			$("#cleardatastop").attr("disabled", "disabled");
			$("#cleardatastart").val('Running');
			
			console.log('clear data success');
			$.ajax({
				url : 'service/dataservice/cleardata/' + 'run',
				success : function(result) {

					$("#cleardatastop").removeAttr("disabled");
					$("#cleardatastart").val('Start');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Status: " + textStatus);
					console.log("Error: " + errorThrown);
				}
			});
		});

		$("#orderlakestop").on('click', function() {
			$.ajax({
				url : 'service/dataservice/orderlakestop/' + 'run',
				success : function(result) {

					$("#orderlakestart").removeAttr("disabled");
					$("#orderlakestart").val('Start');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Status: " + textStatus);
					console.log("Error: " + errorThrown);
				}
			});
		});

		$('.runReport').on(
				'click',
				function() {

					var s = gridster.serialize();
					var obj = [];
					$.each(s, function(i, val) {
						var _obj = ReportObjectModel.getModel()[val.id.substring(0, val.id.indexOf("-"))];
						_obj.data = DataObjectModel.get(val.id);
						_obj.context = DataObjectModel.getContext();
						obj.push(_obj);
					});

					// var vis;
					// if (obj[0].type == 'region' || obj[0].type == 'pie' ||
					// obj[0].type == 'grid') {
					// vis = 'vis';
					// } else {
					vis = 'pivot';
					// }

					$('#ui-layout-center').removeClass('ui-layout-center');

					document.getElementById("ui-layout-center").innerHTML = "<iframe id='contentframe' name='list_frame'"
							+ "' frameborder=0 width=100% height=95% scrolling=yes></iframe>";

					var form = $("<form/>").attr({
						method : "post",
						action : "app/view/" + vis + ".jsp",
						target : "list_frame"
					});
					form.append($("<input/>").attr({
						name : "data",
						value : JSON.stringify(obj)
					}));
					$("body").append(form);
					form.submit();

				});

		$('.loginbtn').on('click', function() {
			$(location).attr('href', "http://localhost:8081/bigdata-demo/app/view/login.html");

		});

	}

	return {
		init : init
	};
})();
