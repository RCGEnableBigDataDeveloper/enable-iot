<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<link href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">

<style>
#weatherdiv1 {
	height: 570px;
	overflow: hidden;
	position: relative;
}

#weatherframe1 {
	position: absolute;
	top: -360px;
	left: -140px;
	width: 1280px;
	height: 1200px;
}

#viewdiv {
	height: 800px;
	width: 1000px;
	overflow: hidden;
	position: relative;
}

#viewframe {
	position: absolute;
	top: -50px;
	left: -30px;
	width: 1000px;
	height: 1200px;
}

#report {
	position: relative;
	top: -730px;
	left: 250px;
}

.fa {
	color: white !important
}

.fa:hover {
	color: black !important
}

td, #cases th {
	border: 1px solid #ddd;
	padding: 8px;
}

tr:nth-child(even) {
	background-color: #f2f2f2;
}

#cases tr:hover {
	background-color: #ddd;
}

th {
	padding-top: 12px;
	padding-bottom: 12px;
	text-align: left;
	background-color: #4CAF50;
	color: white;
}
</style>

<button type="button" class="btn btn-danger btn-sm" id="case-btn" style="position: absolute; top: 540px; left: 1145px; z-index: 1000000" onclick="onBtnClick(this)">Report Incident</button>
<button type="button" class="btn btn-primary btn-sm" id="view-btn" data-toggle="modal" data-target="#myModal" style="position: absolute; top: 540px; left: 1255px; z-index: 1000000">Views Cases</button>

<div id="weatherdiv1">
	<iframe src="http://13.58.6.124:38888/arc/apps/app/189?sheet=1" id="weatherframe1" scrolling="no"></iframe>
</div>
<div id='report'>
	<button type="button" class="btn btn-danger" id="case-btn" onclick="onBtnClick(this)">Report Case</button>
	<button type="button" class="btn btn-primary" id="view-btn" data-toggle="modal" data-target="#myModal">Views Cases</button>
	<span id="case-msg"></span>
</div>
<!-- 
&param.STATE.data='Illinois'&param.STATE.exclude=in
 -->



<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog" style="z-index: 100000000000">
	<div class="modal-dialog" style="width: 1000px;">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">&nbsp;&nbsp;&nbsp;&nbsp;Cases Created (Last 24 hours)</h4>
			</div>
			<div class="modal-body">


				<div id="viewdiv">
					<iframe src="http://13.58.6.124:38888/arc/apps/app/242?sheet=1&embed=true&send_message_params=true" id="viewframe" scrolling="no"></iframe>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>

	</div>
</div>

<!-- Modal -->
<div id="myModal2" class="modal fade" role="dialog" style="z-index: 100000000000">
	<div class="modal-dialog" style="width: 1000px;">

		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title">&nbsp;&nbsp;&nbsp;&nbsp;Case Details</h4>
			</div>
			<div class="modal-body">

				<div id="eventdata" style='padding-left: 17px'></div>

				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-danger" id="case-btn" onclick="sendMail('Case Created')" data-dismiss="modal">Report Case</button>
				</div>
			</div>

		</div>
	</div>
</div>

<script>
	function sendMail() {

		var data = {};
		$("#cases > tbody > tr").each(function(row, tr) {

			data[$(tr).find("td")[0].innerText.trim()] = $(tr).find("td")[1].innerText.trim()
		});

		data["notes"] = $("#casedetailtext").val();

		console.log(data)

		$.ajax({
			url : '/dataservice/sendMail/',
			type : "POST",
			contentType : 'application/json',
			data : JSON.stringify(data),
			success : function(result) {
				var posresult = jQuery.parseJSON(result);

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
	}
	function onBtnClick(obj) {
		$("#myModal2").modal();
	}
	window.addEventListener("message", receiveMessage, false);
	function receiveMessage(event) {

		console.log(event.data.data.length)

		if (event.data.type == "parameters" && event.data.data.length == 1) {
			$("#healthrangeslider").hide();
			$("#healthtimeline").css("visibility", "visible");
			//$("#healthtimeline").show();
			
		}

		var fields = Array("transaction_id", "city_name", "state_name", "county_name", "postal_code", "latitude", "longitude", "event_type", "fraud_score");
		var result = event.data.data[0]
		var html = "<table><tr><td valign=top><table id='cases' style='width:500px'>";
		for ( var key in result) {
			if (result.hasOwnProperty(key)) {
				html += "<tr><td>" + fields[key] + "</td><td>" + result[key] + "</td></tr>";
			}
		}
		html += "</table></td><td width=10></td><td><table id='casedetail'><tr><td>Case Details</td></tr><tr><td><textarea id='casedetailtext' rows=15 cols=50></textarea></table></td></tr>"

		$("#eventdata").html(html)
	}
</script>