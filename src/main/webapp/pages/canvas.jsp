<!DOCTYPE html>
<html>
<title></title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/lib/w3.css">
<link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/css/smartadmin-production.min.6b284d659818.css">
<link rel="stylesheet" href="/css/gray.css">

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<link href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">


<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script>
	if (!window.jQuery) {
		document.write('<script src="/js/jquery/jquery-2.1.1.min.e40ec2161fe7.js"><\/script>');
	}
</script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script>
	if (!window.jQuery.ui) {
		document.write('<script src="/js/jquery/jquery-ui-1.10.3.min.fd2554158395.js"><\/script>');
	}
</script>
<script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
<script src="/js/controller/storeLocationController.js"></script>
<script src="/js/jquery/app.config.19e23cc440c5.js"></script>
<script src="/js/jquery/bootstrap.min.b621c698a1d9.js"></script>
<script src="/js/jquery/SmartNotification.min.30bc74b00a04.js"></script>
<script src="/js/jquery/rcg.jarvis.widget.a2bf3cf239a6.js"></script>
<script src="/js/jquery/jquery.mb.browser.min.f311ebf0f7d6.js"></script>
<script src="/js/jquery/app.min.b9c01545259f.js"></script>
<script src="/js/jquery/map.9b7fa063b457.js"></script>
<script type="text/javascript" src="https://maps.google.com/maps/api/js?key=AIzaSyBUbhj2hMOk2eLsV8NFh7CBzifi_IOn78w"></script>
<script src="http://www.daftlogic.com/script/sandbox-google-maps-marker-lasso-search-tool.js"></script>


<!-- Resources -->
<script src="https://www.amcharts.com/lib/3/amcharts.js"></script>
<script src="https://www.amcharts.com/lib/3/gauge.js"></script>
<script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
<link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css" media="all" />
<script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
<style>
html, body, h1, h2, h3, h4, h5 {
	font-family: "Open Sans", sans-serif
}

.msg {
	font-size: 10px !important
}

.bordertable {
	border-collapse: collapse;
	padding: 3px;
	width: 293px;
}

.bordercell {
	border: 1px solid #ccc;
	padding: 3px;
	font-size: 11px;
	color: #919191;
}

.configmenu {
	display: none;
	border-radius: 0 0 0px 5px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0
		rgba(0, 0, 0, 0.19);
	position: absolute;
	top: 51px;
	right: 0px;
	border-left: 1px solid #ccc;
	padding: 5px;
	border-bottom: 1px solid #ccc;
	width: 300px;
	height: 150px;
	background-color: #fff;
}

ul {
	padding-left: 1.2em;
	margin-top: 0px;
}

#weatherdiv {
	height: 345px;
	overflow: hidden;
	position: relative;
}

#weatherframe {
	position: absolute;
	top: -85px;
	left: -12px;
	width: 1280px;
	height: 1200px;
}

::-webkit-scrollbar {
	width: 10px;
}

::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	/* 	border-radius: 10px; */
}

