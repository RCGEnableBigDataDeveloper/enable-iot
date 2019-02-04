var map;
var points = [];
var pointsrand = [];
var addrsrand = [];
var areaDiv = document.getElementById('area');
var areaDivkm = document.getElementById('areakm');
var randomMarkers = new Array(0);
var routeMarkers = new Array(0);
var lines = [];
var lineColor = '#016195';
var fillColor = '#eee';
var lineWidth = 4;
var polygon;
var routePath;
var routePath2;
var ShowHideONOFF = 0;
var radiansPerDegree = Math.PI / 180.0;
var degreesPerRadian = 180.0 / Math.PI;
var earthRadiusMeters = 6367460.0;
var metersPerDegree = 2.0 * Math.PI * earthRadiusMeters / 360.0;
var metersPerKm = 1000.0;
var meters2PerHectare = 10000.0;
var feetPerMeter = 3.2808399;
var feetPerMile = 5280.0;
var acresPerMile2 = 640;
var trafficLayer;
var truckfeed;
var directionsDisplay;
var routeCoords = [];
var step = 0;
var myMap = new Map();
var markers = [];
var imgcounter = 0;
var myVar

function randomDate(rangeOfDays, startHour, hourRange) {
	var today = new Date(Date.now());
	return new Date(today.getYear() + 1900, today.getMonth(), today.getDate() + Math.random() * rangeOfDays, Math
			.random()
			* hourRange + startHour, Math.random() * 60);
}

var lat = 36.1627;
var lng = -86.7816;

var incr = .0001;



var lats = [41.881832,41.882832,41.883832,41.879832, 41.876832, 41.876932, 41.876872, 41.876892, 41.876892, 41.876892, 41.876892, 41.8722, 41.8663,41.8726,41.8730,41.8787,41.8786,41.8698,41.8776,41.8895,41.8895,41.8826,41.8842];
var lngs = [ -87.623177, -87.624177, -87.625177, -87.620177,-87.630177,-87.631177,-87.632177,-87.633177,-87.643177,-87.640177,-87.639177, -87.6188, -87.6068, -87.6247,-87.6261,-87.6403,-87.6471,-87.6475,-87.6385,-87.6338,-87.6374,-87.6303];

