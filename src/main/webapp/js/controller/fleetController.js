var availableTags = [];
var inittimelinerows = [];

var ForecastController = (function() {

	function getProducts(loc) {
		$.ajax({
			url : '../../service/dataservice/getProducts/' + loc,
			success : function(result) {
				var posresult = jQuery.parseJSON(result);
				$.each(posresult, function(i, elem) {

					var displayName = elem.name;
					if (displayName.length > 45) {
						displayName = displayName.substring(0, 40) + "...";
					}

					$("#productlist").append(
							"<div class='productdef' title='" + elem.name + "' role=" + elem.price + " id='productdef" + elem.id
									+ "' style='cursor:pointer;'><img src='../../images/information.png' hspace=4>" + displayName + "</div>");
					availableTags.push({
						label : elem.name,
						value : elem.id,
						price : elem.price
					});
				});

				$(".productdef").mouseover(function() {
					$(this).css('background-color', '#eee');
				});

				$(".productdef").mouseout(function() {

					if ($("#prodnamemodeal").text().substring(0, $("#prodnamemodeal").text().indexOf("$")) != $(this)[0].getAttribute("title")) {
						$(this).css('background-color', '#fff');
					}
				});

				$(".productdef").click(
						function(e) {

							$("#lists").hide();
							$("#east_2").css('overflow-y', 'hidden');

							var currentproduct = ($(this)[0].textContent);
							$(".productdef").each(function(i, elem) {

								if (!(currentproduct == $(elem).context.textContent)) {
									$(elem).css('background-color', '#fff');
								}
							});

							var _price_ = $(this)[0].getAttribute("role");

							makeInventoryChart($("#invstates").find(":selected").text(), $(e.target).context.getAttribute("title"), $("#invstates").find(":selected").val(),
									$(e.target).context.id.substring(10, $(e.target).context.id.length), _price_);
						});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
	}

	function getCompetitivePricing(name) {
		$.ajax({
			url : '../../service/dataservice/getCompetitivePricing/' + name,
			success : function(result) {
				var _result_ = jQuery.parseJSON(result);

				var table = "<table style='border : 1px solid #ccc; width: 287px;'>";
				for (key in _result_) {
					table += ("<tr><td colspan=2 style='background-color : #eee'><b>" + key + "</b></td></tr>");
					$.each(_result_[key], function(n, prod) {
						var price = prod.id;
						if (price.indexOf("-") != -1) {
							price = price.substring(0, price.indexOf("-"));
						}
						table += ("<tr><td style='border : 1px solid #ccc'>" + prod.value + "</td><td class='priceclass' style='border : 1px solid #ccc; text-align : center'>"
								+ price + "</td></tr>");
					});
				}

				table += "</table>";
				$("#prices").html(table);

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
				$("#prices").html("<img src='../../images/close.png'>&nbsp;An error ocurred, please try again");
			}
		});
	}

	function addMarker(marker, svg, chartHeight, x) {
		var radius = 32, xPos = x(marker.date) - radius - 3, yPosStart = chartHeight - radius - 3, yPosEnd = Number(marker.version) <= 1 ? 350 : (500 / marker.version) + radius
				- 3;

		var markerG = svg.append('g').attr('class', 'marker client').attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')').attr('opacity', 0);

		markerG.transition().duration(1000).attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')').attr('opacity', 1);

		markerG.append('path').attr('d', 'M' + radius + ',' + (chartHeight - yPosStart) + 'L' + radius + ',' + (chartHeight - yPosStart)).transition().duration(1000).attr('d',
				'M' + radius + ',' + (chartHeight - yPosEnd) + 'L' + radius + ',' + (radius * 2));

		markerG.append('circle').attr('class', 'marker-bg').attr('cx', radius).attr('cy', radius).attr('r', radius);

		// markerG.append('text').attr('x', radius).attr('y', radius *
		// 0.9).text(marker.type);

		markerG.append('text').attr('x', radius).attr('y', radius + 7).text(marker.version);
	}

	function startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x) {
		rectClip.transition().duration(1000 * markers.length).attr('width', chartWidth);

		// console.log(markers);

		markers.forEach(function(marker, i) {
			setTimeout(function() {
				addMarker(marker, svg, chartHeight, x);
			}, 1000 + 500 * i);
		});
	}

	function addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight) {
		var legendWidth = 200, legendHeight = 100;

		// var legend = svg.append('g').attr('class',
		// 'legend').attr('transform',
		// 'translate(' + (chartWidth - legendWidth) + ', 0)');
		//
		// legend.append('rect').attr('class', 'legend-bg').attr('width',
		// legendWidth).attr('height', legendHeight);
		//
		// legend.append('rect').attr('class', 'outer').attr('width',
		// 75).attr('height', 20).attr('x', 10).attr('y', 10);
		//
		// legend.append('text').attr('x', 115).attr('y', 25).text('5% - 95%');
		//
		// legend.append('rect').attr('class', 'inner').attr('width',
		// 75).attr('height', 20).attr('x', 10).attr('y', 40);
		//
		// legend.append('text').attr('x', 115).attr('y', 55).text('25% - 75%');
		//
		// legend.append('path').attr('class', 'median-line').attr('d',
		// 'M10,80L85,80');
		//
		// legend.append('text').attr('x', 115).attr('y', 85).text('Median');
		//
		// // clipping to make sure nothing appears behind legend
		// svg.append('clipPath').attr('id',
		// 'axes-clip').append('polygon').attr(
		// 'points',
		// (-margin.left) + ',' + (-margin.top) + ' ' + (chartWidth -
		// legendWidth - 1) + ',' + (-margin.top) + ' '
		// + (chartWidth - legendWidth - 1) + ',' + legendHeight + ' ' +
		// (chartWidth + margin.right) + ','
		// + legendHeight + ' ' + (chartWidth + margin.right) + ',' +
		// (chartHeight + margin.bottom) + ' '
		// + (-margin.left) + ',' + (chartHeight + margin.bottom));

		var axes = svg.append('g').attr('clip-path', 'url(#axes-clip)');

		axes.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + chartHeight + ')').call(xAxis);

		axes.append('g').attr('class', 'y axis').call(yAxis).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '.71em').style('text-anchor', 'end').text(
				'Level');

	}

	function drawPaths(svg, data, x, y) {
		var upperOuterArea = d3.svg.area().interpolate('basis').x(function(d) {
			return x(d.date) || 1;
		}).y0(function(d) {
			return y(d.pct95);
		}).y1(function(d) {
			return y(d.pct75);
		});

		var upperInnerArea = d3.svg.area().interpolate('basis').x(function(d) {
			return x(d.date) || 1;
		}).y0(function(d) {
			return y(d.pct75);
		}).y1(function(d) {
			return y(d.pct50);
		});

		var medianLine = d3.svg.line().interpolate('basis').x(function(d) {
			return x(d.date);
		}).y(function(d) {
			return y(d.pct50);
		});

		var lowerInnerArea = d3.svg.area().interpolate('basis').x(function(d) {
			return x(d.date) || 1;
		}).y0(function(d) {
			return y(d.pct50);
		}).y1(function(d) {
			return y(d.pct25);
		});

		var lowerOuterArea = d3.svg.area().interpolate('basis').x(function(d) {
			return x(d.date) || 1;
		}).y0(function(d) {
			return y(d.pct25);
		}).y1(function(d) {
			return y(d.pct05);
		});

		svg.datum(data);

		svg.append('path').attr('class', 'area upper outer').attr('d', upperOuterArea).attr('clip-path', 'url(#rect-clip)');

		svg.append('path').attr('class', 'area lower outer').attr('d', lowerOuterArea).attr('clip-path', 'url(#rect-clip)');

		svg.append('path').attr('class', 'area upper inner').attr('d', upperInnerArea).attr('clip-path', 'url(#rect-clip)');

		svg.append('path').attr('class', 'area lower inner').attr('d', lowerInnerArea).attr('clip-path', 'url(#rect-clip)');

		svg.append('path').attr('class', 'median-line').attr('d', medianLine).attr('clip-path', 'url(#rect-clip)');
	}

	function makeChart(data, markers, img, name, price) {
		var svgWidth = 960, svgHeight = 500, margin = {
			top : 20,
			right : 20,
			bottom : 40,
			left : 40
		}, chartWidth = svgWidth - margin.left - margin.right, chartHeight = svgHeight - margin.top - margin.bottom;

		var x = d3.time.scale().range([ 0, chartWidth ]).domain(d3.extent(data, function(d) {
			return d.date;
		})), y = d3.scale.linear().range([ chartHeight, 0 ]).domain([ 0, d3.max(data, function(d) {
			return d.pct95;
		}) ]);

		var xAxis = d3.svg.axis().scale(x).orient('bottom').innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10), yAxis = d3.svg.axis().scale(y).orient('left')
				.innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

		var svg = d3.select('#invchart1').append('svg').attr('width', svgWidth).attr('height', svgHeight).append('g').attr('transform',
				'translate(' + margin.left + ',' + margin.top + ')');

		// clipping to start chart hidden and slide it in later
		var rectClip = svg.append('clipPath').attr('id', 'rect-clip').append('rect').attr('width', 0).attr('height', chartHeight);

		addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
		drawPaths(svg, data, x, y);
		startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x);

		$(".js-modal-close, .modal-overlay").click(function() {
			$(".modal-box, .modal-overlay").fadeOut(500, function() {
				$(".modal-overlay").remove();
			});
		});

		$("#prodnamemodeal").html(
				"<center><table width=250px><tr><td align=center>" + name + "</td></tr><tr><td align=center id='itemprice'>" + price + "</td></tr></table></center>");

		$(".modal-body1").html('<img src=" ' + ((img) ? img : "../../images/noimage.png") + '"/>');
		$("#popup1").show();
	}

	function makeInventoryChart(store, product, storeid, productid, price) {

		// console.log(product + " : " + price);
		var waitdiv = "<table><tr><td><img src='../../images/wait-small.gif' />" + "</td><td>Loading...</td></tr></table>";

		$("#invcharttitle").html("<p><center>" + waitdiv + "</center>")
		$("#invchart1").hide()

		$("#prices").show();
		$("#prices").html(waitdiv);

		getCompetitivePricing(product);

		$.ajax({
			url : '../../service/dataservice/getCurrentInventoryLevel/' + storeid + "/" + productid + "/" + product,
			success : function(result) {
				var _result_ = jQuery.parseJSON(result);

				$("#invchart1").html('');
				$("#invchart1").show();
				$("#charts").hide();
				$("#invcharttitle").html('<br><br><br>' + "2015 Inventory Levels For Store: <font color='#7F7FE6'><b>" + store + "</b></font>");
				$("#invcharttitle").show();

				var parseDate = d3.time.format('%Y-%m-%d').parse;
				d3.json('/valuemart-web/service/dataservice/getInventoryLevel/' + product, function(error, rawData) {
					if (error) {
						console.error(error);
						return;
					}

					var data = rawData.map(function(d) {
						return {
							date : parseDate(d.date),
							pct05 : d.pct05 / 1000,
							pct25 : d.pct25 / 1000,
							pct50 : d.pct50 / 1000,
							pct75 : d.pct75 / 1000,
							pct95 : d.pct95 / 1000
						};
					});

					var markers = [];

					if (storeid) {
						markers.push({
							date : parseDate("2014-08-19"),
							type : "Current",
							version : _result_.qty
						});
					}

					console.log(_result_)
					console.log(product)

					makeChart(data, markers, _result_.img, product, price);
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});

	}

	var dates = [];

	function init(start, end) {

		$("#timelinedatesdisplay").html('sddsdf')
		$("#historytable").html('');
		$("#historytable").append(
				"<tr class='gradient1'><td class=bordercell>Type</td><td class=bordercell>Date</td><td class=bordercell>Delivery ID</td>"
						+ "<td class=bordercell>Position</td><td class=bordercell>Facility</td><td class=bordercell>Estimated Arrival Time</td></tr>");
	
		$.each(dates, function(i, transaction) {

			var dt = new Date(transaction[0]).getTime();
			var a = new Date(start);
			var b = new Date(end);

			var c = new Date(b.getTime());
			c.setDate(c.getDate() + 1);
			var inRange = dt >= a && dt < c;
			if (inRange) {
				
				var hour = (Math.floor(Math.random() * 23) + 1);
				if(hour.toString().length == 1)
					hour = "0" + hour;
				
				var minute = (Math.floor(Math.random() * 59) + 1);
				if(minute.toString().length == 1)
					minute = "0" + minute;

				$("#historytable").append(
						"<tr><td class=bordercell width=20><img src='/img/" + transaction[1] + ".png'></td><td class=bordercell nowrap>" + transaction[0]
								+ "</td><td class=bordercell nowrap>" + transaction[2] + "</td><td class=bordercell nowrap>" + transaction[3] + "," + transaction[4]
								+ "</td><td class=bordercell nowrap>" + transaction[5] + "</td><td class=bordercell>" + hour + ":"
								+ minute+ " GMT-0600 (Central Standard Time)</td></tr>");
			}

		});

		// console.log(start + " : " + end);
		// console.log(inRange);

		var randTimes

		if (dates.length == 0) {
			$.ajax({
				url : '/dataservice/getFleetData/' + "name",
				success : function(result) {

					$("#historytable").html('');
					$("#historytable").append(
							"<tr class='gradient1'><td class=bordercell>Type</td><td class=bordercell>Date</td><td class=bordercell>Delivery ID</td>"
									+ "<td class=bordercell>Position</td><td class=bordercell>Facility</td><td class=bordercell>Estimated Arrival Time</td></tr>");
					$.each(result, function(i, elem) {
						var transaction = elem.split("|");
						dates.push(transaction);

						var dt = new Date(transaction[0]).getTime();
						var a = new Date(start);
						var b = new Date(end);

						var c = new Date(b.getTime());
						c.setDate(c.getDate() + 1);
						var inRange = dt >= a && dt < c;
						if (inRange) {

							
							var hour = (Math.floor(Math.random() * 23) + 1);
							if(hour.toString().length == 1)
								hour = "0" + hour;
							
							var minute = (Math.floor(Math.random() * 59) + 1);
							if(minute.toString().length == 1)
								minute = "0" + minute;

							$("#historytable").append(
									"<tr><td class=bordercell width=20><img src='/img/" + transaction[1] + ".png'></td><td class=bordercell nowrap>" + transaction[0]
											+ "</td><td class=bordercell nowrap>" + transaction[2] + "</td><td class=bordercell nowrap>" + transaction[3] + "," + transaction[4]
											+ "</td><td class=bordercell nowrap>" + transaction[5] + "</td><td class=bordercell>" + hour + ":"
											+ minute+ " GMT-0600 (Central Standard Time)</td></tr>");
						}

					});

					dates.sort();

					var _timelinerows_ = $("#historytable").find('tr');
					var storedrows = [];

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
								"thumbnail" : "/img/card.png"
							},
						}
						storedrows.push(timelinejson);
					}
					localStorage.setItem("timelinerows", JSON.stringify(storedrows));

				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Status: " + textStatus);
					console.log("Error: " + errorThrown);
				}
			});
		}
	}

	return {
		init : init,
		getProducts : getProducts,
		makeInventoryChart : makeInventoryChart
	};
})();