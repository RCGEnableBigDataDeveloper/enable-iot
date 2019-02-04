<h6 class="w3-opacity">Store Sales (Last 24 hours)</h6>
<div id="sales-graph" class="chart no-padding" style='height: 250px'></div>

<script type="text/javascript">
	pageSetUp();

	var pagefunction = function() {

		$("#sales-graph").html('');

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		if ($('#sales-graph').length) {

			Morris.Area({
				element : 'sales-graph',
				data : [ {
					period : '2010 Q1',
					store : getRandomInt(1000,10000),
					online : null,
					catalog : 2647
				}, {
					period : '2010 Q2',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				}, {
					period : '2010 Q3',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				}, {
					period : '2010 Q4',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				}, {
					period : '2011 Q1',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				}, {
					period : '2011 Q2',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				}, {
					period : '2011 Q3',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				}, {
					period : '2011 Q4',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				}, {
					period : '2012 Q1',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				}, {
					period : '2012 Q2',
					store : getRandomInt(1000,10000),
					online : getRandomInt(1000,10000),
					catalog : getRandomInt(1000,10000)
				} ],
				xkey : 'period',
				ykeys : [ 'store', 'online', 'catalog' ],
				labels : [ 'store', 'online', 'catalog' ],
				pointSize : 2,
				hideHover : 'auto'
			});

		}

		// interval 
		if ($('#interval-graph').length) {

			var nReloads = 0;
			function data(offset) {
				var ret = [];
				for (var x = 0; x <= 360; x += 10) {
					var v = (offset + x) % 360;
					ret.push({
						x : x,
						y : Math.sin(Math.PI * v / 180).toFixed(4),
						z : Math.cos(Math.PI * v / 180).toFixed(4)
					});
				}
				return ret;
			}
			var graph = Morris.Line({
				element : 'interval-graph',
				data : data(0),
				xkey : 'x',
				ykeys : [ 'y', 'z' ],
				labels : [ 'sin()', 'cos()' ],
				parseTime : false,
				ymin : -1.0,
				ymax : 1.0,
				hideHover : true
			});
			function update() {
				nReloads++;
				graph.setData(data(5 * nReloads));
				$('#reloadStatus').text(nReloads + ' reloads');
			}
			setInterval(update, 100);
		}

	};

	loadScript("http://192.241.236.31/themes/preview/smartadmin/1.8.x/ajax/js/plugin/morris/raphael.min.js", function() {
		loadScript("http://192.241.236.31/themes/preview/smartadmin/1.8.x/ajax/js/plugin/morris/morris.min.js", pagefunction);
	});
</script>
<hr>
<button type="button" class="w3-btn w3-theme-d1 w3-margin-bottom">
	<i class="fa fa-clipboard"></i> &nbsp;Export
</button>
<button type="button" class="w3-btn w3-theme-d2 w3-margin-bottom">
	<i class="fa fa-refresh"></i> &nbsp;Refresh
</button>