function _initialize() {

	var coords = [];
	
	
	var c = {"addr":"250 S Colonial Dr Alabaster AL 35007","data":"00000,Alabaster ValueMart,250 S Colonial Dr,Alabaster,AL,35007,0^3|100^50|48^250|1011^40,4201 Westown Pkwy West Des Moines IA 50266"};
	
	
	  var image = new google.maps.MarkerImage('/img/truckmove.png',
	
							// This marker is 20 pixels wide by 32 pixels tall.
							new google.maps.Size(16, 16),
							// The origin for this image is 0,0.
							new google.maps.Point(0, 0),
							// The anchor for this image is the base of the
							// flagpole at 0,32.
							new google.maps.Point(0, 32));
							var shadow = new google.maps.MarkerImage('/img/truckmove.png',
							// The shadow image is larger in the horizontal
							// dimension
							// while the position and offset are the same as for
							// the main image.
							new google.maps.Size(16,16), new google.maps.Point(0, 0), new google.maps.Point(0, 0));
							
	
	myVar  = setInterval(function(){ 
 
		 ClearAllPoints()
		 
		 ShowHideONOFF = 0
		 ShowHide()
		  
		for (var key of myMap.keys()) {
			 
			
			var m = myMap.get(key)
			  m.setMap(null);
			  
			
			
// var myLatLng = {lat:m.data.x +.01, lng: m.data.y + .01};
// var marker = new google.maps.Marker({
// position: myLatLng,
// map: map,
// icon : image,
// title: ''
//			 
// });
			  
			}
		
		

		for(var i =0; i < lats.length; i++){

			
			var image = new google.maps.MarkerImage('/img/truckmove.png',

					// This marker is 20 pixels wide by 32 pixels tall.
					new google.maps.Size(16, 16),
					// The origin for this image is 0,0.
					new google.maps.Point(0, 0),
					// The anchor for this image is the base of the flagpole at
					// 0,32.
					new google.maps.Point(0, 32));
					var shadow = new google.maps.MarkerImage('/img/truckmove.png',
					// The shadow image is larger in the horizontal dimension
					// while the position and offset are the same as for the
					// main image.
					new google.maps.Size(16,16), new google.maps.Point(0, 0), new google.maps.Point(0, 0));
					
					
			if(i % 2 == 0)
				incr = -incr
			

			var myLatLng = {lat: lats[i] + incr, lng: lngs[i]+ incr};
			  var marker = new google.maps.Marker({
		       position: myLatLng,
		       map: map,
		       icon : image,
		       title: ''
		    	   
		     });
			  
			  markers.push(marker);
			  
				myMap.set(lats[i] +"," + lngs[i], marker);
				
				
				
				// console.log("incr : " +incr)
		}	
		
		incr = incr + .0001;
		
		imgcounter++;
	
	}, 3000);
	
	
	
	$
			.get(
					'/data/latlng.txt',
					function(data) {

						var lines = data.split("\n");
						var i = 0;
						var geocoder = new google.maps.Geocoder();

						$
								.each(
										lines,
										function(n, elems) {

											var deliveryAddrArr = elems.split(",");

											var address = deliveryAddrArr[2] + " " + deliveryAddrArr[3] + " "
													+ deliveryAddrArr[4] + " " + deliveryAddrArr[5];
											geocoder
													.geocode(
															{
																'address' : address
															},
															function(results, status) {

																if (status == google.maps.GeocoderStatus.OK) {

																	var latitude = results[0].geometry.location.lat();
																	var longitude = results[0].geometry.location.lng();

																	$("#deliverylist")
																			.append(
																					"<div class='deliverylistCss' id='deliverydef"
																							+ i
																							+ "' style='width : 100%; border-bottom : 1px solid #ccc; cursor: pointer;'>"
																							+ "pos: " + latitude
																							+ "&nbsp;|&nbsp;"
																							+ longitude + "<br>dest: "
																							+ address + "</div>");

																	$(".deliverylistCss").mouseover(function() {
																		$(this).css('background-color', '#eee');
																	});

																	$(".deliverylistCss").mouseout(function() {
																		$(this).css('background-color', '#fff');
																	});

																	$(".deliverylistCss").click(function() {
																		ShowHidePosition($(this)[0]);
																	});

																	coords.push({
																		x : latitude,
																		y : longitude,
																		addr : address,
																		data : elems
																	});
																
																	initialize(coords);
																	i++;
																}
															});

										});

						$(".traffichide").click(function() {
							trafficLayer.setMap(null);
						});

						$(".trafficshow").click(function() {
							trafficLayer.setMap(map);
						});

					}).fail(function() {
				console.log("cant find latlng file for " + result.toLocaleLowerCase());
			});
}

function showRoute(origin, destination) {
	
	console.log(origin)

	var directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer({
		preserveViewport : true,
		suppressMarkers : true
	});
	/*
	 * var map = new google.maps.Map(document.getElementById('map_canvas'), {
	 * zoom : 7, center : { lat : 41.85, lng : -87.65 } });
	 */
	directionsDisplay.setMap(map);
	calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination);

	var onChangeHandler = function() {

		$('#gpsimg').attr('src', '../../images/gps2.jpg');

		setTimeout(function() {
			$('#gpsimg').attr('src', '../../images/gps1.jpg');
		}, 4000);
		
		console.log(directionsService)
		directionsDisplay.setMap(null);
		var _step_ = routeCoords[step];
		routeCoords = [];
		
		var directionsService = new google.maps.DirectionsService;
		directionsDisplay = new google.maps.DirectionsRenderer({
			preserveViewport : true,
			suppressMarkers : true
		});
		/*
		 * var map = new google.maps.Map(document.getElementById('map_canvas'), {
		 * zoom : 7, center : { lat : 41.85, lng : -87.65 } });
		 */
		directionsDisplay.setMap(map);
		
		$("#truckdest").html("Norridge, IL");
		
		calculateAndDisplayRoute(directionsService, directionsDisplay, _step_, 'norridge, il');
	};
	
	document.getElementById('reroute').addEventListener('click', onChangeHandler);

