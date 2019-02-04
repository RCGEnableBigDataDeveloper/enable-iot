var StoreLocationController = (function() {

	var map = null;
	var posfeed = null;
	var _storearr_ = null;
	var _storesales_ = [];
	var currentstoreid = null;

	function initCharts(chart, data) {

		$('#' + chart).html('');

		var chart = document.getElementById(chart), axisMargin = 0, margin = 0, valueMargin = 10, width = 270, height = 320, barHeight = (15), barPadding = 10, data, bar, svg, scale, xAxis, labelWidth = 0;

		max = d3.max(data.map(function(i) {
			return i[1];
		}));

		svg = d3.select(chart).append("svg").attr("width", width).attr("height", 300);

		bar = svg.selectAll("g").data(data).enter().append("g");

		bar.attr("class", "bar").attr("cx", 0).attr("transform", function(d, i) {
			return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
		});

		bar.append("text").attr("class", "label").attr("y", barHeight / 2).attr("dy", ".35em") // vertical
		.text(function(d) {
			return d[0];
		}).each(function() {
			labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width)) + 1;
		});

		scale = d3.scale.linear().domain([ 0, max ]).range([ 0, width - margin * 2 - labelWidth ]);

		xAxis = d3.svg.axis().scale(scale).tickSize(-height + 2 * margin + axisMargin).orient("bottom").tickFormat(function(d) {
			return d < 1000 ? d : d / 100000;
		});

		bar.append("rect").attr("transform", "translate(" + labelWidth + ", 0)").attr("height", barHeight).attr("width", function(d) {
			return scale(d[1]);
		});

		bar.append("text").attr("class", "value").attr("y", barHeight / 2).attr("dx", -valueMargin + labelWidth).attr("dy", ".35em").attr("text-anchor", "end").text(function(d) {
			return d[1];
		}).attr("x", function(d) {
			var width = this.getBBox().width;
			return Math.max(width + valueMargin, scale(d[1]));
		});

		svg.insert("g", ":first-child").attr("class", "axis").attr("transform", "translate(" + (margin + labelWidth) + "," + (150) + ")").call(xAxis);
	}

	function posfeedReader(loc) {
		
	$("#storeoverlay1").hide();
	$("#storeoverlay2").hide();
		
		//pagefunction();

		$.ajax({
			url : '/dataservice/getStoresSales/' + loc,
			success : function(result) {

				$(".storewait").hide();

				var newarr = [];
				var randomstore = Math.floor(Math.random() * 40) + 1
				
				console.log(randomstore);
				console.log(_storearr_);
				
				newarr.push(_storearr_[randomstore])

				
				console.log('here')
				console.log(newarr)
				
				placeStoreMarkers(newarr);

				var posresult = jQuery.parseJSON(result);

				// console.log(posresult);

				var chartData = [], sales = [], chartData1 = [];
				var i = 0;

				$(".storesalesapan").each(function(n, elem) {
					$(this).css("fontSize", "11px");
					$(this).css("color", "#000");
				});

				$.each(posresult, function(k, v) {
					i++;
					var color = "#000";
					if (v.replace(/,/g, "") < 10000)
						color = "red";

					var _obj_ = $("#" + k)[0];

					if (_obj_ && (_obj_.id.match(/^store([0-9][0-9]+)$/))) {

						var currentValue = ($("#" + $(_obj_).context.id).text());
						currentValue = currentValue.trim().substring(1, currentValue.trim().length);

						sales.push({
							store : k,
							sales : v.replace(/,/g, "")
						});

						_storesales_ = sales;

						// console.log(_obj_.id + " :: "
						// + currentValue + " :: "
						// + v)

						if (currentValue != '') {
// if (currentValue != v) {
//
// $("#" + k).html("<span class='storesalesapan' style='color:" + color + ";
// font-size:24px;'>&nbsp;$" + currentValue + '&nbsp;');
// setTimeout(function() {
// $("#" + k).html("<span class='storesalesapan' style='color:" + "green" + ";
// font-size:24px;'>&nbsp;$" + v + '&nbsp;');
// }, 2000);
// }
						} else {

						// $("#" + k).html("<span class='storesalesapan'
						// style='color:" + color + "; font-size:11px;'>&nbsp;$"
						// + v + '&nbsp;');
						}
					} else {
// if ($("#storename").html() != "ValueMart Total Sales") {
//
// updateStore(currentstoreid);
// $("#storetotalsales").html("<span style='color:#000'>" + $("#store" +
// currentstoreid).text() + ".00</span>");
// } else {
//
// $("#" + k).html("<span class='storesalesapan' style='color:" + color + ";
// font-size:11px;'>&nbsp;$" + v + '&nbsp;');
// }
					}
				});

				/*
				 * for (var i = 0; i < 6; i++) { var storeval =
				 * sales[Math.floor(Math.random() * sales.length)];
				 * chartData.push([ storeval.store, storeval.sales ]); }
				 */
				var products = [];
				$(".productdef").each(function(i, elem) {
					productName = $(elem).context.textContent;
					products.push([ productName.split(' ')[0], Math.floor(Math.random() * 100) + 1 ]);
				});

				// for (var i = 0; i < 6; i++) {
				// chartData1.push(products[Math.floor(Math.random() *
				// products.length)]);
				// }
				//
				// StoreLocationController.initCharts('chart',
				// chartData);
				// StoreLocationController.initCharts('chart2',
				// chartData1);

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
	}

	function format() {
	}

	function getLocation(loc) {
		$.ajax({
			url : '/dataservice/getStores/' + "ccc",
			success : function(result) {
				var storearr = jQuery.parseJSON(result);
				_storearr_ = storearr;
				var store0addr = storearr[0].address + " " + storearr[0].city + " " + storearr[0].state + " " + storearr[0].zip;

				$('#storename').html('RCG | enable RETAIL Total Sales');
				$('#storeaddr').html('All Stores');
				
				setTimeout(function(){

				posfeed = setInterval(posfeedReader, 6000, storearr[0].id);
				
				 }, 3000);

				drawMap(storearr);

				this._storearr_ = storearr;
				$.each(storearr, function(n, elem) {

					$('#invstates').append($("<option></option>").attr("value", elem.id).text(elem.name + " " + elem.city + ", " + elem.state));

					$("#storelist").append(
							"<div class='storedef' id='storedef" + elem.id + "' style='cursor:pointer;'><img src='../../images/information.png' hspace=4>" + elem.name + " "
									+ elem.city + ", " + elem.state + "</div>");
					$("#storedef" + elem.id).data(elem);
				});

				$("#storedef" + storearr[0].id).css('background-color', '#eee');

				$(".storedef").mouseover(function() {
					$(this).css('background-color', '#eee');
				});

				$(".storedef").mouseout(function() {
					if ($(this)[0].textContent != $("#storename").html()) {
						$(this).css('background-color', '#fff');
					}
				});

				$(".storedef").click(

				function(e) {

					var storeid = $(this).data().id;
					$(".storedef").css('background-color', '#fff');
					$(this).css('background-color', '#eee');
					clearInterval(posfeed);
				// posfeed = setInterval(posfeedReader, 3000, storeid);
					var storeaddr = $(this).data().address + " " + $(this).data().city + " " + $(this).data().state + " " + $(this).data().zip;
					$('#storename').html($(this).data().name);
					$('#storeaddr').html(storeaddr);

					$.each(storearr, function(idx, store) {

						if (e.target.textContent.indexOf(store.address) != -1) {
							var _latlng_ = store.latlng.split(",");
							map.setView([ _latlng_[0], _latlng_[1] ], 12);
							return false;
						}
					});

					showStorePopup($(this).data().city, $(this).data().state, storeid);

					$.each(_storesales_, function(idx, sale) {

						if (sale.store.substring(5, sale.store.length) == storeid) {
							console.log(sale);
						}
					});
				});

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
	}

	function geocode(storearr, i) {

		console.log(i);
		console.log(storearr[i]);
		var geocoder = new google.maps.Geocoder();
		$.each(storearr[i], function(n, elem) {
			var storeaddr = storearr[i][n].address + " " + storearr[i][n].city + " " + storearr[i][n].state + " " + storearr[i][n].zip;
			geocoder.geocode({
				'address' : storeaddr
			}, function(results, status) {
				locations.push({
					lat : results[0].geometry.location.lat(),
					lng : results[0].geometry.location.lng()
				});
			});
		});
	}

	function drawMap(storearr) {

		L.Map = L.Map.extend({
			openPopup : function(popup) {

				this._popup = popup;

				return this.addLayer(popup).fire('popupopen', {
					popup : this._popup
				});
			}
		});

		map = L.map('map').setView([ 37.0902, -95.7129 ], 6);
		L.tileLayer(
				'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZXJpY3BlcmxlciIsImEiOiJjaWp5YWdzamExcXBydndraTQ0M3J4N2VlIn0.SGSewOf7lm_cnXo4TomikA',
				{
					maxZoom : 18,
					attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
							+ '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery � <a href="http://mapbox.com">Mapbox</a>',
					id : 'mapbox.streets'
				}).addTo(map);

		// placeStoreMarkers(storearr);

		map.on('click', onMapClick);
	}

	function onMapClick(e) {
		$("#popup").hide();
		placeStoreMarkers(_storearr_);
	}

	function reset() {
		$('#storename').html('RCG | enable RETAIL Total Sales');
		$('#storeaddr').html('All Stores');
		$("#popup").hide();
		map.setView([ 39.50, -98.35 ], 12);
	}

	function updateStore(currentstoreid) {
		var storesales = $("#store" + currentstoreid).text();
		var storesalenumeric = storesales.replace(/,/g, "");

		var storesalenumeric = $("#store" + currentstoreid).text().replace(/,/g, "").replace(/\$/g, "");
		$("#storetotalsales").html("<span style='color:#000'>" + storesales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00</span>");
		$("#storetotalreturns").html("<span style='color:#000'>$" + (storesalenumeric / 12).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span>");
		$("#storetotalsalesamount").html("<span style='color:#000'>$" + (storesalenumeric / 50).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</span>");
	}

	function showStorePopup(city, state, id) {

		currentstoreid = id;

		updateStore(currentstoreid);

		var appendthis = ("<div class='modal-overlay js-modal-close'></div>");

		$('a[data-modal-id]').click(function(e) {
			e.preventDefault();
			$("body").append(appendthis);
			$(".modal-overlay").fadeTo(500, 0.7);
			$(".js-modalbox").fadeIn(500);
			var modalBox = $(this).attr('data-modal-id');
			$('#' + modalBox).fadeIn($(this).data());
		});

		$(".js-modal-close, .modal-overlay").click(function() {
			$(".modal-box, .modal-overlay").fadeOut(500, function() {
				$(".modal-overlay").remove();
			});
		});

		$(window).resize();

		$(".modal-body").html('<img src="../../images/storefront' + (Math.floor(Math.random() * 5) + 0) + '.jpg"/>');
		$("#storemodal").html('ValueMart&nbsp;');
		$("#storemodaltitle").html(city + ", " + state);

		$("#popup").show();

	}

	var cntr = 0;

	function placeStoreMarkers(storearr) {
		/*
		 * map.eachLayer(function (layer) { console.log(layer);
		 * map.removeLayer(layer); });
		 */

		$(".leaflet-marker-icon").hide();
		$(".leaflet-popup-tip").hide();
		$(".leaflet-popup-content-wrapper").hide();
		$(".leaflet-marker-shadow").hide();

		var popupdiv, popup, options = {
			'minWidth' : '250',
			/* 'maxHeight' : '70', */
			closeButton : false
		};

		$.each(storearr, function(n, elem) {
			
			console.log(elem)

			popupdiv = "<div style='border : 0px; width : 150px' id='store" + elem.id
					+ "'><table width=300 border=0><tr><td><b>Suspicious Activity Detetcted</b></td></tr><tr><td colspan=2>" + "" + "<table>" + "<tr><td>vendor:</td><td>" + elem.store
					+ " " + "</td></tr><tr><td>location:</td><td>" + elem.lat + " " + elem.lng + " " + elem.state + "</td></tr><tr>" + "<td>account:</td><td>" + elem.card
					+ "</td></tr><table>" + "</td></tr></table></div>";

			var storetablelength = $(".click-row").length;
			
			if (cntr == 0) {
				$('#storetable tr:first').remove();
			}

			if (storetablelength >= 7) {
				$('#storetable tr:last').remove()
			}


			$("#storetable").prepend(
					'<tr style="width:500px" class="click-row" id="smoke_q" data-measure-ref="smoke_q" data-measure-name="Adult smoking"><td rowspan="1">' + elem.card
							+ '</td> <td width=500 class="success">' + elem.lat + " " + elem.lng + '</td> <td class="success">' + elem.store + '</td> <td class="success">'
							+ elem.card + '</td> <td class="success">' + elem.state + '</td> <td class="success">' + '' + '</td> </tr>');


			var color = '#fff';
			if (cntr % 2 == 0)
				color = '#eee';

			$('#fraudpanel').append(
					"<tr style='background-color: " + color + "'><td class=bordercell><b>" + elem.card + "</b><br>" + elem.store + " $" + (Math.random() * 1599 + 32).toFixed(2)
							+ "<br>" + elem.name + " " + elem.address + " " + elem.city + " " + elem.state + "</td></tr>");

			cntr++;

			if (elem.id > 50) {
				console.log(elem.id);
				return false;
			}

			map.setView([ elem.lat, elem.lng ], 12);

			L.marker([ elem.lat, elem.lng ]).addTo(map).bindPopup(popupdiv, options).openPopup().on('click', onClick);
			function onClick(e) {
				
				
				var current = e.latlng.lat + "" + e.latlng.lng, city, state, id, addr, zip;

				$.each(storearr, function(n, elem) {

					if (current == elem.lat + "" + elem.lng) {
						console.log(elem)
						city = elem.city;
						state = elem.state;
						id = elem.id;
						addr = elem.address;
						zip = elem.zip;
					}
				});

				// $('#storename').html(addr);
				// $('#storeaddr').html(addr + " " + city + ", "
				// + state, +" " +
				// zip);

				showStorePopup(city, state, id);

				clearInterval(posfeed);
			// posfeed = setInterval(posfeedReader, 3000, id);

				map.setView(e.latlng, 16);
			}
			popup = L.popup();

		});

	}

	function getStores() {
		return _storearr_;
	}

	return {
		getLocation : getLocation,
		drawMap : drawMap,
		initCharts : initCharts,
		reset : reset,
		getStores : getStores
	};
})();
