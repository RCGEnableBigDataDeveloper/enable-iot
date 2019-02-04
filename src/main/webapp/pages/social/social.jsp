<link rel="stylesheet" href="/css/style.min.css">
<div id="content">

	<section id="widget-grid" class="">
		<!-- WIDGET ROW START -->
		<div class="row">

			<article
				class="col-xs-12 col-sm-6 col-md-6 col-lg-6 sortable-grid ui-sortable">

				<div class="jarviswidget jarviswidget-color-blue" id="wid_map"
					data-widget-editbutton="false" data-widget-fullscreenbutton="false"
					data-widget-deletebutton="false">

					<header>
						<span class="widget-icon"> <i class="fa fa-map-marker"></i>
						</span>
						<h2>Patients in Active Monitoring</h2>
						<div class="widget-toolbar">

							<a href="/mapxl/10/" style="color: white;"
								class="btn btn-xs button-icon" rel="tooltip" title=""
								data-placement="bottom" data-original-title="expand"> <i
								class="fa fa-expand "></i>
							</a>

						</div>
					</header>
					<!-- widget div-->
					<div>
						<!-- widget content -->
						<div class="widget-body no-padding">
							<div class="alert alert-info no-margin">
								<div id="floating-panel">
									<input id="address" type="textbox" style="width: 300px;"
										value="379 Thornall St # 14 Edison, NJ  08837"> <select
										id="searchType">
										<option value="none"></option>
										<option value="doctor">doctor</option>
										<option value="dentist">dentist</option>
										<option value="hospital">hospital</option>
										<option value="parking">parking</option>
										<option value="pharmacy">pharmacy</option>
										<option value="physiotherapist">physiotherapist</option>
									</select> <input id="starttweet" type="button" value="Find">


								</div>
							</div>


							<div id="wid-map-local-div" style="height: 700px;">













								<div
									style="height: 700px; background-color: #fff; text-align: left; padding-top: 50px"
									id='usmap'></div>

								<script>
									$("#starttweet")
											.click(
													function() {

														$
																.ajax({
																	url : '/getMetrics/name',
																	success : function(result) {

																		setInterval(function() {
																			getTweets("");
																		}, 3000);

																		function getTweets(frame) {
																			$
																					.ajax({
																						url : '/getTweets/name',
																						success : function(result) {
																							var tweet = jQuery.parseJSON(result);
																							console.log(tweet)
																							var tweettble = "<tr><td class='bordercell' width=30 valign=top><img src='" + tweet.img + "' height=30 width=30></td><td  class='bordercell'>"
																									+ tweet.tweet + "</td></tr>"
																							$('#tweettable').prepend(tweettble);
																						},
																						error : function(XMLHttpRequest, textStatus, errorThrown) {
																							console.log("Status: " + textStatus);
																							console.log("Error: " + errorThrown);
																						}
																					});
																		}

																	},
																	error : function(XMLHttpRequest, textStatus, errorThrown) {
																		console.log("Status: " + textStatus);
																		console.log("Error: " + errorThrown);
																	}
																});
													});

									var width = 910, height = 590;

									var rateById = d3.map();

									var quantize = d3.scale.quantize().domain([ 0, .15 ]).range(d3.range(9).map(function(i) {
										return "q" + i + "-9";
									}));

									var projection = d3.geo.albersUsa().scale(1280).translate([ width / 2, height / 2 ]);

									var path = d3.geo.path().projection(projection);

									var svg = d3.select("#usmap").append("svg").attr("width", width).attr("height", height);

									queue().defer(d3.json, "/js/us.json").defer(d3.tsv, "/js/us.tsv", function(d) {
										rateById.set(d.id, +d.rate);
									}).await(ready);

									function ready(error, us) {
										if (error)
											throw error;

										svg.append("g").attr("class", "counties").selectAll("path").data(topojson.feature(us, us.objects.counties).features).enter().append("path")
												.attr("class", function(d) {
													return quantize(rateById.get(d.id));
												}).attr("d", path);

										svg.append("path").datum(topojson.mesh(us, us.objects.states, function(a, b) {
											return a !== b;
										})).attr("class", "states").attr("d", path);
									}

									d3.select(self.frameElement).style("height", height + "px");
								</script>



							</div>
							<!--wid-scripts-table-div>-->
						</div>
						<!-- widget content -->
					</div>



				</div>


			</article>
			<article
				class="col-xs-12 col-sm-6 col-md-6 col-lg-6 sortable-grid ui-sortable">

				<div class="jarviswidget jarviswidget-color-blue"
					id="wid_county_health" data-widget-editbutton="false"
					data-widget-deletebutton="false">

					<header>
						<span class="widget-icon"> <i class="fa fa-table"></i>
						</span>
						<h2>County Health Behaviors</h2>
					</header>
					<div>
						<div class="widget-body no-padding" style='height: 750px'>

							<div class="alert alert-info no-margin">
								<!-- SC county form row -->
								<form method="POST" class="county_data-form"
									id="county_data-form">
									<ol class="breadcrumb" style="margin: 0;">
										<input type='hidden' name='csrfmiddlewaretoken'
											value='ZrxDcVnAlXClYoljuUXg2kezk6LvTmpxP6Owurt366AoeF3Aw6xl14Q6X4qSaYSk' />
										<li><label for="id_state">State:</label> <select
											id="id_state" name="state" required>
												<option value="" selected="selected">---------</option>
												<option value="AL">Alabama</option>
												<option value="AK">Alaska</option>
												<option value="AZ">Arizona</option>
												<option value="AR">Arkansas</option>
												<option value="CA">California</option>
												<option value="CO">Colorado</option>
												<option value="CT">Connecticut</option>
												<option value="DE">Delaware</option>
												<option value="DC">District of Columbia</option>
												<option value="FL">Florida</option>
												<option value="GA">Georgia</option>
												<option value="HI">Hawaii</option>
												<option value="ID">Idaho</option>
												<option value="IL">Illinois</option>
												<option value="IN">Indiana</option>
												<option value="IA">Iowa</option>
												<option value="KS">Kansas</option>
												<option value="KY">Kentucky</option>
												<option value="LA">Louisiana</option>
												<option value="ME">Maine</option>
												<option value="MD">Maryland</option>
												<option value="MA">Massachusetts</option>
												<option value="MI">Michigan</option>
												<option value="MN">Minnesota</option>
												<option value="MS">Mississippi</option>
												<option value="MO">Missouri</option>
												<option value="MT">Montana</option>
												<option value="NE">Nebraska</option>
												<option value="NV">Nevada</option>
												<option value="NH">New Hampshire</option>
												<option value="NJ">New Jersey</option>
												<option value="NM">New Mexico</option>
												<option value="NY">New York</option>
												<option value="NC">North Carolina</option>
												<option value="ND">North Dakota</option>
												<option value="OH">Ohio</option>
												<option value="OK">Oklahoma</option>
												<option value="OR">Oregon</option>
												<option value="PA">Pennsylvania</option>
												<option value="RI">Rhode Island</option>
												<option value="SC">South Carolina</option>
												<option value="SD">South Dakota</option>
												<option value="TN">Tennessee</option>
												<option value="TX">Texas</option>
												<option value="UT">Utah</option>
												<option value="VT">Vermont</option>
												<option value="VA">Virginia</option>
												<option value="WA">Washington</option>
												<option value="WV">West Virginia</option>
												<option value="WI">Wisconsin</option>
												<option value="WY">Wyoming</option>
										</select></li>
										<li><label for="id_county">County:</label> <select
											id="id_county" name="county">
										</select></li>
										<li><button type="submit" class="btn btn-default btn-xs">Get</button></li>
									</ol>
									<div id="county_data-form-results"></div>
									<!-- errors go here -->
								</form>
								<!-- end SC county form row -->
							</div>
							<div class="table-responsive">

								<table class="table table-hover">
									<thead>
										<tr>
											<th nowrap>Focus Area</th>
											<th width="100%"><i class="fa fa-building"></i> Measure</th>

										</tr>
									</thead>
									<tbody id='tweettable'>

										<tr class="click-row" id="inact_q" data-measure-ref="inact_q"
											data-measure-name="Physical inactivity">

											<td></td>
											<td width=500>&nbsp;</td>


										</tr>

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>


			</article>

		</div>

	</section>

</div>


</div>

<div class="page-footer">
	<div class="row">
		<div class="col-xs-12 col-sm-6">
			<!--RCG|enable&trade; Healthcare -->
			<span class="txt-color-white"> © 2017 RCG. <span
				class="hidden-xs">All Rights Reserved. Proprietary and
					Confidential.</span></span>
		</div>


		<div class="col-xs-6 col-sm-6 text-right hidden-xs">
			<div class="txt-color-white inline-block">
				<i class="txt-color-blueLight hidden-mobile"> Last login <i
					class="fa fa-clock-o"></i> <strong> Feb. 7, 2017, 1:12
						p.m. &nbsp;</strong>
				</i>

			</div>

			</ul>
		</div>

	</div>