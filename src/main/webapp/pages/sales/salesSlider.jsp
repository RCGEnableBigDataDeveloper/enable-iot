<style type="text/css">
body {
	background: #fff;
	color: #333666;
}

section {
	text-align: center;
	margin: 10px 0;
}

.panzoom-parent {
	border: 2px solid #333;
}

.panzoom-parent .panzoom {
	border: 2px dashed #666;
}

.buttons {
	margin: 40px 0 0;
}
</style>
<script src="http://timmywil.github.io/jquery.panzoom/test/libs/jquery.js"></script>
<script src="http://timmywil.github.io/jquery.panzoom/dist/jquery.panzoom.js"></script>
<script src="http://timmywil.github.io/jquery.panzoom/test/libs/jquery.mousewheel.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<link href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">


<section>

	<div class="parent">
		<div class="panzoom" id='storelayout' style="background-image: url('/img/store1.jpg'); height: 443px; width: 960px; text-align: center; background-repeat: no-repeat;">


			<div id="cont">
				<!-- 	<svg id='svg' xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="960px" height="500px">
				</svg> -->
			</div>

		</div>

		<script>
			function randomPerson(red) {
				
				console.log(red)

				$(".persondiv").hide();

				for (var i = 0; i < 20; i++) {
					/* 				var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
									shape.cx.baseVal.value = Math.floor(Math.random() * (200 - 1) + 1);
									shape.cy.baseVal.value = Math.floor(Math.random() * (200 - 1) + 1);
									shape.r.baseVal.value = 5;
									shape.setAttribute("fill", "red");
								shape.setAttribute("stroke", "black");
									shape.setAttribute("stroke-width", "1"); 
									shape.setAttribute("fill-opacity", 0.4);

									svg.appendChild(shape);
					 */

					/* 				 var x =(Math.floor(Math.random() * 100) + 1);
									 console.log(x)
									var DOM_img = document.createElement("img");
									DOM_img.src = "/img/person.png";
									//DOM_img.setAttribute("style", "margin-left:100px;");  
									DOM_img.setAttribute("style", "margin-top:" + x + "px;");  */

					(function makeDiv() {
						// vary size for fun
						var divsize = ((Math.random() * 100) + 50).toFixed();
						var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
						var person_color = red ? "person_red" : "person";
						$newdiv = $('<div class="persondiv"><a href="javascript:showSalesModal()"><img src="/img/'+ person_color + '.png" style="opacity:0.75"></a></div>').css({
						//	'width' : divsize + 'px',
						//	'height' : divsize + 'px',
						//  'background-color': color
						});

						red = false;

						// make position sensitive to size and document's width
						var posx = (Math.floor(Math.random() * 850) + 1); //(Math.random() * ($(document).width() - divsize)).toFixed();
						var posy = (Math.floor(Math.random() * 250) + 100);//(Math.random() * ($(document).height() - divsize)).toFixed();

						$newdiv.css({
							'position' : 'absolute',
							'left' : posx + 'px',
							'top' : posy + 'px',
							'display' : 'none'
						}).appendTo('#cont').fadeIn(1000).delay(1000)
					})();

					//	$('#cont').append(DOM_img);
				}

				var $section = $('#svg');
				$section.find('path').panzoom({
					$reset : $section.find(".reset"),
					disableZoom : true
				});
			}

			randomPerson();
		</script>


	</div>
	<div class="buttons" style='position: relative; top: -60px; left: 20px; opacity: 0.8;'>
		<!-- 		<button class="zoom-in">Zoom In</button>
		<button class="zoom-out">Zoom Out</button> -->
		<input type="range" class="zoom-range" style='height: 10px !important'>
		<!-- 	<button class="reset">Reset</button> -->
	</div>
	<script>
		function showSalesModal() {
			//$(window.parent.document).find('#salesModal').show();
			$(window.parent.document).find('#salesdiv2').hide()
			$(window.parent.document).find('#salesdatadiv').show()
			
		}
		(function() {
			var $section = $('section').first();
			$section.find('.panzoom').panzoom({
				$zoomIn : $section.find(".zoom-in"),
				$zoomOut : $section.find(".zoom-out"),
				$zoomRange : $section.find(".zoom-range"),
				$reset : $section.find(".reset")
			});
		})();
	</script>
</section>