::-webkit-scrollbar-thumb {
	/* border-radius: 10px; */
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

.fa {
	color: white !important
}

.fa:hover {
	color: black !important
}
</style>
<body class="w3-theme-l5">

	<!-- Modal content-->
	<div class="modal-content" id='salesModal' style="z-index: 1000000; width:700px; height:800px; display: none; position: absolute; top: 15%; right: 40%">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">&times;</button>
			<h4 class="modal-title">&nbsp;&nbsp;&nbsp;&nbsp;Cases Created (Last 24 hours)</h4>
		</div>
		<div class="modal-body">asdasdasd</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal" onclick="salesModalClose()">Close</button>
		</div>
	</div>

	<!-- Navbar -->
	<div class="w3-top">
		<ul class="w3-navbar w3-theme-d2 w3-left-align w3-large" id='applist'>
			<li class="w3-hide-medium w3-hide-large w3-opennav w3-right"><a class="w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a></li>
			<li><a href="/canvas" class="w3-padding-large w3-theme-d4"><i class="fa fa-home w3-margin-right"></i><span id='apptitle'></span></a></li>
			<!-- pages -->
			<li class="w3-hide-small w3-right"><a href="#" class="w3-padding-large w3-hover-white" title="Configure Demo" onclick='configure()'> <i class="fa fa-cogs"></i>

			</a></li>
		</ul>
		<div id='configmenu' class='configmenu' style='padding: 9px; font-size: 11px;'>
			<div style='border: 1px solid #ccc; height: 130px; padding: 10px; border-radius: 0 0 0px 5px;'>
				<table>
					<tr>
						<td nowrap>User Name:&nbsp;</td>
						<td><input id='phone' size=26></td>
					</tr>
					<tr>
						<td nowrap>Phone Number:&nbsp;</td>
						<td><input id='phone' size=26></td>
					</tr>
					<tr>
						<td></td>
						<td align="right" style='padding-top: 5px'>
							<button type="button" class="">
								<i class="fa fa-window-close"></i> &nbsp;Cancel
							</button>
							<button type="button" class="">
								<i class="fa fa-window-restore"></i> &nbsp;Save
							</button>
						</td>
					</tr>
					<tr>
						<td colspan="2"><br> <i class="fa fa-refresh"></i>&nbsp;Refresh Demo</td>
					</tr>
				</table>
			</div>
		</div>

	</div>

	<!-- Navbar on small screens -->
	<div id="navDemo" class="w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top: 51px">
		<ul class="w3-navbar w3-left-align w3-large w3-theme">
			<li><a class="w3-padding-large" href="#" onclick='navigate("stores")'>Stores</a></li>
			<li><a class="w3-padding-large" href="#" onclick='navigate("fleet")'>Fleet</a></li>
			<li><a class="w3-padding-large" href="#" onclick='navigate("customer")'>Customer</a></li>
			<li><a class="w3-padding-large" href="#" onclick='navigate("beacon")'>Beacon</a></li>
			<li><a class="w3-padding-large" href="#" onclick='navigate("social")'>Social</a></li>
			<li><a class="w3-padding-large" href="#" onclick='navigate("sales")'>Sales</a></li>
			<li><a class="w3-padding-large" href="#" onclick='navigate("health")'>Healthcare</a></li>
		</ul>
	</div>

	<!-- Page Container -->
	<div class="w3-container w3-content" style="max-width: 1400px; margin-top: 80px">
		<!-- The Grid -->
		<div class="w3-row">
			<!-- Left Column -->
			<div class="w3-col m3">


				<!-- End Left Column -->
			</div>

			<!-- Middle Column -->
			<div class="w3-col m9">

				<div class="w3-row-padding">
					<div class="w3-col m12">
						<div class="w3-card-2 w3-round w3-white">
							<div class="w3-container w3-padding">




								<div id='main-div-top'></div>

								<script>
									function navigate(currentcontext) {
										$("#bottom-container").show();
										$("#main-div-top").load("/" + currentcontext.toLowerCase() + 'MainTop');
										$("#main-div-bottom").load("/" + currentcontext.toLowerCase() + 'MainBottom');
										$("#right-nav-top").load("/" + currentcontext.toLowerCase() + 'RightNavTop');
									}
								</script>

							</div>
						</div>
					</div>
				</div>



				<div class="w3-container w3-card-2 w3-white w3-round w3-margin" id='bottom-container' style='display: none'>

					<div id='main-div-bottom'></div>

				</div>

				<!-- End Middle Column -->
			</div>

			<!-- Right Column -->
			<div class="w3-col m3">
				<!-- Profile -->
				<div class="w3-card-2 w3-round w3-white">
					<div class="" style='height: 518px; padding-left: 10px; padding-top: 10px !important' id='right-nav-top'></div>
				</div>
				<br>

				<!-- Accordion -->
				<div class="w3-card-2 w3-round">
					<div class="w3-accordion w3-white" style='background-color: #AED5FD !important'>
						<button onclick="myFunction('Demo1')" class="w3-btn-block w3-theme-l1 w3-left-align" id="weatherbtn">
							<i class="fa fa-cloud fa-fw w3-margin-right"></i> Weather<span style='position: relative !important; top: -7px !important; font-size: 9px !important' class="w3-badge w3-center w3-small w3-green">3</span>
						</button>
						<div id="Demo1" class="w3-accordion-content w3-container" style='padding: 0px !important;'>

							<div id="weatherdiv">
								<iframe src="/weather" id="weatherframe" scrolling="no"></iframe>
							</div>

						</div>
						<button onclick="myFunction('Demo2')" class="w3-btn-block w3-theme-l1 w3-left-align">
							<i class="fa fa-car fa-fw w3-margin-right"></i> Traffic<span id='trafficbadge' style='display: none; position: relative !important; top: -7px !important; font-size: 9px !important' class="w3-badge w3-center w3-small w3-red">1</span>
						</button>
						<div id="Demo2" class="w3-accordion-content w3-container" style='padding: 1px !important;'>

							<div id="trafficmap" style='height: 344px'></div>

						</div>
						<button onclick="myFunction('Demo3')" class="w3-btn-block w3-theme-l1 w3-left-align">
							<i class="fa fa-book fa-fw w3-margin-right"></i> News
						</button>
						<div id="Demo3" class="w3-accordion-content w3-container" style='height: 400px; overflow-y: scroll; background-color: #fff; padding: 0px !important; margin: 0px!importnat'>
							<table id='newstable' class='bordertable' style='width: 332px !important'>
								<tr id='newsloading'>
									<td width=20 style='padding: 10px'><img src="/img/wait-small.gif"></td>
									<td style='font-size: 11px; color: #666'>Loading...</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<br>

				<!-- Interests -->
				<!-- <div class="w3-card-2 w3-round w3-white w3-hide-small">
					<div class="w3-container" style='height:368px !important'>
						<p>RCG Highlights</p>
						<p>
							<span class="w3-tag w3-small w3-theme-d5">News</span> <span class="w3-tag w3-small w3-theme-d4">Big Data</span> <span class="w3-tag w3-small w3-theme-d3">Labels</span>
							<span class="w3-tag w3-small w3-theme-d2">Games</span> <span class="w3-tag w3-small w3-theme-d1">Friends</span> <span class="w3-tag w3-small w3-theme">Games</span>
							<span class="w3-tag w3-small w3-theme-l1">Friends</span> <span class="w3-tag w3-small w3-theme-l2">Food</span> <span class="w3-tag w3-small w3-theme-l3">Design</span>
							<span class="w3-tag w3-small w3-theme-l4">Art</span> <span class="w3-tag w3-small w3-theme-l5">Photos</span>
						</p>
					</div>
				</div> -->
				<br>

			</div>

			<!-- End Grid -->
		</div>

		<!-- End Page Container -->
	</div>
	<br>
	<!-- Footer -->
	<!-- 	<footer class="w3-container w3-theme-d3 w3-padding-16">
		<h5>Footer</h5>
	</footer>

	<footer class="w3-container w3-theme-d5">
		<p>
			Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a>
		</p>
	</footer> -->

	<script>
		function salesModalClose() {
			$("#salesModal").hide();
		}
		function configure() {
			$("#configmenu").toggle();
		}

		$("#configmenuclose").click(function() {
			$("#configmenu").hide();
		});

		$(".w3-container").mouseover(function() {
			$("#configmenu").hide();
		});

		function myFunction(id) {

			if (id == 'Demo2') {
				var map = new google.maps.Map(document.getElementById('trafficmap'), {
					zoom : 11,
					mapTypeId : google.maps.MapTypeId.HYBRID,
					center : {
						lat : 34.04924594193164,
						lng : -118.24104309082031
					}
				});

				var trafficLayer = new google.maps.TrafficLayer();
				trafficLayer.setMap(map);
			} else if (id == 'Demo1') {

			} else if (id == 'Demo3') {

				$.ajax({
					url : '/dataservice/news/name',
					type : 'GET',
					success : function(res) {
						$("#newsloading").hide();
						var text = res;
						xmlDoc = $.parseXML(res);
						$(xmlDoc).find("item").each(
								function() {
									var title = $(this).find('title').text();
									var desc = $(this).find('description').text();
									//title = title.substring(0, (title.length / 2));
									var link = $(this).find('link').text();
									var mediaThumbnailUrl;
									var mediaEntries = $(this)[0].getElementsByTagNameNS('*', 'thumbnail');
									for (var j = 0; j < mediaEntries.length; j++) {
										var mediaEntry = mediaEntries[j];
										mediaThumbnailUrl = mediaEntry.attributes.getNamedItem('url').value;
									}

									console.log(desc)

									$('#newstable').append(
											"<tr><td class='bordercell' valign=top style='width:100px'><img width='100' height=100 src='" + mediaThumbnailUrl + "'></td>"
													+ "<td class=bordercell style='width:600px !important'><a href='" + link +  "'><b>" + title + "</b><br>"
													+ desc.substring(desc.lastIndexOf(">") + 1) + "</td></tr>");
								});
					}
				});
			}
			var x = document.getElementById(id);
			if (x.className.indexOf("w3-show") == -1) {
				x.className += " w3-show";
				x.previousElementSibling.className += " w3-theme-d1";
			} else {
				x.className = x.className.replace("w3-show", "");
				x.previousElementSibling.className = x.previousElementSibling.className.replace(" w3-theme-d1", "");
			}
		}

		function openNav() {
			var x = document.getElementById("navDemo");
			if (x.className.indexOf("w3-show") == -1) {
				x.className += " w3-show";
			} else {
				x.className = x.className.replace(" w3-show", "");
			}
		}

		var apps = {
			"title" : "RCG | enable&trade; ",
			"pages" : [ {
				"name" : "stores",
				"icon" : "fa fa-shopping-cart"
			}, {
				"name" : "fleet",
				"icon" : "fa fa-truck"
			}, {
				"name" : "customer",
				"icon" : "fa fa-user"
			}, {
				"name" : "beacon",
				"icon" : "fa fa-feed"
			}, {
				"name" : "social",
				"icon" : "fa icon-credit-card"
			}, {
				"name" : "sales",
				"icon" : "fa fa-globe"
			}, {
				"name" : "health",
				//"icon" : "fa fa-medkit"
				"icon" : "fa fa-car"
			} ]
		};

		$('#apptitle').html(apps.title);
		$('title').html(apps.title);
		$.each(apps.pages, function(index, page) {
			$('#applist').append(
					'<li class="w3-hide-small"><a href="#" onclick="navigate(this.title)" class="w3-padding-large w3-hover-white" title="' + page.name
							+ '"><i class="' + page.icon + '"></i></a></li>');
		});

		navigate('home');
	</script>

</body>
</html>
