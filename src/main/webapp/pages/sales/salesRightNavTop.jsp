<script>
	$.ajax({
		url : '/dataservice/startTwitter/' + 'name',
		success : function(result) {

			//console.log(result)
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Status: " + textStatus);
			console.log("Error: " + errorThrown);
		}
	});

	var tweets = setInterval(function() {
		$.ajax({
			url : '/dataservice/getTweets/' + 'name',
			success : function(result) {

				var tweet = JSON.parse(result);
				//console.log(tweet.displayname + " : " + tweet.tweet)
				$("#tweettable").append(
						"<tr><td class=bordercell valign=top><img src='" + tweet.img + "'></td><td class='bordercell tweetname' valign=top><b>" + tweet.displayname + "</b><br>" + tweet.tweet
								+ "</td></tr>");

				var objDiv = $("#tweetdiv");
				var h = objDiv.get(0).scrollHeight;
				objDiv.animate({
					scrollTop : h
				});
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});

	}, 1000);
</script>
<center>
	<div style="position: relative; right: 5px; width: 320px; overflow: auto; height: 495px; border: 1px solid #ccc; padding-bottom: 2px; padding-top: 2px;" id="tweetdiv">
		<table id='tweettable' class='bordertable' style='width: 99%;'></table>
	</div>
</center>
