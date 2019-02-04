<!-- 
<!DOCTYPE html>
<meta charset="utf-8">
<style>
.node {
	cursor: pointer;
}

.node:hover {
	stroke: #000;
	stroke-width: 1.5px;
}

.node--leaf {
	fill: red;
}

.label {
	font: 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
	text-anchor: middle;
	text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
}

.label, .node--root, .node--leaf {
	pointer-events: none;
}
</style>
<svg width="960" height="520" style='background-image: url("/img/store.jpg"); background-repeat: no-repeat;padding-left: 300px'></svg>
<script src="/js/lib/jquery/jquery.ui/d3.v4.min.js" charset="utf-8"></script> -->
<!-- <script>

var svg = d3.select("svg"),
    margin = 100,
    diameter = 400;// +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

d3.json("/data/flare.json", function(error, root) {
  if (error) throw error;

  root = d3.hierarchy(root)
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });

  var focus = root,
      nodes = pack(root).descendants(),
      view;

  var circle = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
       .style("fill-opacity", function(d) { return 0.4; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.data.name; });

  var node = g.selectAll("circle,text");

  svg
      //.style("background-image", color(-1))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
});

</script>















<script>
	$.get("/data/DM_data.csv", function(data) {
		var lines = data.split("\n");
		$.each(lines, function(index, line) {
			if (index > 0 && line != '') {
				var _data_ = line.split(",");
				//console.log(index + ": " + _data_[0]);
			}

			
		});
	});
	
	
</script> -->


<style>
#salesdiv2 {
	height: 450px;
	overflow: hidden;
	position: relative;
}

#salesframe2 {
	position: absolute;
	top: -100px;
	left: -140px;
	width: 1280px;
	height: 1200px;
}
</style>

<div id="salesdiv2">
	<iframe src="http://13.58.6.124:38888/arc/apps/app/240?sheet=1" id="salesframe2" scrolling="no"></iframe>
</div>

<div id="salesdatadiv" style="width: 100%; display: none;">
	<iframe src="/slider" height="500" width="100%" id='' scrolling="yes" frameBorder="0"></iframe>
</div>
