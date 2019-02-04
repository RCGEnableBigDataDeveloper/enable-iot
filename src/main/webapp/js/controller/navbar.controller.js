$(document).ready(
		function() {

			var jobpoll;

			$("#currentdate").html(new Date());

			$("#workflowmenu").mouseover(function() {
				$('.breadcrumbs').html(workflowmenuitems);

				$('#navbarnew').click(function() {

					$("#newworkflowdialog").dialog({
						resizable : false,
						autoOpen : false,
						height : 200,
						width : 500,
						modal : true,
						dialogClass : 'ui-dialog-shadow',
						create : function(event, ui) {
							$(".ui-widget-header").hide();
						},
						buttons : [ {
							text : "OK",
							click : function() {
								removeModel('123');
								$("#modeljson").html('');
								instance.detachEveryConnection();
								instance.deleteEveryEndpoint();
								$.each($(".w"), function(index, elem) {
									elem.remove();
								});
								$('#newworkflowdialog').dialog('close');
								globals.workflowname = $("#newworkflowname").val().toUpperCase();
								$("#treeDemo").hide();
								$('#treeloading').show();
								getAllConnections();
							},
							iconCls : 'icon-cancel'
						} ]
					});

					$('#newworkflowdialog').dialog('open');
				});

				$('#navbaropen').click(function() {
					$("#dialog-open").dialog({
						resizable : false,
						autoOpen : false,
						height : 400,
						width : 400,
						modal : true,
						dialogClass : 'ui-dialog-shadow',
						create : function(event, ui) {
							$(".ui-widget-header").hide();
						},
						buttons : [ {
							text : "Cancel",
							click : function() {
								$('#dialog-open').dialog('close');
							},
							iconCls : 'icon-cancel'
						}, {
							text : "Open",
							click : function() {
								/*
								 * filename = $("#openfilename").val(); var
								 * opennode =
								 * $('#opentree').tree('getSelected'); if
								 * (!opennode || !opennode.id ||
								 * opennode.iconCls == "tree-folder") {
								 * $.messager.alert('Alert', 'Please selct a
								 * workflow file'); } else if (filename == '') {
								 * $.messager.alert('Alert', 'Please select a
								 * workflow file'); } else { open(filename);
								 * $('#dialog-open').dialog('close'); }
								 */
							},
							iconCls : 'icon-save'
						} ]
					});

					$('#dialog-open').dialog('open');
				});

				$('#navbarsave').click(function() {

					$.ajax({
						url : '/getSavedLayouts/' + 'name',
						type : "GET",
						success : function(result) {
							var zNodes = JSON.parse(result);
							var setting = {
								data : {
									simpleData : {
										enable : true
									}
								}
							};

							$.fn.zTree.init($("#saveTree"), setting, zNodes);

							$("#dialog-save").dialog({
								resizable : false,
								autoOpen : false,
								height : 400,
								width : 400,
								modal : true,
								dialogClass : 'ui-dialog-shadow',
								create : function(event, ui) {
									$(".ui-widget-header").hide();
								},
								buttons : [ {
									text : "Cancel",
									click : function() {
										$('#dialog-save').dialog('close');
									},
									iconCls : 'icon-cancel'
								}, {
									text : "Save",
									click : function() {
										var datamodel = {
											'"id"' : '"123"',
											'"grp"' : '""',
											'"parent_fldr_id"' : '"1"',
											'"filename"' : '"' + $("#savefilename").val() + '"',
											'"model"' : JSON.stringify(getModel('123')),
											'"data"' : {}
										};

										console.log(JSON.stringify(getModel('123')));

										$.ajax({
											url : '/save/' + 'folder/file',
											type : "POST",
											contentType : "application/json; charset=utf-8",
											data : JSON.stringify(datamodel),
											dataType : "json",
											success : function(result) {
												console.log(result);
												$('#dialog-save').dialog('close');
											},
											error : function(XMLHttpRequest, textStatus, errorThrown) {
												console.log("Status: " + textStatus);
												console.log("Error: " + errorThrown);
											}
										});
									},
									iconCls : 'icon-save'
								} ]
							});

							$("#savefilename").val(globals.workflowname);
							$('#dialog-save').dialog('open');
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("Status: " + textStatus);
							console.log("Error: " + errorThrown);
						}
					});
				});
			});

			$("#jobmenu").mouseover(
					function() {
						$('.breadcrumbs').html(jobmenuitems);

						$('#schedulejobmenu').click(function() {

							var url = '/pages/calendar.jsp?id=' + '123';
							var $dialogc = $('<div id="caldialog"></div>').html(calendarurl).dialog({
								autoOpen : false,
								resizable : true,
								modal : true,
								height : 700,
								width : 1100,
								title : "",
								create : function(event, ui) {
									$(".ui-widget-header").hide();
								},
								buttons : [ {
									text : "Done",
									click : function() {
										$dialogc.dialog('close');
									},
									iconCls : 'icon-save'
								} ]
							});

							$dialogc.dialog('open');

						});

						$('#runjob').on(
								'click',
								function() {

									var datamodel = prepareModel('123')

									$.ajax({
										url : "/runnow/name",
										type : "POST",
										contentType : "application/json; charset=utf-8",
										data : JSON.stringify(datamodel),
										dataType : "json",
										success : function(result) {
											var response = JSON.parse(result);
											$("#jobdialog").dialog({
												resizable : false,
												autoOpen : false,
												height : 225,
												width : 400,
												modal : true,
												dialogClass : 'ui-dialog-shadow',
												create : function(event, ui) {
													$(".ui-widget-header").hide();
												},
												buttons : [ {
													text : "OK",
													click : function() {
														$('#jobdialog').dialog('close');
														jobpoll = setInterval(poll, 5000);
														function poll() {
															var routeid = datamodel[0].routeid;
															console.log("checking stats for job " + routeid);

															if (datamodel[0].source.itemtype == 'stream') {
																return false;
															}

															$.ajax({
																url : '/getStatistics/' + routeid + "/" + datamodel[0].source.resources.length,
																type : "GET",
																success : function(statisitics) {
																	if (!result || result == '') {
																		console.log(routeid + " still running");
																	} else {

																		if (!statisitics)
																			return false;

																		var statsObj = JSON.parse("[" + statisitics + "]");
																		console.log("got stats for " + routeid +  " clear stats polling");
																		clearInterval(jobpoll);
																		$("#statsdialog").dialog({
																			autoOpen : false,
																			modal : true,
																			height : 600,
																			width : 600,
																			dialogClass : 'ui-dialog-shadow',
																			resizable : true,
																			create : function(event, ui) {
																				$(".ui-widget-header").hide();
																			},
																			buttons : [ {
																				text : "OK",
																				click : function(e) {
																					$("#statsdialog").dialog('close');
																				},
																				iconCls : 'icon-save'
																			} ]
																		});
																		$(".statusbox").attr('src', '/img/job_stop.png');
																		$(".jobstatus").html('completed');
																		$('#statsdialog').dialog('open');
																		globals.routeid = "job_" + new Date().getTime();
																		document.getElementById("statsjson").innerHTML = syntaxHighlight(statsObj, undefined, 2);
																	}
																},
																error : function(XMLHttpRequest, textStatus, errorThrown) {
																	console.log("Status: " + textStatus);
																	console.log("Error: " + errorThrown);
																}
															});
														}
													},
													iconCls : 'icon-save'
												} ]
											});

											$(".statusbox").attr('src', '/img/job_run.png');
											$(".jobstatus").html('running');
											$("#runcnt").html(datamodel.length);
											$("#jobmessage").html(
													"<table cellpadding=6><tr><td valign=top><img src='/img/ok.png'>&nbsp;&nbsp;</td><td><b> " + datamodel[0].routeid
															+ " submitted successfully</b><br>" + "submitted by :  admin" + "<br>submitted on: " + (new Date().getMonth() + 1)
															+ "/" + new Date().getDate() + "/" + new Date().getYear() + " " + new Date().getHours() + ":" + new Date().getMinutes()
															+ ":" + new Date().getSeconds() + "</td></tr><table>");
											$('#jobdialog').dialog('open');
										},
										error : function(XMLHttpRequest, textStatus, errorThrown) {
											console.log("Status: " + textStatus);
											console.log("Error: " + errorThrown);
										}
									});
								});
					});

			$("#viewmenu").mouseover(function() {
				$('.breadcrumbs').html(viewmenuitems);

				$('#viewmodel').click(function() {
					$("#modeldialogitem").html(globals.workflowname);
					$("#modeldialog").dialog({
						autoOpen : false,
						modal : true,
						height : 600,
						width : 600,
						dialogClass : 'ui-dialog-shadow',
						resizable : true,
						create : function(event, ui) {
							$(".ui-widget-header").hide();
						},
						buttons : [ {
							text : "OK",
							click : function(e) {
								$("#modeldialog").dialog('close');
							},
							iconCls : 'icon-save'
						} ]
					});
					$('#modeldialog').dialog('open');

					document.getElementById("modeljson").innerHTML = syntaxHighlight(prepareModel('123'), undefined, 2);
				});
			});

			$("#draggable, #canvas").mouseover(
					function() {
						$('.breadcrumbs').html(
								"<a href=''><span id='workflowname'>" + globals.workflowname + "</span></a>&nbsp; &rarr; &nbsp;<span id='currentdate'>" + new Date() + "</span>");
					});

		});

