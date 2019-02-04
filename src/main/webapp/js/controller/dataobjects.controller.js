var DataObjectsController = (function() {

	function init(id, model) {

		$('#dataloading').show();

		$.ajax({
			url : 'service/dataservice/metadata/' + id,
			success : function(result) {

				var dataobjects = jQuery.parseJSON(result);

				DataObjectModel.setContext(id);

				$('#jstree2').jstree({
					"plugins" : [ "themes", "contextmenu", "dnd" ],
					contextmenu : {
						"items" : function(node) {
							return {
								"view" : {
									label : "View Map",
									action : function(obj) {

										$("#dialog").dialog({
											autoOpen : false,
											modal : true,
											height : 520,
											width : 1000,
											title : node.text,
											open : function(ev, ui) {

											/**	console.log(dataobjects[0].children)
												for (var j = 0; j < dataobjects[0].children.length; j++) {
													if (dataobjects[0].children[j].text == node.text) {
														// console.log(dataobjects[0].children[j]);
														var children = dataobjects[0].children[j].children;

														for (var i = 0; i < children.length; i++) {
															(function(idx) {
																setTimeout(function() {
																	// console.log(children[idx].text);
																	GoogleMapController.geocode(children[idx].text, children[idx].text);
																}, 1000 * idx);
															})(i);
														}
													}
												}**/

												$('#myIframe').attr('src', '/datalake-report/app/view/map.html?id=' + node.text);
											},
											buttons : {
												"OK" : function() {
													$(this).dialog("close");
													$(this).dialog('destroy');
												},
												Cancel : function() {
													$(this).dialog("close");
													$(this).dialog('destroy');
												}
											}
										});

										$('#dialog').dialog('open');

									}
								},
								"rename" : {
									label : "Rename",
									action : function(obj) {
										$j("#jstree").jstree(true).edit(node);
									}
								},
								"create" : {
									label : "Create New",
									action : function() {
										createNode(node);
									}
								},
								"delete" : {
									label : "Delete",
									action : function() {
										if (confirm("Really delete " + node.text + "?")) {
											deleteNode(node);
										}
									},
									separator_before : true
								}
							};
						}
					},

					'core' : {
						'data' : dataobjects

					}
				}).bind("move_node.jstree", function(event, data) {
					alert('move');
				});

				$('#dataloading').hide();

			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
			}
		});

	}

	return {
		init : init
	};
})();