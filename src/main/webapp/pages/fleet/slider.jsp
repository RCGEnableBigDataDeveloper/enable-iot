<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>ValueMart</title>
<meta name="description" content="Responsive tabbed layout component built with some CSS3 and JavaScript">
<link rel="stylesheet" href="/css/style.min.css">
<link rel="stylesheet" href="/css/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="/css/style.css" media="screen" />
<link href="http://ghusse.github.io/jQRangeSlider/css/style.css" rel="stylesheet" media="screen">
<link href="http://ghusse.github.io/jQRangeSlider/css/demo.css" rel="stylesheet" media="screen">
<link href="http://ghusse.github.io/jQRangeSlider/stable/css/iThing.css" rel="stylesheet" media="screen">
<link rel="stylesheet" href="/css/jsPlumbToolkit-defaults.css">

<link rel="stylesheet" href="/css/main.css">
<link rel="stylesheet" href="/css/gray.css">
<link rel="stylesheet" href="/css/enable.css">
<link rel="stylesheet" href="/css/jquery.contextmenu.css">
<link rel="stylesheet" href="/css/jquery-ui.css">
<link rel="stylesheet" href="/css/jquery.dataTables.min.css">

<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" href="/favicon.png">

<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
<script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>


<link rel="stylesheet" href="http://fontawesome.io/3.2.1/assets/font-awesome/css/font-awesome.css">
<link rel="stylesheet" href="/css/bootstrap.min.css">


<script src="http://code.jquery.com/jquery-2.1.0.min.js"></script>

<script src="http://code.jquery.com/ui/1.10.4/jquery-ui.min.js"></script>

<link rel="stylesheet" href="../../css/themes/default/easyui.css">

<script type="text/javascript" src="https://www.google.com/jsapi?key=AIzaSyBUbhj2hMOk2eLsV8NFh7CBzifi_IOn78w"></script>
<script src="/js/lib/jquery/jquery.ui/jquery-ui.js"></script>


<style>
.ui-rangeSlider-label-value {
	font-size: 12px !important;
}

.custom-popup .leaflet-popup-content-wrapper {
	background: #2c3e50;
	color: #fff;
	font-size: 16px;
	line-height: 24px;
	padding-left: 5px;
}

.custom-popup .leaflet-popup-content-wrapper a {
	color: rgba(255, 255, 255, 0.5);
}

.custom-popup .leaflet-popup-tip-container {
	width: 30px;
	height: 15px;
	fill: steelblue;
}

.custom-popup .leaflet-popup-tip {
	/* 	border-left: 15px solid transparent;
	border-right: 15px solid transparent;
	border-top: 15px solid #2c3e50; */
	background-color: #2c3e50;
	color: #2c3e50;
}

#chart, #chart2 rect {
	fill: steelblue;
}

.leaflet-popup-content {
	margin: 5px 0px !important;
	line-height: 1.4 !important;
}

.value {
	font: 10px sans-serif;
	fill: #fff;
}

.label {
	font: 10px sans-serif;
	fill: #999;
}

.axis text {
	fill: rgb(128, 128, 128);
}

a:hover, a:visited, a:link, a:active {
	text-decoration: none
}

#floating-panel {
	position: absolute;
	top: 10px;
	left: 25%;
	z-index: 5;
	background-color: #fff;
	padding: 5px;
	border: 1px solid #999;
	text-align: center;
	font-family: 'Roboto', 'sans-serif';
	line-height: 30px;
	padding-left: 10px;
}

</style>


<script type="text/javascript">
	function mapCallback(location, number) {
		$("#mappanel").append("<tr><td>" + location + "</td></tr>");
	}

	function mapCallbackClear() {
		$("#mappanel").html('');
	}
	var _gaq = _gaq || [];
	_gaq.push([ '_setAccount', 'UA-276644-8' ]);
	_gaq.push([ '_trackPageview' ]);

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>


<!-- Place this tag in your head or just before your close body tag -->
<script type="text/javascript" src="https://apis.google.com/js/plusone.js">
	{
		lang: 'en-GB'
	}
</script>

