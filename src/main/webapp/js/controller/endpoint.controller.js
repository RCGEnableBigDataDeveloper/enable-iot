var globals = {
	identifier : 'endpoint',
	selectednodes : [],
	currentnode : undefined,
	workflowname : 'UNTITLED WORKFLOW',
	id : 0,
	routeid : "job_" + new Date().getTime()
};

var zTreeObj;

$(document).ready(function() {

	"use strict";

	getAllConnections();

	$('.icon-expandall').on('click', function() {
		zTreeObj.expandAll(true);
	});

	$('.icon-collapseall').on('click', function() {
		zTreeObj.expandAll(false);
	});
});

function getAllConnections() {
	$.ajax({
		url : "/getConnections/" + "name",
		success : function(result) {

			$('#treeloading').hide();
			$("#treeDemo").show();

			var zNodes = JSON.parse(result);
			var setting = {
				callback : {
					onRightClick : myOnRightClick
				}
			};

			zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
			zTreeObj.expandAll(false);

			$(".node_name").draggable({
				helper : 'clone',
				drag : function(event, ui) {
				},
				stop : function(event, ui) {
				},
				start : function(event, ui) {
					var nodeId = $(event)[0].currentTarget.id;
					nodeId = nodeId.substring(0, nodeId.length - 5);
					globals.currentnode = zTreeObj.getNodeByParam('tId', nodeId);
					zTreeObj.selectNode(globals.current);
				}
			});

			$('#canvas').droppable({
				drop : function(event, ui) {

					if (ui.draggable[0].className.indexOf('node_name') == -1)
						return false;

					var node = globals.currentnode;

					var wrapper = $(this).parent();
					var parentOffset = wrapper.offset();
					var relX = event.pageX - parentOffset.left + wrapper.scrollLeft();
					var relY = event.pageY - parentOffset.top + wrapper.scrollTop();

					var nodeKey = ((node.parent) ? node.parent.replace(/\\/g, "/") : "") + node.name + "|" + node.data.config.host + "|" + node.data.config.type;

					console.log(node);
					console.log(nodeKey);

					$.ajax({
						url : "/getMetadata/" + "name",
						type : "POST",
						contentType : "application/json; charset=utf-8",
						dataType : "json",
						data : "{\"key\": \"" + nodeKey.toLowerCase() + "\"}",
						success : function(result) {
							var metadata = JSON.parse(result);
							if (metadata[0]) {
								console.log(metadata[0].data);
								if (!node.schema) {
									node.schema = JSON.parse(metadata[0].data);
								}
							}

							$.ajax({
								url : '/getOptions/' + node.data.config.type,
								success : function(result) {
									var options = JSON.parse(result);
									var rows = [], advanced = [];
									$.each(options, function(index, elem) {
										var row = {
											name : elem.name,
											value : '',
											group : 'Options',
											editor : elem.editor
										};
										rows.push(row);
									});

									node.options = rows;
									node.advanced = advanced;
									node.uid = globals.identifier + globals.id

									if (!node.data || node.itemType == 'host') {
										$.messager.alert('Alert', 'cannot add <b>' + node.text + '</b> to the workflow');
										return;
									}

									saveNode(globals.id, globals.identifier + globals.id, node);
									addConnection(relX, relY, node, globals.id);
									globals.id++;
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
			});

			function myOnRightClick(event, treeId, treeNode) {
				alert(treeNode ? treeNode.tId + ", " + treeNode.name : "isRoot");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Status: " + textStatus);
			console.log("Error: " + errorThrown);
		}
	});
}