// document.getElementById('end').addEventListener('change', onChangeHandler);

}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {

	// var e = document.getElementById('end');
	// destination = e.options[e.selectedIndex].value;

	directionsService.route({
		origin : origin,
		destination : destination,
		travelMode : google.maps.TravelMode.DRIVING
	}, function(response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			var path = response.routes[0].overview_path;
			var legs = response.routes[0].legs;

			for (i = 0; i < legs.length; i++) {
				var steps = legs[i].steps;
				for (j = 0; j < steps.length; j++) {
					var nextSegment = steps[j].path;
					var nextSegment = steps[j].path;

					for (k = 0; k < nextSegment.length; k++) {
						routeCoords.push({
							lat : nextSegment[k].lat(),
							lng : nextSegment[k].lng()
						})
					}
				}
			}

		} else {
			window.alert('Directions request failed due to ' + status);
		}
	});

	map.setZoom(11);
}

function initialize(coords) {
	
	
	pointdata = coords;

	var latlng = new google.maps.LatLng(pointdata[0].x, pointdata[0].y);
	var myOptions = {
		zoom : 5,
		// center : latlng,
		center : new google.maps.LatLng(39.50, -98.35),
		mapTypeId : google.maps.MapTypeId.HYBRID,
		draggableCursor : 'crosshair',
		mapTypeControlOptions : {
			style : google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	map.poi = function(state){

		  var styles = [
		    {
		      "featureType": "transit",
		      "stylers": [
		        { "visibility": "off" }
		      ]
		    },{
		      "featureType": "poi",
		      "stylers": [
		        { "visibility": "off" }
		      ]
		    },{
		      "featureType": "landscape",
		      "stylers": [
		        { "visibility": "off" }
		      ]
		    }
		  ];

		  this.set("styles", (state)? {} : styles );

		}

	
	map.poi(false);
	
	// map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
	google.maps.event.addListener(map, 'click', mapclick);

	

for(var i =0; i < lats.length; i++){

	
	var image = new google.maps.MarkerImage('/img/truckmove.png',

			// This marker is 20 pixels wide by 32 pixels tall.
			new google.maps.Size(16, 16),
			// The origin for this image is 0,0.
			new google.maps.Point(0, 0),
			// The anchor for this image is the base of the flagpole at 0,32.
			new google.maps.Point(0, 32));
			// var shadow = new google.maps.MarkerImage('/img/truckmove.png',
			// The shadow image is larger in the horizontal dimension
			// while the position and offset are the same as for the main image.
			// new google.maps.Size(16,16), new google.maps.Point(0, 0), new
			// google.maps.Point(0, 0));
			
	

	var myLatLng = {lat: lats[i], lng: lngs[i]};
	  var marker = new google.maps.Marker({
       position: myLatLng,
       map: map,
       icon : image,
       title: ''
    	   
     });
	  
	  markers.push(marker);
	  
		myMap.set(lats[i] +"," + lngs[i], marker);
}	
	 

// areaDiv.innerHTML = '0 m&sup2;';
// areaDivkm.innerHTML = '0 km&sup2;';

	Display();
	ShowHide();
	// delay by 200ms!
	setTimeout('Regen()', 2000);
}
function Regen() {
	ShowHide()
	var bounds = map.getBounds();
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();
	var lngSpan = northEast.lng() - southWest.lng();
	var latSpan = northEast.lat() - southWest.lat();

	$.each(pointdata, function(i, val) {

		var point = new google.maps.LatLng(val.x, val.y);

		google.maps.event.addListener(point, 'click', pointClick);

		pointsrand.push({
			point : point,
			data : val
		});
		addrsrand.push(val.addr);
	});

}
function mapclick(event) {
	points.push(event.latLng);
	ShowHideONOFF = 0;
	Display();
}

function pointClick(event) {
	console.log(event);
}

function SearchPointsAdd() {

	if (!(polygon == undefined)) {
		if (randomMarkers) {
			for (i in randomMarkers) {
				randomMarkers[i].setMap(null);
			}
		}

		for (var i = 0; i < pointsrand.length; ++i) {
			if (polygon.containsLatLng(pointsrand[i].point)) {

				// console.log(pointsrand[i]);
				parent.$(parent.document).trigger("mapwindowclose", addrsrand[i]);

				var marker = placeMarkerred(pointsrand[i], i);
				randomMarkers.push(marker);
				marker.setMap(map);
			}
		}
	}
}
function Display() {
	if (routeMarkers) {
		for (i in routeMarkers) {
			routeMarkers[i].setMap(null);
		}
	}

	if (!(routePath == undefined)) {
		routePath.setMap(null);
	}

	if (!(routePath2 == undefined)) {
		routePath2.setMap(null);
	}

	if (!(polygon == undefined)) {
		polygon.setMap(null);
	}

	routePath = new google.maps.Polyline({
		path : points,
		strokeColor : lineColor,
		strokeOpacity : 1.0,
		strokeWeight : lineWidth,
		geodesic : true
	});
	routePath.setMap(map);

	if (points.length > 2) {
		var points2 = [ points[0], points[points.length - 1] ];

		routePath2 = new google.maps.Polyline({
			path : points2,
			strokeColor : lineColor,
			strokeOpacity : 1.0,
			strokeWeight : lineWidth,
			geodesic : true
		});
		routePath2.setMap(map);

		polygon = new google.maps.Polygon({
			paths : points,
			strokeColor : "#eee",
			strokeOpacity : 1,
			strokeWeight : 1,
			fillColor : fillColor,
			fillOpacity : 0.5
		});

		polygon.setMap(map);

		areaDiv.innerHTML = '&nbsp;';
		areaDivkm.innerHTML = '&nbsp;';
		var areaMeters2 = SphericalPolygonAreaMeters2(points);
		if (areaMeters2 < 1000000.0)
			areaMeters2 = PlanarPolygonAreaMeters2(points);
		// update display for area
		areaDiv.innerHTML = Areas(areaMeters2);
		areaDivkm.innerHTML = Areaskm(areaMeters2);
	}
	lines = [];
	routeMarkers = new Array(0);
	for (var i = 0; i < points.length; ++i) {
		var marker = placeMarker(points[i], i);

		marker.addListener('click', function() {
			map.setZoom(7);
			map.setCenter(marker.getPosition());
			console.log(marker);
		});

		routeMarkers.push(marker);
		marker.setMap(map);
	}

	SearchPointsAdd();
}
function ClearAllPoints() {
	if (randomMarkers) {
		for (i in randomMarkers) {
			randomMarkers[i].setMap(null);
		}
	}

	if (routeMarkers) {
		for (i in routeMarkers) {
			routeMarkers[i].setMap(null);
		}
	}

	if (!(routePath == undefined)) {
		routePath.setMap(null);
	}

	if (!(routePath2 == undefined)) {
		routePath2.setMap(null);
	}

	if (!(polygon == undefined)) {
		polygon.setMap(null);
	}

	routeMarkers = new Array(0);
	routePath = null;
	routePath2 = null;
	polygon = null;
	points = [];
}
function DeleteLastPoint() {
	if (points.length > 0)
		points.length--;
	Display();
}
function placeMarker(location, number) {
	var image = new google.maps.MarkerImage('/img/handle_white.png',
	// This marker is 20 pixels wide by 32 pixels tall.
	new google.maps.Size(20, 34),
	// The origin for this image is 0,0.
	new google.maps.Point(0, 0),
	// The anchor for this image is the base of the flagpole at 0,32.
	new google.maps.Point(9, 33));
	var shadow = new google.maps.MarkerImage('',
	// The shadow image is larger in the horizontal dimension
	// while the position and offset are the same as for the main image.
	new google.maps.Size(28, 22), new google.maps.Point(0, 0), new google.maps.Point(1, 22));
	var marker = new google.maps.Marker({
		position : location,
		map : map,
		shadow : shadow,
		icon : image,
		draggable : true
	});
	google.maps.event.addListener(marker, 'dragend', function(event) {
		points[number] = event.latLng;
		Display();
	});

	return marker;
}


function placeMarkerred(location, number) {
	
	
	var img = '/img/truckmove.png'
	  if(location.data.addr.indexOf("State St") != -1 && imgcounter > 10){ 
		  img =  '/img/truck_red.png';
	  }

	var image = new google.maps.MarkerImage(img,

	// This marker is 20 pixels wide by 32 pixels tall.
	new google.maps.Size(16, 16),
	// The origin for this image is 0,0.
	new google.maps.Point(0, 0),
	// The anchor for this image is the base of the flagpole at 0,32.
	new google.maps.Point(0, 32));
// var shadow = new google.maps.MarkerImage('/img/truck.png',
// // The shadow image is larger in the horizontal dimension
// // while the position and offset are the same as for the main image.
// new google.maps.Size(16,16), new google.maps.Point(0, 0), new
// google.maps.Point(0, 0));
	var marker = new google.maps.Marker({
		position : location.point,
		map : map,
		// shadow : shadow,
		icon : image,
		draggable : false,
		data : location.data
	});
	
	myMap.set(location.data.x +"," + location.data.y, marker);

	marker
			.addListener(
					'click',
					function(event, obj) {
						
						clearInterval(myVar);
						
						$("#trafficbadge").show();
						
						$("#weatherbtn").click();
						
						var ti = 0;
						var trafficMsgInterval= setInterval(function() {
						$("<div />").text("log line " + "").appendTo("#tail");
						ti++;
						if(ti == 22)
							clearInterval(trafficMsgInterval);
						 }, 1500) ;

						marker.setIcon("/img/truckmove.png");
						
						//$("#fleetslider").hide();
						//$("#fleetvideo").show();
						
						/*
						 * setTimeout(function() {
						 * 
						 * $("#eggscell").html("<font color=red><b>"
						 * +$("#eggscell").html() + "</b></font>" ); //
						 * $.messager.alert('Inventory Alert', 'inventory // low
						 * for eggs 1 dozen</b> store 3245');
						 * 
						 * $(".modal-body2").html('<img
						 * src="../../images/eggs.jpg"><br>Inventory low for
						 * <b>Eggs 1 dozen</b><br> at store <b>3245</b>');
						 * $("#popup2").show();
						 * 
						 * $(".js-modal-close, .modal-overlay").click(function() {
						 * $(".modal-box, .modal-overlay").fadeOut(500,
						 * function() { $(".modal-overlay").remove(); }); }); },
						 * 20000);
						 */

						var cargo = marker.data.data.split(",")[6].split("|");

						$.each(cargo, function(i, elem) {
							var itemid = elem.split("^")[0];
							var itemqty = elem.split("^")[1];
							$(".productdef").each(
									function(i, elem) {
										if (itemid == ($(elem).context.id.substring(10, $(elem).context.id.length))) {

											$("#cargotable tr").slice((cargo.length + 1)).remove();

											$("#cargotable").append(
													"<tr><td class='bordercell'>" + itemid
															+ "</td><td class='bordercell'>"
															+ $(elem).context.textContent
															+ "</td><td class='bordercell'>" + itemqty + "</td></tr>");
										}
									});
						});

						$("#cargotable")
								.append(
										"<tr><td class='bordercell'>12</td><td class='bordercell' id='eggscell'>Eggs 1 dozen</td><td class='bordercell'>16</td></tr>");

						truckfeed = setInterval(truckfeedReader, 2000, marker);

						trafficLayer = new google.maps.TrafficLayer();
						trafficLayer.setMap(map);

						$("#truckdepartlocation").html(marker.data.data.split(",")[7])
						
						
						
						showRoute(marker.data.addr, marker.data.data.split(",")[7]);
						// showRoute("2410 S Main St,Bloomington, IL","1709
						// Laporte RdWaterloo,IA,50702");

						map.setZoom(15);
						map.setCenter(new google.maps.LatLng(marker.getPosition().lat(),
								marker.getPosition().lng() ));

						$("#deliveryid").html("Delivery 0000" + number);
						$("#deliverydest").html(location.data.addr);

						var d1 = randomDate(5, 0, 24);
						var d2 = new Date(d1);
						d2.setHours(d1.getHours() + 6);
						$("#truckdeparttime").html(d1);
						$("#truckarrivaltime").html(new Date(d2));

						getTruckData(marker);

						ClearAllPoints();
						randomMarkers.push(marker);
						marker.setMap(map);
						Display();
						
						for(var i = 0; i < markers.length; i++){
							markers[i].setMap(null);
							
						}

					});

	google.maps.event.addListener(marker, 'dragend', function(event) {
		points[number] = event.latLng;
		Display();
	});

	return marker;
}
function GreatCirclePoints(p1, p2) {
	var maxDistanceMeters = 200000.0;
	var ps = [];
	if (p1.distanceFrom(p2) <= maxDistanceMeters) {
		ps.push(p1);
		ps.push(p2);
	} else {
		var theta1 = p1.lng() * radiansPerDegree;
		var phi1 = (90.0 - p1.lat()) * radiansPerDegree;
		var x1 = earthRadiusMeters * Math.cos(theta1) * Math.sin(phi1);
		var y1 = earthRadiusMeters * Math.sin(theta1) * Math.sin(phi1);
		var z1 = earthRadiusMeters * Math.cos(phi1);
		var theta2 = p2.lng() * radiansPerDegree;
		var phi2 = (90.0 - p2.lat()) * radiansPerDegree;
		var x2 = earthRadiusMeters * Math.cos(theta2) * Math.sin(phi2);
		var y2 = earthRadiusMeters * Math.sin(theta2) * Math.sin(phi2);
		var z2 = earthRadiusMeters * Math.cos(phi2);
		var x3 = (x1 + x2) / 2.0;
		var y3 = (y1 + y2) / 2.0;
		var z3 = (z1 + z2) / 2.0;
		var r3 = Math.sqrt(x3 * x3 + y3 * y3 + z3 * z3);
		var theta3 = Math.atan2(y3, x3);
		var phi3 = Math.acos(z3 / r3);
		var p3 = new GLatLng(90.0 - phi3 * degreesPerRadian, theta3 * degreesPerRadian);
		var s1 = GreatCirclePoints(p1, p3);
		var s2 = GreatCirclePoints(p3, p2);
		for (var i = 0; i < s1.length; ++i)
			ps.push(s1[i]);
		for (var i = 1; i < s2.length; ++i)
			ps.push(s2[i]);
	}
	return ps;
}

function ShowHidePosition(point) {
	var pos = $(point).attr('id').slice(-1);
	var point1 = pointsrand[pos];
	ClearAllPoints();
	var marker = placeMarkerred(point1, pos);
	randomMarkers.push(marker);
	map.setZoom(8);
	map.setCenter(point1.point)
	marker.setMap(map);
	if (directionsDisplay)
		directionsDisplay.setMap(null);
	Display();

}

function setMapOnAll(map) {
    for (var i = 0; i < randomMarkers.length; i++) {
    	randomMarkers[i].setMap(map);
    }
  }

function ShowHide() {

	if (ShowHideONOFF == 0) {
		ShowHideONOFF = 1;
		for (var i = 0; i < pointsrand.length; ++i) {

			// console.log(pointsrand[i])
// randomMarkers = []
// console.log(randomMarkers.length)
// if(pointsrand[i].data){
// pointsrand[i].data.x = pointsrand[i].data.x + .1
// pointsrand[i].data.y = pointsrand[i].data.y + .1
// }

			var marker = placeMarkerred(pointsrand[i], i);
			randomMarkers.push(marker);
			marker.setMap(map);
		}	

// $.each(StoreLocationController.getStores(), function(idx, store) {

			// var point = new google.maps.LatLng(store.latlng.split(",")[0],
			// store.latlng.split(",")[1]);
			// var storeimage = new
			// google.maps.MarkerImage('../../images/storemarker.png',
			//
			// // This marker is 20 pixels wide by 32 pixels tall.
			// new google.maps.Size(28, 34),
			// // The origin for this image is 0,0.
			// new google.maps.Point(0, 0),
			// // The anchor for this image is the base of the flagpole at 0,32.
			// new google.maps.Point(9, 33));
			// // var shadow = new
			// // google.maps.MarkerImage('../../images/storemarker.png',
			// // // The shadow image is larger in the horizontal dimension
			// // // while the position and offset are the same as for the main
			// // image.
			// // new google.maps.Size(28, 34), new google.maps.Point(0, 0), new
			// // google.maps.Point(1, 22));
			// var marker1 = new google.maps.Marker({
			// position : point,
			// map : map,
			// // shadow : shadow,
			// icon : storeimage,
			// draggable : false
			// });
			//
			// marker1.setMap(map);
	// });

	} else {
		ShowHideONOFF = 0;
		for (var i = 0; i < pointsrand.length; ++i) {
			if (randomMarkers[i])
				randomMarkers[i].setMap(null);
		}
		Display();
	}

	map.setCenter(new google.maps.LatLng(41.8781, -87.6298 ));
	map.setZoom(15);

	if (trafficLayer)
		trafficLayer.setMap(null)
}

function Areas(areaMeters2) {
	var areaHectares = areaMeters2 / meters2PerHectare;
	var areaKm2 = areaMeters2 / metersPerKm / metersPerKm;
	var areaFeet2 = areaMeters2 * feetPerMeter * feetPerMeter;
	var areaMiles2 = areaFeet2 / feetPerMile / feetPerMile;
	var areaAcres = areaMiles2 * acresPerMile2;

	return areaMeters2 + ' m&sup2; ';
}

function Areaskm(areaMeters2) {
	var areaHectares = areaMeters2 / meters2PerHectare;
	var areaKm2 = areaMeters2 / metersPerKm / metersPerKm;
	var areaFeet2 = areaMeters2 * feetPerMeter * feetPerMeter;
	var areaMiles2 = areaFeet2 / feetPerMile / feetPerMile;
	var areaAcres = areaMiles2 * acresPerMile2;

	return areaKm2 + ' km&sup2; ';
}

function SphericalPolygonAreaMeters2(points) {
	var totalAngle = 0.0;
	for (var i = 0; i < points.length; ++i) {
		var j = (i + 1) % points.length;
		var k = (i + 2) % points.length;
		totalAngle += Angle(points[i], points[j], points[k]);
	}
	var planarTotalAngle = (points.length - 2) * 180.0;
	var sphericalExcess = totalAngle - planarTotalAngle;
	if (sphericalExcess > 420.0) {
		totalAngle = points.length * 360.0 - totalAngle;
		sphericalExcess = totalAngle - planarTotalAngle;
	} else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
		sphericalExcess = Math.abs(360.0 - sphericalExcess);
	}
	return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters;
}
function PlanarPolygonAreaMeters2(points) {
	var a = 0.0;
	for (var i = 0; i < points.length; ++i) {
		var j = (i + 1) % points.length;
		var xi = points[i].lng() * metersPerDegree * Math.cos(points[i].lat() * radiansPerDegree);
		var yi = points[i].lat() * metersPerDegree;
		var xj = points[j].lng() * metersPerDegree * Math.cos(points[j].lat() * radiansPerDegree);
		var yj = points[j].lat() * metersPerDegree;
		a += xi * yj - xj * yi;
	}
	return Math.abs(a / 2.0);
}
function Angle(p1, p2, p3) {
	var bearing21 = Bearing(p2, p1);
	var bearing23 = Bearing(p2, p3);
	var angle = bearing21 - bearing23;
	if (angle < 0.0)
		angle += 360.0;
	return angle;
}
function Bearing(from, to) {
	var lat1 = from.lat() * radiansPerDegree;
	var lon1 = from.lng() * radiansPerDegree;
	var lat2 = to.lat() * radiansPerDegree;
	var lon2 = to.lng() * radiansPerDegree;
	var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
			* Math.cos(lat2) * Math.cos(lon1 - lon2));
	if (angle < 0.0) {
		angle += Math.PI * 2.0;
		angle = angle * degreesPerRadian;
	}
	return angle;
}

