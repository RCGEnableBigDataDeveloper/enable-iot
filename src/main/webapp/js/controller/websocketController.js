var beaconStarted = false;

(function() {

	setInterval(function() {
		getTweets("");
	}, 3000);

	function getTweets(frame) {
		$.ajax({
			url : '/getTweets/name',
			success : function(result) {
				var tweet = jQuery.parseJSON(result);
				console.log(tweet)
				var tweettble = "<tr><td class='bordercell' width=30 valign=top><img src='" + tweet.img + "' height=30 width=30></td><td  class='bordercell'>" + tweet.tweet + "</td></tr>"
				$('#tweettable').prepend(tweettble);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});
	}

	var counter = 0;

	var socket = new SockJS("/valuemart-web/service/ws");
	var stompClient = Stomp.over(socket);

	var connectCallback = function() {
		stompClient.subscribe('/topic/msg', handleMessage);
	};

	var errorCallback = function(error) {
		alert(error);
	};

	stompClient.connect("guest", "guest", connectCallback, errorCallback);

	function handleMessage(frame) {

		console.log(frame);

		var body = jQuery.parseJSON(frame.body);

		var msg = jQuery.parseJSON(body[0].message);

		console.log(msg);

		if (msg.cart) {
			var curInvLvl = document.getElementsByTagName('text')
			var t = curInvLvl[curInvLvl.length - 1];
			t.setAttributeNS(null, "font-size", '36px');

			setTimeout(function() {
				t.textContent = t.textContent - 1

				setTimeout(function() {
					t.setAttributeNS(null, "font-size", '14px');
				}, 2000);
			}, 2000);

		}

		if (msg.beacon) {

			if (!beaconStarted) {
				startBeacon();
				beaconStarted = true;
				console.log("BEACON STARTED")
			}
		}

		if (!msg.user) {

			var event = new Event('change');
			document.getElementById("end").selectedIndex = 1;
			document.getElementById("end").dispatchEvent(event);

		} else {

			counter++;
			if (counter >= 7) {
				$('#tweettable tr:last').remove();
				$('#tweettable tr:last').remove();
				$('#tweettable tr:last').remove();
			}

			color = '#fff';
			if (counter % 2 == 0)
				color = '#F0F0F0';

			var leftPos = Math.floor(Math.random() * (1323 - 487 + 1)) + 487;
			var topPos = Math.floor(Math.random() * (700 - 244 + 1)) + 244;

			$("#usmap").append(
					'<div id="obj"' + leftPos + topPos + ' style="display: block; position: absolute; top: ' + topPos + 'px; left: ' + leftPos
							+ 'px"> <div id="holder"> <div id=wrapper> <div class="dot1" id=a></div> <div class="pulse1"></div> </div> </div> </div>');

			$("#tweettable").prepend(
					"<tr><td><table style='background-color:" + color + "'><tr><td><img src='" + msg.img + "'></td><td>" + msg.created + "<br>" + msg.displayname
							+ "</td></tr><tr><td colspan=2>" + msg.tweet + "</td></tr></table></td></tr>");

			setTimeout(function() {
				$("#obj" + leftPos + topPos).hide()
			}, 3000);

		}
	}

}());