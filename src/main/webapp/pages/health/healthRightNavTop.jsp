<style>
#healthdiv1 {
	height: 250px;
	overflow: hidden;
	position: relative;
}

#healthframe1 {
	position: absolute;
	top: -130px;
	left: -170px;
	width: 1280px;
	height: 1200px;
}
</style>
<table class="bordertable">
	<tr>
		<td class="bordercell" style="width: 400px; background-color: #fff">
			<table>
				<tr>
					<td class="bordercell" style='font-size: 14px; width: 270px; background-color: #fff;; text-align: center' nowrap="nowrap">Total Monitored Claims</td>
					<td class="bordercell" rowspan=2 style="text-align: center; background-color: #fff"><img src="/img/up.png" /><br>&nbsp;<span style="font-size: 10px; padding-top: 3px; padding-right: 4px;" id="claimdiff">10982</span></td>
				</tr>
				<tr>
					<td class="bordercell" style='font-size: 20px; text-align: center; color: #000; background-color: #fff' id="claim">103,985</td>

				</tr>

			</table>
		</td>

	</tr>

	<tr>
		<td class="bordercell" style="width: 400px; background-color: #fff">
			<table>
				<tr>
					<td class="bordercell" style='font-size: 14px; width: 270px; background-color: #fff;; text-align: center' nowrap="nowrap">Total Payments / Year</td>
					<td class="bordercell" rowspan=2 style="text-align: center; background-color: #fff"><img src="/img/up.png" /><br>&nbsp;<span style="padding-top: 1px; padding-right: 4px; font-size: 10px; background-color: #fff" id="totalclaimdiff">56872</span></td>
				</tr>
				<tr>
					<td class="bordercell" style='font-size: 20px; text-align: center; color: #000; background-color: #fff' id="totalclaim">38,996,226</td>

				</tr>

			</table>
		</td>

	</tr>

	<tr>

		<td class="bordercell" style="width: 50%">
			<table>
				<tr>
					<td class="bordercell" style='font-size: 14px; width: 270px; text-align: center' nowrap="nowrap">Average Claim Amount</td>
					<td class="bordercell" rowspan=2 style="text-align: center"><img src="/img/up.png" vspace="" /><br> &nbsp;&nbsp;&nbsp;<span style="font-size: 10px; padding-top: 3px; padding-right: 4px;" id="avgclaimdiff">238</span>&nbsp;&nbsp;</td>
				</tr>
				<tr>
					<td class="bordercell" style='font-size: 20px; background-color: #fff; text-align: center; color: #000; background-color: #fff;' id="avgclaim">960</td>

				</tr>

			</table>
		</td>

	</tr>
	<tr>
		<td class="bordercell" colspan="2" style="height: 265px; width: 350px; background-color: #fff""><div id="healthdiv1">
				<iframe src="http://13.58.6.124:38888/arc/apps/app/240?sheet=1" id="healthframe1" scrolling="no"></iframe>
			</div></td>
	</tr>
	<tr>
		<td class='bordercell' style="height: 40px"></td>
	</tr>
</table>

<script>
	setInterval(function() {

		var rand = Math.floor(Math.random() * 6) + 1;
		var claim = $("#claim").html();
		var claimInt = parseInt(claim.replace(",", ""));
		claimInt = claimInt + rand
		$("#claim").html(claimInt.toLocaleString());

		rand = Math.floor(Math.random() * 6) + 1;
		var tclaim = $("#totalclaim").html();
		tclaimInt = parseInt(tclaim.replace(",", ""));
		tclaimInt = tclaimInt + rand
		$("#totalclaim").html(tclaim);

		rand = Math.floor(Math.random() * 6) + 1;
		claim = $("#avgclaim").html();
		claimInt = parseInt(claim.replace(",", ""));
		claimInt = claimInt + rand
		$("#avgclaim").html(claimInt.toLocaleString());

	}, 3000);
</script>
.