// Poygon getBounds extension - google-maps-extensions
// http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
if (!google.maps.Polygon.prototype.getBounds) {
	google.maps.Polygon.prototype.getBounds = function(latLng) {
		var bounds = new google.maps.LatLngBounds();
		var paths = this.getPaths();
		var path;

		for (var p = 0; p < paths.getLength(); p++) {
			path = paths.getAt(p);
			for (var i = 0; i < path.getLength(); i++) {
				bounds.extend(path.getAt(i));
			}
		}
		return bounds;
	};
};
// Polygon containsLatLng - method to determine if a latLng is within a polygon
google.maps.Polygon.prototype.containsLatLng = function(latLng) {
	// Exclude points outside of bounds as there is no way they are in the poly
	var bounds = this.getBounds();
	if (bounds != null && !bounds.contains(latLng)) {
		return false;
	}
	// Raycast point in polygon method
	var inPoly = false;
	var numPaths = this.getPaths().getLength();
	for (var p = 0; p < numPaths; p++) {
		var path = this.getPaths().getAt(p);
		var numPoints = path.getLength();
		var j = numPoints - 1;
		for (var i = 0; i < numPoints; i++) {
			var vertex1 = path.getAt(i);
			var vertex2 = path.getAt(j);
			if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng()
					&& vertex1.lng() >= latLng.lng()) {
				if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng())
						* (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
					inPoly = !inPoly;
				}
			}
			j = i;
		}
	}
	return inPoly;
};
google.maps.LatLng.prototype.distanceFrom = function(newLatLng) {
	// setup our variables
	var lat1 = this.lat();
	var radianLat1 = lat1 * (Math.PI / 180);
	var lng1 = this.lng();
	var radianLng1 = lng1 * (Math.PI / 180);
	var lat2 = newLatLng.lat();
	var radianLat2 = lat2 * (Math.PI / 180);
	var lng2 = newLatLng.lng();
	var radianLng2 = lng2 * (Math.PI / 180);
	// sort out the radius, MILES or KM?
	var earth_radius = 3959; // (km = 6378.1) OR (miles = 3959) - radius of
	// the earth

	// sort our the differences
	var diffLat = (radianLat1 - radianLat2);
	var diffLng = (radianLng1 - radianLng2);
	// put on a wave (hey the earth is round after all)
	var sinLat = Math.sin(diffLat / 2);
	var sinLng = Math.sin(diffLng / 2);

	// maths - borrowed from
	// http://www.opensourceconnections.com/wp-content/uploads/2009/02/clientsidehaversinecalculation.html
	var a = Math.pow(sinLat, 2.0) + Math.cos(radianLat1) * Math.cos(radianLat2) * Math.pow(sinLng, 2.0);

	// work out the distance
	var distance = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));

	// return the distance
	return distance;
};

