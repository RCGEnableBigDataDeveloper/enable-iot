
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



									<table style='padding-top: 7px'>
										<tr>
											<td height=5px></td>
										</tr>
										<tr>

											<td>&nbsp;<a href='#' onclick="DeleteLastPoint();">Delete
													Last Point</a> &nbsp;|&nbsp;
											</td>
											<td><a href='#' onclick="ClearAllPoints();">Clear
													All Points</a> &nbsp;|&nbsp;</td>
											<td><a href='#' onclick="ShowHide();">Show All
													Points</a> &nbsp;|&nbsp;</td>

											<td>Area (miles)</td>
											<td><span align="center" id="area">0 m&sup2;</span>
												&nbsp;|&nbsp;</td>
											<td>Area (kilometers)</td>
											<td>
											<td><span align="center" id="areakm">0 km&sup2;</span></td>
										</tr>
									</table>



								</div>
							</div>


							<div id="wid-map-local-div" style="height: 650px;">

								<div id="map_canvas" style="width: 100%; height: 650px;"></div>

								<script src="/js/controller/deliveryPositionController.js"></script>
								<script>
									_initialize();
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
						<div class="widget-body no-padding"
							style='height: 695px; overflow: hidden;'>

							<div class="alert alert-info no-margin">
								<!-- SC county form row -->
								<form method="POST" class="county_data-form"
									id="county_data-form">
									<ol class="breadcrumb" style="margin: 0;">
										<input type='hidden' name='csrfmiddlewaretoken'
											value='ZrxDcVnAlXClYoljuUXg2kezk6LvTmpxP6Owurt366AoeF3Aw6xl14Q6X4qSaYSk' />
										<li><label for="id_state">View:</label> <select
											onchange='changevid(this)' id="truckview" name="state"
											required>
												<option value="" selected="selected">3D</option>
												<option value="AL">DashCam</option>

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
											<th></th>
											<th width="20%"></th>
											<th></th>
											<th></th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody>







										<tr class="click-row" id="inact_q" data-measure-ref="inact_q"
											data-measure-name="Physical inactivity">

											<td></td>
											<td width=500>&nbsp;</td>




											<td></td>

											<td></td>

											<td></td>


											<td></td>

										</tr>




									</tbody>
								</table>

								<br> <br>

								<video controls loop autoplay="autoplay" id='video'
									style="border: 0px none; margin-left: 0px; height: 1000px; margin-top: -200px; width: 99.9%;">
									<source src="/img/truck.mp4" type="video/mp4">
									<source src="/img/truck.ogg" type="video/ogg">
									Your browser does not support the video tag.
								</video>




								<script>
									function changevid(id) {
										var sel = document.getElementById("truckview");
										var text = sel.options[sel.selectedIndex].text;
										if (text == 'DashCam') {
											var video = document.getElementById('video');
											video.height = 1000;
											video.src = '/img/drive.mp4';
											video.play();
										} else {
											var video = document.getElementById('video');
											video.height = 1000;
											video.src = '/img/truck.mp4';
											video.play();
										}
									}
								</script>
								<!-- 	<iframe scrolling="no"
													src="https://www.youtube.com/v/40Vvvc2Z5OM?autoplay=1&loop=1&&playlist=40Vvvc2Z5OM"
													style="border: 0px none; margin-left: 0px; height: 800px; margin-top: -60px; width: 100%;"></iframe>

 -->
							</div>


							<div
								style='position: absolute; top: 60px; width: 100%; left: 0px; background-color: #000; height: 150px;'>
							</div>

							<div
								style='position: absolute; top: 100px; left: 600px; color: #eee; font-size: 10px;'>
								<table>
									<tr>
										<td colspan=2 width=200 align=right><b>Estimated
												Arrival Time</b></td>
									</tr>
									<tr>
										<td><div id='eta'></div></td>

									</tr>
								</table>
							</div>
							<script>$("#eta").html(new Date());</script>
							<div
								style='position: absolute; top: 100px; left: 40px; color: #eee; font-size: 10px;'>
								<table>
									<tr>
										<td colspan=2 width=200><b>Fleet Information</b></td>
									</tr>
									<tr>
										<td height=4></td>
									</tr>
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
										<td>--</td>
									</tr>
								</table>
							</div>

						</div>
					</div>
				</div>
			</article>

		</div>

	</section>

</div>