var zNodes = [ {
	id : 1,
	pId : 0,
	name : "pNode 1",
	open : true
}, {
	id : 11,
	pId : 1,
	name : "pNode 11"
}, {
	id : 111,
	pId : 11,
	name : "leaf node 111"
}, {
	id : 112,
	pId : 11,
	name : "leaf node 112"
}, {
	id : 113,
	pId : 11,
	name : "leaf node 113"
}, {
	id : 114,
	pId : 11,
	name : "leaf node 114"
}, {
	id : 12,
	pId : 1,
	name : "pNode 12"
}, {
	id : 121,
	pId : 12,
	name : "leaf node 121"
}, {
	id : 122,
	pId : 12,
	name : "leaf node 122"
}, {
	id : 123,
	pId : 12,
	name : "leaf node 123"
}, {
	id : 124,
	pId : 12,
	name : "leaf node 124"
}, {
	id : 13,
	pId : 1,
	name : "pNode 13 - no child",
	isParent : true
}, {
	id : 2,
	pId : 0,
	name : "pNode 2"
}, {
	id : 21,
	pId : 2,
	name : "pNode 21",
	open : true
}, {
	id : 211,
	pId : 21,
	name : "leaf node 211"
}, {
	id : 212,
	pId : 21,
	name : "leaf node 212"
}, {
	id : 213,
	pId : 21,
	name : "leaf node 213"
}, {
	id : 214,
	pId : 21,
	name : "leaf node 214"
}, {
	id : 22,
	pId : 2,
	name : "pNode 22"
}, {
	id : 221,
	pId : 22,
	name : "leaf node 221"
}, {
	id : 222,
	pId : 22,
	name : "leaf node 222"
}, {
	id : 223,
	pId : 22,
	name : "leaf node 223"
}, {
	id : 224,
	pId : 22,
	name : "leaf node 224"
}, {
	id : 23,
	pId : 2,
	name : "pNode 23"
}, {
	id : 231,
	pId : 23,
	name : "leaf node 231"
}, {
	id : 232,
	pId : 23,
	name : "leaf node 232"
}, {
	id : 233,
	pId : 23,
	name : "leaf node 233"
}, {
	id : 234,
	pId : 23,
	name : "leaf node 234"
}, {
	id : 3,
	pId : 0,
	name : "pNode 3 - no child",
	isParent : true
} ];