function getTruckData(marker) {

	var offset = 0;
	if (marker && step < routeCoords.length) {
		if (map.getZoom() < 13)
			offset = .00001;

		console.log(offset + " :: " + map.getZoom())
		marker.setPosition(new google.maps.LatLng(routeCoords[step].lat - offset, routeCoords[step].lng));
		step = step + 1;
	}

	$("#truckid").html("MB 6500");
	$("#truckdriver").html("John Doe");
	$("#truckcontact").html("224-555-9090");
	$("#truckdriverrating").html("unavailable");

	$("#truckspeed").html((Math.floor(Math.random() * 31) + 10) + ' mph');
	// $("#trucklocation").html(
	// "[" + String(location.data.x).substring(0, 6) + "," +
	// String(location.data.y).substring(0, 6) + "]");
	$("#trucktemp").html((Math.floor(Math.random() * 31) + 20) + 'C');
	$("#trucktires").html((Math.floor(Math.random() * 6) + 44) + " psi");
	$("#truckdest").html("Westmont, IL");
	$("#trucktemp1").html("1653 lbs.");
	$("#truckmiles").html((Math.floor(Math.random() * 3) + 50) + "%");
	$("#truckorigin").html(marker.getPosition().lat().toString().substring(0,9) + ", " + marker.getPosition().lng().toString().substring(0,10));
}

function truckfeedReader(marker) {
	getTruckData(marker);
}