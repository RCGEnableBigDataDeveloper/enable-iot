//$("#username").hide();
//
//$("#wrapper").mouseover(function() {
//	$("#username").show();
//});
//
//$("#wrapper").mouseout(function() {
//	$("#username").hide();
//});

var loop = 0, resume = true;

function startBeacon() {

	setTimeout(function() {
		$('#custtable').show();
	}, 5000);

	var userprefs;
	$.ajax({
		url : '../../service/dataservice/getUserPrefs/' + 'name',
		success : function(result) {

			userprefs = jQuery.parseJSON(result);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Status: " + textStatus);
			console.log("Error: " + errorThrown);
		}
	});

	$("#fooObject").show();
	var up = -25;
	var right = 25;
	setTimeout(function() {
		var foo = null;
		var ctrl;
		init();
	}, 5000);

	function init() {
		foo = document.getElementById('fooObject');
		foo.style.top = '625px';
		foo.style.left = '505px';
		doMove();
	}

	function notify(idx) {

		if (true) {

			var userprefs = {
				name : "Joe Customer",
				prefs : [ {
					prodname : "trident",
					price : "2.95"
				}, {
					prodname : "dawn",
					price : "4.95"
				}, {
					prodname : "a1",
					price : "4.95"
				} ]
			};// jQuery.parseJSON(userprefs.prefs);

			$.ajax({
				url : '../../service/dataservice/getCompetitivePricing/' + userprefs.prefs[idx].prodname,
				success : function(result) {
					var _result_ = jQuery.parseJSON(result);
					var msg = ''

					// 'Hello ' + userprefs.name + "<br>" +
					// userprefs.prefs[idx].prodname + "<br>valuemart $"
					// + userprefs.prefs[idx].price + "<br>"
					// for ( var key in _result_) {
					// msg += key + " : " + _result_[key][0].id + "<br>";
					// }

					if (idx == 0) {
						msg = 'Hello Jone Doe<br>Eggs are on sale today<br>buy one get one free';
						$("#eggs").html("<b><font color='red'>" + $("#eggs").html() + "</font></b>")
					} else if (idx == 1) {
						msg = 'Hello Jone Doe<br> A1 Steak Sauce<br>Our Price $3.05<br>Walmart $3.06';
						$("#a1").html("<b><font color='red'>" + $("#a1").html() + "</font></b>")
						$("#eggs").html("Eggs 1 dozen")

					} else {
						msg = 'Hello John Doe<br>Tide 32 oz is on sale<br>today 20 percent off';
						$("#tide").html("<b><font color='red'>" + $("#tide").html() + "</font></b>")
						$("#a1").html("A1 Steak Sauce")
					}

					console.log(msg)
					$("#msgs" + "0").show();
					$("#msgs" + "0").html(msg);

					$.ajax({
						url : '../../service/dataservice/notify/' + msg.replace(/<\/?[^>]+(>|$)/g, " "),
						success : function(result) {

						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("Status: " + textStatus);
							console.log("Error: " + errorThrown);
						}
					});
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Status: " + textStatus);
					console.log("Error: " + errorThrown);
				}
			});
		}
	}

	function doMove() {

		console.log(foo.style.top + " :: " + foo.style.left);

		if (foo.style.top == "600px" && foo.style.left == "980px") {
			notify(2);
			clearTimeout(ctrl);
			console.log("beacon done");
			//beaconStarted = false;
			return;
		}

		if (foo.style.top == '500px') {
			// up = 0;
			if (foo.style.left == '955px') {

				if (loop == 0) {
					notify(1);
				}
				loop++;
				resume = false;
				if (loop == 5) {
					resume = true;
				}
			}
			// if (foo.style.left == '955px') {
			// up = 25
			// right = 0;
			// }
		}

		if (foo.style.top == '400px') {
			up = 0;
			if (foo.style.left == '880px') {
				if (loop == 0) {
					notify(0);
				}
				loop++;
				resume = false;
				if (loop == 5) {
					resume = true;
					loop = 0;
				}
			}
			if (foo.style.left == '955px') {
				up = 25
				right = 0;
			}
		}
		if (foo.style.top == '600px' && foo.style.left == '955px') {
			up = 0;
			right = 25;
		}

		if (foo.style.top == '600px' && foo.style.left == '1230px') {
			clearTimeout(ctrl);
			return;
		}

		if (resume) {
			foo.style.top = parseInt(foo.style.top) + up + 'px';
			foo.style.left = parseInt(foo.style.left) + right + 'px';
		}

		ctrl = setTimeout(doMove, 1000);
	}
}