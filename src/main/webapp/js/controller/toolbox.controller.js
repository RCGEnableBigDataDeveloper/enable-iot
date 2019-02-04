$(document).ready(function() {

	$('#toolbox').draggable();

	$('.icon-zoom-in').on('click', function() {
		renderer.setZoom(renderer.getZoom() + .1);
	});

	$('.icon-zoom-out').on('click', function() {
		renderer.setZoom(renderer.getZoom() - .1);
	});

	$('.icon-zoom-reset').on('click', function() {
		renderer.setZoom(1);
	});

	$('.icon-zoom-reset').on('click', function() {
		renderer.setZoom(1);
	});
});