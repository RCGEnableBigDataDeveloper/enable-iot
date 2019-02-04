<style>
html {
	font-family: Roboto Condensed;
}

.tl-headline {
	font-size: 10px !important;
}

.ui-rangeSlider-bar {
	background-color: red !important;
	color: red !important;
}
</style>
<!-- 1 -->
<link title="timeline-styles" rel="stylesheet" href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css">

<!-- 2 -->
<script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js"></script>


<div id='timeline-embed' style="width: 101%; height: 330px"></div>
<div style="position: absolute; top: 0px; left: 0px; height: 60px; width: 100%; background-color: #F2F2F2; z-index: 1000000000">&nbsp;</div>

<div style="position: absolute; top: 0px; left: 0px; height: 500px; width: 100%; background-color: #fff; z-index: 1000000001" id='timelinewait'>
	<br> <br> <br> <br> <br>
	<div>
		<table>
			<tr>
				<td width=60% rowspan=2></td>
				<td align=center><img src="/img/ajax-lazy-loader-gray.gif"></td>
			</tr>
			<tr>
				<td align=center style='font-family: century gothic; color: #999'><span style="position: relative; top: -100px">Loading Timeline.. Please Wait</span></td>
			</tr>
		</table>
	</div>
</div>


<!-- 3 -->
<script type="text/javascript">
	setTimeout(function() {
		var storedRows = localStorage.getItem("timelinerows");
		var json = JSON.parse(storedRows);
		maketimeline(json)
		$('#timelinewait').hide();
	}, 2000);

	function onLoad(_timelinerows_) {

		$('#timelinewait').show();
		myVar = setTimeout(alertFunc, 2000);

		function alertFunc() {
			$('#timelinewait').hide();
		}

		var timelineevents = [];
		for (var i = 1; i < _timelinerows_.length; i++) {
			var timelineentry = '';
			var timelinedetail = $(_timelinerows_[i]).find('td');
			var startDateTimeline = new Date(timelinedetail[1].innerText);

			var endDateTimeline = new Date(timelinedetail[1].innerText)
			endDateTimeline.setDate(endDateTimeline.getDate() + 1)

			var timelinejson = {
				"start_date" : {
					"month" : startDateTimeline.getMonth(),
					"day" : startDateTimeline.getDate(),
					"year" : startDateTimeline.getYear()
				},
				"text" : {
					"headline" : timelinedetail[3].innerText + "<br>" + timelinedetail[2].innerText,
					"text" : ""
				},
				"media" : {
					"thumbnail" : "/img/hospital.png"
				},
			}

			timelineevents.push(timelinejson);
		}

		/* 	console.log({
				"events" : timelineevents
			});
		 */

		maketimeline(timelineevents)

	}

	function maketimeline(timelineevents) {

		var additionalOptions = {
			/* 		start_at_end : true,
					default_bg_color : {
						r : 0,
						g : 0,
						b : 0
					}, */

			timenav_height : 300,
			timenav_width : 1000,
			duration : 0,
			start_at_slide : 3,
			scale_factor : 1,
			initial_zoom : 0
		}
		var timeline_json = {
			"events" : timelineevents
		};
		window.timeline = new TL.Timeline('timeline-embed', timeline_json, additionalOptions);

		$(".tl-timemarker-content").click(function(e) {
			console.log(e);
		});
	}
</script>