var calendarurl = '<iframe src="/pages/calendar.jsp" style="border: 0px; width:1000px; height:700px" id="calframe" name="calframe"></iframe>'
var viewmenuitems = "<a href='#' id='viewmodel'>VIEW MODEL</a>&nbsp; &rarr; &nbsp; <a href='#' id='viewnodes'>VIEW NODES</a>&nbsp; &rarr; &nbsp; <a href='#' id='viewconnection'>VIEW CONNECTIONS</a>&nbsp; &rarr; &nbsp; <a href=''>ZOOM IN</a>&nbsp; &rarr; &nbsp; <a href=''>ZOOM OUT</a>&nbsp; &rarr; &nbsp; <a href=''>ZOOM RESET</a>";
var jobmenuitems = "<a href='#' id='runjob'>RUN JOB</a>&nbsp; &rarr; &nbsp; <a href='#' id='schedulejobmenu'>SCHEDULE JOB</a>&nbsp; &rarr; &nbsp; <a href=''>CANCEL JOB</a>&nbsp; &rarr; &nbsp; <a href=''>JOB HISTORY</a>"
var workflowmenuitems = "<a href='#' id='navbarnew'>NEW WORKFLOW</a>&nbsp; &rarr; &nbsp; <a href='#' id='navbaropen'>OPEN WORKFLOW</a>&nbsp; &rarr; &nbsp; <a href='#' id='navbarsave'>SAVE WORKFLOW</a>"
