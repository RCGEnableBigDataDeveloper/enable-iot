(function() {

	'use strict';

	/**
	 * tabs
	 * 
	 * @description The Tabs component.
	 * @param {Object}
	 *            options The options hash
	 */
	var tabs = function(options) {

		var el = document.querySelector(options.el);
		var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
		var tabContentContainers = el.querySelectorAll(options.tabContentContainers);
		var activeIndex = 0;
		var initCalled = false;

		/**
		 * init
		 * 
		 * @description Initializes the component by removing the no-js class
		 *              from the component, and attaching event listeners to
		 *              each of the nav items. Returns nothing.
		 */
		var init = function() {
			if (!initCalled) {
				initCalled = true;
				el.classList.remove('no-js');

				for (var i = 0; i < tabNavigationLinks.length; i++) {
					var link = tabNavigationLinks[i];
					handleClick(link, i);
				}
			}
		};

		/**
		 * handleClick
		 * 
		 * @description Handles click event listeners on each of the links in
		 *              the tab navigation. Returns nothing.
		 * @param {HTMLElement}
		 *            link The link to listen for events on
		 * @param {Number}
		 *            index The index of that link
		 */
		var handleClick = function(link, index) {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				goToTab(index);
			});
		};

		/**
		 * goToTab
		 * 
		 * @description Goes to a specific tab based on index. Returns nothing.
		 * @param {Number}
		 *            index The index of the tab to go to
		 */
		var goToTab = function(index) {

			
			if (index == 1) {
				
			} else {
				$("#deliverylist").html('');
			}
			var today = new Date();
			if (index == 2) {
				(function($) {
					var Months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

					$(document).ready(function() {
						$("#dateSlider").dateRangeSlider({
							bounds : {
								min : new Date(2017, 0, 1),
								max : new Date(2017, 11, 31, 12, 59, 59)
							},
							defaultValues : {
								min : new Date().setDate(today.getDate()-21),
								max : today
							},
							scales : [ {
								next : function(val) {
									var next = new Date(val);
									return new Date(next.setMonth(next.getMonth() + 1));
								},
								label : function(val) {
									return Months[val.getMonth()];
								}
							} ]
						});
					});
				})(jQuery);

				$("#dateSlider").bind("valuesChanging", function(e, data) {
					// console.log("Something moved. min: " + data.values.min +
					// " max: " + data.values.max);
					
					
					var start = new Date(data.values.min);
					var end = new Date(data.values.max);

					var startMonth = ((start.getMonth() + 1) < 10) ? "0" + ((start.getMonth() + 1)) : (start.getMonth() + 1);
					var endMonth = ((end.getMonth() + 1) < 10) ? "0" + ((end.getMonth() + 1)) : (end.getMonth() + 1);
					var startMonthStr = startMonth + "/" + start.getDate() + "/" + start.getFullYear();
					var endMonthStr = endMonth + "/" + end.getDate() + "/" + end.getFullYear();

					ForecastController.init(startMonthStr, endMonthStr);
					
					
					
				});

				$("#dateSlider").bind("valuesChanged", function(e, data) {
					// console.log("Values just changed. min: " +
					// data.values.min + " max: " + data.values.max);
					var start = new Date(data.values.min);
					var end = new Date(data.values.max);

					var startMonth = ((start.getMonth() + 1) < 10) ? "0" + ((start.getMonth() + 1)) : (start.getMonth() + 1);
					var endMonth = ((end.getMonth() + 1) < 10) ? "0" + ((end.getMonth() + 1)) : (end.getMonth() + 1);
					var startMonthStr = startMonth + "/" + start.getDate() + "/" + start.getFullYear();
					var endMonthStr = endMonth + "/" + end.getDate() + "/" + end.getFullYear();

					ForecastController.init(startMonthStr, endMonthStr);
				});
			}

			if (index == 1) {
				// _initialize();
			} else {
				$("#deliverylist").html('');
			}

			if (index == 4) {
				setTimeout(function() {
					$('#olist').ddslick('open');
				}, 100);
			}

			if (index == 1) {
				$("#popup").hide();
			} else {
				$(".modal-box, .modal-overlay").fadeOut(500, function() {
					$(".modal-overlay").remove();
				});
			}

			showActive(index);

			if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
				tabNavigationLinks[activeIndex].classList.remove('is-active');
				tabNavigationLinks[index].classList.add('is-active');
				tabContentContainers[activeIndex].classList.remove('is-active');
				tabContentContainers[index].classList.add('is-active');
				activeIndex = index;
			}
		};

		var showActive = function(index) {
			for (var i = 0; i < tabNavigationLinks.length; i++) {
				if (index != i) {
					$("#west_" + i).hide();
					$("#east_" + i).hide();
				} else {
					$("#west_" + i).show();
					$("#east_" + i).show();
				}
			}
		};

		/**
		 * Returns init and goToTab
		 */
		return {
			init : init,
			goToTab : goToTab
		};

	};

	/**
	 * Attach to global namespace
	 */
	window.tabs = tabs;

})();