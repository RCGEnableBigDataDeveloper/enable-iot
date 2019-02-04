var DataContextController = (function() {

	function init(model) {

		var ddData = [

		{
			text : "Order Database",
			value : 'fs',
			selected : false,
			description : "Realtime simulated order data",
			imageSrc : "images/online_db.png"
		}
/*		, {
			text : "HIVE Database",
			value : 'wag',
			selected : false,
			description : "Hitorical database of all orders",
			imageSrc : "images/online_db.png"
		}*/
		// {
		// text : "Customer Data Mart",
		// value : 'fb',
		// selected : false,
		// description : "<font color=#B02E36>Database Currently
		// Unavailable</font>",
		// imageSrc : "images/offline_db.jpg"
		// }
		];

		$('#datactx').ddslick({
			data : ddData,
			width : 277,
			imagePosition : "left",
			selectedIndex : 0,
			selectText : "<table><tr><td><img src='images/db.png' style='margin-top:2px'/></td><td class='dchead'>Select Data Context</tr></td></table>",
			onSelected : function(data) {

				$('#accordion').accordion({
					collapsible : true,
					active : 1
				});

				$("#jstree2").jstree("destroy");
				$("#jstree2").html('');
				DataObjectsController.init(data.selectedData.value, []);
			}
		});

		$(".dd-pointer").click(function() {
			$('#accordion').accordion({
				collapsible : true,
				active : false
			});
		});
	}

	return {
		init : init
	};
})();
