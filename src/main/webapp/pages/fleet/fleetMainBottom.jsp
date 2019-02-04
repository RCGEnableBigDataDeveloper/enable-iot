<table style='padding-top: 10px; padding-bottom: 10px;' id='fleetslider'>
	<tr>
		<td><iframe src="/fleetslider" height="480" width="950px" id='' scrolling="yes" frameBorder="0"></iframe></td>
	</tr>
</table>

<table style='padding-top: 10px; padding-bottom: 10px; display: none' id='fleetvideo'>
	<tr>
		<td>
			<div class="">
				<video loop autoplay="autoplay" id='' style="border: 0px none; margin-left: 0px; height: 425px; margin-top: -0px;">
					<source src="/img/traffic.mp4" type="video/mp4">
				</video>
			</div>
		</td>
		<td style='width: 10px'></td>
		<td valign=top><div style='color: #666; font-size: 10px;'>
				<table>
					<tr>
						<td colspan=2 width=300><b>RCG | enable RETAIL Fleet Information</b></td>
					</tr>
					<tr>
						<td colspan=2 width=300><b><span id='truckdate'></span></b></td>
					</tr>
					<tr>
						<td height=4>

							<div id="tail">
								<div></div>
							</div>

						</td>
						<!-- </tr>
					<tr>
						<td>Driver Identification</td>
						<td>--</td>
					</tr>

					<tr>
						<td>Driver Contact</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Origin</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Destination</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Heading</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Mileage</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Speed</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Engine Temperature</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Cabin Temperature</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Tire Pressure</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Cargo Weight</td>
						<td>--</td>
					</tr>
					<tr>
						<td>Cargo Value</td>
						<td>--</td> -->
					</tr>
				</table>
			</div></td>
	</tr>
</table>
<script>
	$("#truckdate").html(new Date());

	/* setInterval(function() {
		$("<div />").text("log line " + "").appendTo("#tail")
	}, 2000) */;

	var height = $("#tail").get(0).scrollHeight;
	$("#tail").animate({
		scrollTop : height
	}, 3000);
</script>
