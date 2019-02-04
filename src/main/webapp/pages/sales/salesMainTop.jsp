<style>
#time-range p {
	font-family: "Arial", sans-serif;
	font-size: 14px;
	color: #333;
}

.ui-slider-horizontal {
	height: 8px;
	background: #D7D7D7;
	border: 1px solid #BABABA;
	box-shadow: 0 1px 0 #FFF, 0 1px 0 #CFCFCF inset;
	clear: both;
	margin: 8px 0;
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	-ms-border-radius: 6px;
	-o-border-radius: 6px;
	border-radius: 6px;
}

.ui-slider {
	position: relative;
	text-align: left;
}

.ui-slider-horizontal .ui-slider-range {
	top: -1px;
	height: 100%;
}

.ui-slider .ui-slider-range {
	position: absolute;
	z-index: 1;
	height: 8px;
	font-size: .7em;
	display: block;
	border: 1px solid #5BA8E1;
	box-shadow: 0 1px 0 #AAD6F6 inset;
	-moz-border-radius: 6px;
	-webkit-border-radius: 6px;
	-khtml-border-radius: 6px;
	border-radius: 6px;
	background: #81B8F3;
	background-image:
		url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgi…pZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
	background-size: 100%;
	background-image: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0%, #A0D4F5),
		color-stop(100%, #81B8F3));
	background-image: -webkit-linear-gradient(top, #A0D4F5, #81B8F3);
	background-image: -moz-linear-gradient(top, #A0D4F5, #81B8F3);
	background-image: -o-linear-gradient(top, #A0D4F5, #81B8F3);
	background-image: linear-gradient(top, #A0D4F5, #81B8F3);
}

.ui-slider .ui-slider-handle {
	border-radius: 50%;
	background: #F9FBFA;
	background-image:
		url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgi…pZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
	background-size: 100%;
	background-image: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0%, #C7CED6),
		color-stop(100%, #F9FBFA));
	background-image: -webkit-linear-gradient(top, #C7CED6, #F9FBFA);
	background-image: -moz-linear-gradient(top, #C7CED6, #F9FBFA);
	background-image: -o-linear-gradient(top, #C7CED6, #F9FBFA);
	background-image: linear-gradient(top, #C7CED6, #F9FBFA);
	width: 22px;
	height: 22px;
	-webkit-box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.6), 0 -1px 0 1px
		rgba(0, 0, 0, 0.15) inset, 0 1px 0 1px rgba(255, 255, 255, 0.9) inset;
	-moz-box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.6), 0 -1px 0 1px
		rgba(0, 0, 0, 0.15) inset, 0 1px 0 1px rgba(255, 255, 255, 0.9) inset;
	box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.6), 0 -1px 0 1px
		rgba(0, 0, 0, 0.15) inset, 0 1px 0 1px rgba(255, 255, 255, 0.9) inset;
	-webkit-transition: box-shadow .3s;
	-moz-transition: box-shadow .3s;
	-o-transition: box-shadow .3s;
	transition: box-shadow .3s;
}

.ui-slider .ui-slider-handle {
	position: absolute;
	z-index: 2;
	width: 22px;
	height: 22px;
	cursor: default;
	border: none;
	cursor: pointer;
}

.ui-slider .ui-slider-handle:after {
	content: "";
	position: absolute;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	top: 50%;
	margin-top: -4px;
	left: 50%;
	margin-left: -4px;
	background: #30A2D2;
	-webkit-box-shadow: 0 1px 1px 1px rgba(22, 73, 163, 0.7) inset, 0 1px 0
		0 #FFF;
	-moz-box-shadow: 0 1px 1px 1px rgba(22, 73, 163, 0.7) inset, 0 1px 0 0
		white;
	box-shadow: 0 1px 1px 1px rgba(22, 73, 163, 0.7) inset, 0 1px 0 0 #FFF;
}

.ui-slider-horizontal .ui-slider-handle {
	top: -.5em;
	margin-left: -.6em;
}

.ui-slider a:focus {
	outline: none;
}

#weatherdiv3 {
	height: 500px;
	overflow: hidden;
	position: relative;
}

#weatherframe3 {
	position: absolute;
	top: -330px;
	left: -150px;
	width: 1280px;
	height: 1200px;
}

#viewdiv3 {
	height: 800px;
	width: 1000px;
	overflow: hidden;
	position: relative;
}

#viewframe3 {
	position: absolute;
	top: -50px;
	left: -30px;
	width: 1000px;
	height: 1200px;
}
</style>
<script>
	function drawSlider(right) {
		$("#slider-range").slider({
			range : true,
			min : 0,
			max : 2300,
			step : 23,
			values : [ 0, right ],
			slide : function(e, ui) {
				var hours1 = Math.floor(ui.values[0] / 60);
				var minutes1 = ui.values[0] - (hours1 * 60);

				if (hours1.length == 1)
					hours1 = '0' + hours1;
				if (minutes1.length == 1)
					minutes1 = '0' + minutes1;
				if (minutes1 == 0)
					minutes1 = '00';
				if (hours1 >= 12) {
					if (hours1 == 12) {
						hours1 = hours1;
						minutes1 = minutes1 + " PM";
					} else {
						hours1 = hours1 - 12;
						minutes1 = minutes1 + " PM";
					}
				} else {
					hours1 = hours1;
					minutes1 = minutes1 + " AM";
				}
				if (hours1 == 0) {
					hours1 = 12;
					minutes1 = minutes1;
				}

				$('.slider-time').html(hours1 + ':' + minutes1);

				var hours2 = Math.floor(ui.values[1] / 60);
				var minutes2 = ui.values[1] - (hours2 * 60);

				if (hours2.length == 1)
					hours2 = '0' + hours2;
				if (minutes2.length == 1)
					minutes2 = '0' + minutes2;
				if (minutes2 == 0)
					minutes2 = '00';
				if (hours2 >= 12) {
					if (hours2 == 12) {
						hours2 = hours2;
						minutes2 = minutes2 + " PM";
					} else if (hours2 == 24) {
						hours2 = 11;
						minutes2 = "59 PM";
					} else {
						hours2 = hours2 - 12;
						minutes2 = minutes2 + " PM";
					}
				} else {
					hours2 = hours2;
					minutes2 = minutes2 + " AM";
				}

				if (hours2 < 10) {
					hours2 = "0" + hours2.toString();
				}

				if (minutes2.length == 1) {
					minutes2 = "0" + minutes2.toString();
				}

				$('.slider-time2').html(hours2 + ':' + minutes2);
			}
		});

		$("#slider-range").slider({
			stop : function(event, ui) {
				document.getElementById("salessliderframe").contentWindow.randomPerson();
			}
		});

	}

	drawSlider(0);
	var slidercount = 100;
	var tweetinterval = setInterval(function() {
		slidercount += 100;
		drawSlider(slidercount)

		$(".slider-time2").html((slidercount < 1000 ? "0" : "") + slidercount / 100 + ":00");

		$.each($(".tweetname"), function(i, elem) {
			var tweetname = ($($($(elem)[0]).html().match(/<b>(.*?)<\/b>/g)[0]).text())
			if (tweetname == 'zigdust2016') {
				document.getElementById("salessliderframe").contentWindow.randomPerson(true);
				clearInterval(tweets);
				clearInterval(tweetinterval);
			} else {
				document.getElementById("salessliderframe").contentWindow.randomPerson(false);
				
			}
		});

		if (slidercount == 2300) {
			clearInterval(tweetinterval);
		}

	}, 3000);

	window.addEventListener("message", receiveMessage, false);
	function receiveMessage(event) {
		console.log(event.data);
		if (event.data && event.data.data.length > 0) {
			$("#weatherdiv3").hide();
			$("#salessliderframe").show();
			$("#time-range").show();
		}
	}
</script>


<div id="weatherdiv3">
	<iframe src="http://13.58.6.124:38888/arc/apps/app/189?sheet=1" id="weatherframe3" scrolling="no"></iframe>
</div>

<div id="time-range" style="display: none">
	Time : <span class="slider-time">00:00</span> - <span class="slider-time2">01:00</span>

	<div class="sliders_step1">
		<div id="slider-range"></div>
	</div>
</div>
<iframe src='/salesSlider' scrolling="no" frameBorder="0" height=450 width=970 id='salessliderframe' style="display: none"></iframe>