</head>
<body onload="">


	<div class="container" style="width: 100%; border: 0px solid #ccc; padding-bottom: 25px">


		<div class="sliderContainer" style='margin-bottom: 15px !important'>
			<div id="dateSlider1"></div>
		</div>
		<table style='width: 100%;' id='historytable' class='bordertable'>
			<tr>
				<td>No Data</td>
			</tr>
		</table>
	</div>


	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQRangeSliderMouseTouch.js"></script>
	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQRangeSliderDraggable.js"></script>
	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQRangeSliderHandle.js"></script>
	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQRangeSliderBar.js"></script>
	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQRangeSliderLabel.js"></script>
	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQRangeSlider.js"></script>

	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQDateRangeSliderHandle.js"></script>
	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQDateRangeSlider.js"></script>

	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQEditRangeSliderLabel.js"></script>
	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQEditRangeSlider.js"></script>

	<script src="http://ghusse.github.io/jQRangeSlider/stable/jQRuler.js"></script>


	<!-- 	<script>
		$("#tags").autocomplete(
				{
					source : availableTags,
					select : function(event, ui) {
						ForecastController.makeInventoryChart($("#invstates")
								.find(":selected").text(), ui.item.label, $(
								"#invstates").find(":selected").val(),
								ui.item.value, ui.item.price);
						$("#tags").val(ui.item.label);
						return false;
					},
					focus : function(event, ui) {
						return false;
					},
					open : function() {
						$('.ui-autocomplete').css('width', '500px');
						$('.ui-autocomplete').css('fontSize', '11px');
					}
				});

		$('#productlist').html('');
		ForecastController.getProducts();

		var inventoryfeed = setInterval(inventoryfeedReader, 3000);
		function inventoryfeedReader() {
			ForecastController.init();
		}
	</script> -->
	<script src="/js/controller/fleetController.js"></script>
	<script>
		var today = new Date();
		(function($) {
			var Months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

			$(document).ready(function() {
				$("#dateSlider1").dateRangeSlider({
					bounds : {
						min : new Date(2018, 0, 1),
						max : new Date(2018, 11, 31, 12, 59, 59)
					},
					defaultValues : {
						min : new Date(2018, 0, 1),
						max : today
					},
					scales : [ {
						next : function(val) {
							var next = new Date(val);
							return new Date(next.setMonth(next.getMonth() + 1));
						},
						label : function(val) {
							return Months[val.getMonth()];
						}
					} ]
				});
			});

			var start = new Date(2018, 0, 1);
			var end = new Date();
			var startMonth = ((start.getMonth() + 1) < 10) ? "0" + ((start.getMonth() + 1)) : (start.getMonth() + 1);
			var endMonth = ((end.getMonth() + 1) < 10) ? "0" + ((end.getMonth() + 1)) : (end.getMonth() + 1);
			var startMonthStr = startMonth + "/" + start.getDate() + "/" + start.getFullYear();
			var endMonthStr = endMonth + "/" + end.getDate() + "/" + end.getFullYear();
			ForecastController.init(startMonthStr, endMonthStr);

		})(jQuery);

		$("#dateSlider1").bind("valuesChanging", function(e, data) {
			// console.log("Something moved. min: " + data.values.min +
			// " max: " + data.values.max);

			var start = new Date(data.values.min);
			var end = new Date(data.values.max);

			var startMonth = ((start.getMonth() + 1) < 10) ? "0" + ((start.getMonth() + 1)) : (start.getMonth() + 1);
			var endMonth = ((end.getMonth() + 1) < 10) ? "0" + ((end.getMonth() + 1)) : (end.getMonth() + 1);
			var startMonthStr = startMonth + "/" + start.getDate() + "/" + start.getFullYear();
			var endMonthStr = endMonth + "/" + end.getDate() + "/" + end.getFullYear();

			ForecastController.init(startMonthStr, endMonthStr);

		});

		$("#dateSlider1").bind("valuesChanged", function(e, data) {
			// console.log("Values just changed. min: " +
			// data.values.min + " max: " + data.values.max);
			var start = new Date(data.values.min);
			var end = new Date(data.values.max);

			var startMonth = ((start.getMonth() + 1) < 10) ? "0" + ((start.getMonth() + 1)) : (start.getMonth() + 1);
			var endMonth = ((end.getMonth() + 1) < 10) ? "0" + ((end.getMonth() + 1)) : (end.getMonth() + 1);
			var startMonthStr = startMonth + "/" + start.getDate() + "/" + start.getFullYear();
			var endMonthStr = endMonth + "/" + end.getDate() + "/" + end.getFullYear();

			var timelinedates = ForecastController.init(startMonthStr, endMonthStr);

			var timelinerows = $("#historytable").find('tr');

		});
	</script>
</body>
</html>