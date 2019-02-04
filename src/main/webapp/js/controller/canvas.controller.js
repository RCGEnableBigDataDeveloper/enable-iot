var instance, renderer;

jsPlumb.bind("jsPlumbDemoLoaded", function(instance) {

	renderer = jsPlumbToolkit.Support.ingest({
		jsPlumb : instance
	});

	instance.bind("jsPlumbDemoNodeAdded", function(el) {
		renderer.ingest(el);
	});

	instance.bind("connection", function(info) {

		var sourceNode = getNode(info.source.id);
		var targetNode = getNode(info.target.id);

		saveModel('123', {

			routeid : globals.routeid,
			userid : 'admin',
			// general : general,
			'source' : {
				id : info.source.id,
				nodeid : sourceNode[0].id,
				name : sourceNode[0].text,
				type : sourceNode[0].data.config.type,
				itemtype : sourceNode[0].itemType,
				parent : sourceNode[0].parent ? sourceNode[0].parent.replace(/\\/g, "/") : '',
				schema : sourceNode[0].schema,
				options : sourceNode[0].options,
				config : sourceNode[0].config
			},
			'target' : {
				id : info.target.id,
				nodeid : targetNode[0].id,
				name : targetNode[0].text,
				type : targetNode[0].data.config.type,
				itemtype : targetNode[0].itemType,
				parent : targetNode[0].parent ? targetNode[0].parent.replace(/\\/g, "/") : '',
				schema : targetNode[0].schema,
				options : targetNode[0].options,
				config : targetNode[0].config
			}
		});

		var connectionlabel = $(".jtk-overlay").last();

		$("#dialog-connect").dialog({
			resizable : false,
			autoOpen : false,
			height : 250,
			width : 400,
			modal : true,
			dialogClass : 'ui-dialog-shadow',
			create : function(event, ui) {
				$(".ui-widget-header").hide();
			},
			buttons : [ {
				text : "OK",
				click : function() {
					connectionlabel.html($("#connectionname").val());
					$('#dialog-connect').dialog('close');
				},
				iconCls : 'icon-save'
			} ]
		});

		$('#dialog-connect').dialog('open');
		$("#connectionid").val(connectionlabel.text());
	});

	if (parseInt(navigator.appVersion) > 3) {
		document.onmousedown = mouseDown;
		if (navigator.appName == "Netscape")
			document.captureEvents(Event.MOUSEDOWN);
	}
});

function addConnection(relX, relY, selectedNode, id) {

	if (!instance)
		initLayout(relX, relY, selectedNode, id);

	var initNode = function(el) {

		instance.draggable(el);

		instance.makeSource(el, {
			filter : ".ep",
			anchor : "Continuous",
			connectorStyle : {
				stroke : "#aaa",
				strokeWidth : 1,
				outlineStroke : "transparent",
				outlineWidth : 4
			},
			connectionType : "basic",
			extract : {
				"action" : "the-action"
			},
			maxConnections : 2,
			onMaxConnections : function(info, e) {
				alert("Maximum connections (" + info.maxConnections + ") reached");
			}
		});

		instance.makeTarget(el, {
			dropOptions : {
				hoverClass : "dragHover"
			},
			anchor : "Continuous",
			allowLoopback : true
		});

		instance.fire("jsPlumbDemoNodeAdded", el);
	};

	var newNode = function(x, y, id) {

		var d = document.createElement("div");
		var id = id; // jsPlumbUtil.uuid();
		d.className = "w";
		d.id = id;
		d.style.height = '80px';
		d.style.width = '225px';
		d.style.padding = '5px';
		d.innerHTML = "<table border=0 style='width:100%'><tr><td width=16><img class='statusbox' id='statusbox_"
				+ globals.identifier
				+ id
				+ "' src='/img/job_stop.png'></td><td>"
				+ selectedNode.data.config.type
				+ ":"
				+ ((selectedNode.parent) ? selectedNode.parent.replace(new RegExp(/\\/g), "/") : "")
				+ selectedNode.name
				+ "</td><td width=16><img id='endpointlock"
				+ id
				+ "' style='cursor:pointer' src='/img/unlock_small.png'></td></tr></table><div style='height:2px'>&nbsp;</div>"
				+ "<div style='border:1px solid #ccc; display:inline-block;height:50px;width:210px;background-color:#fff;'><div class='stats'></div><div style='padding-top:1px;color:#999'>"
				+ "&nbsp;name: "
				+ selectedNode.name
				+ "<div><div style='color:#999'>&nbsp;type: "
				+ selectedNode.data.config.type
				+ "</div><div style='color:#999'>&nbsp;status: <span id='status_"
				+ id
				+ "' class='jobstatus'>stopped<span>"
				+ "</div></div>"
				+ "<div class='ep' style='position: absolute; right: 0; bottom: 0; height:17px; width:16px; background-color: #F0F0F0; background-image:url(/img/drag.png)'></div></div>";
		d.style.left = x + "px";
		d.style.top = y + "px";
		instance.getContainer().appendChild(d);
		initNode(d);
		return d;
	};

	newNode(relX, relY, globals.identifier + id);

	var lockid = "endpointlock" + globals.identifier + id;
	$("#" + lockid).click(function() {
		var lockimg = '/img/lock_small.png';
		if ($("#" + lockid).attr('src') == lockimg) {
			$("#" + lockid).attr('src', '/img/unlock_small.png');
		} else {
			$("#" + lockid).attr('src', '/img/lock_small.png');
		}

		instance.toggleDraggable($("#" + globals.identifier + id));
	});

	$(".w").on('click', function(e) {

		var targetid = e.target.parentNode.id;

		if (targetid == '') {
			targetid = $(e.target.closest('.w'))[0].id;
		}

		$('.w').removeClass('glow');
		$('#' + targetid).addClass('glow');

		globals.currentnode = getNode(targetid)

		var result = mouseDown(e);
		result = jQuery.parseJSON(result);
		if (result.ctrlKey) {
			globals.selectednodes.push(targetid);
			$.each(globals.selectednodes, function(index, selectednode) {
				instance.addToDragSelection($('#' + selectednode));
				$('#' + selectednode).addClass('glow');
			});
		} else if (result.shiftKey) {
		} else if (result.alttKey) {
		} else {
			instance.clearDragSelection();
			globals.selectednodes.splice(0, globals.selectednodes.length);
		}

		e.preventDefault();
	});

	var menu1 = [ {
		'Configure' : {
			onclick : function(menuItem, menu) {

				var currentnode = getNode(menu.target.id)[0];
				globals.current = currentnode;
				var generalconfigs = [];
				for ( var key in currentnode.data.config) {
					var generalconfig = [];
					generalconfig.push(key);
					generalconfig.push(currentnode.data.config[key]);
					generalconfigs.push(generalconfig);
				}
				$('#generaltable').DataTable().clear().rows.add(generalconfigs).draw();

				var optionconfigs = [];
				$.each(currentnode.options, function(index, option) {
					var optionconfig = [];
					optionconfig.push(option.name);
					optionconfig.push("<input name='" + option.name + "' class='optionclass' size=50%>");
					optionconfigs.push(optionconfig);
				});
				$('#optionstable').DataTable().clear().rows.add(optionconfigs).draw();
				$('#optionstable').hide();

				var schemaconfigs = [];
				$.each(currentnode.schema, function(index, schema) {
					var schemaconfig = [];
					schemaconfig.push(schema.checked);
					schemaconfig.push(schema.name);
					schemaconfig.push(schema.udfname ? schema.udfname : 'none');
					schemaconfig.push(schema.value);
					schemaconfigs.push(schemaconfig);

				});
				$('#schematable').DataTable().clear().rows.add(schemaconfigs).draw();
				$('#schematable').hide();

				$(".context-menu").hide();
				$(".context-menu-shadow").hide();

				var resourcesconfigs = [];
				$.each(currentnode.children, function(index, resource) {
					var resourcesconfig = [];
					resourcesconfig.push(true);
					resourcesconfig.push(resource.name);
					resourcesconfigs.push(resourcesconfig);

				});
				$('#resourcestable').DataTable().clear().rows.add(resourcesconfigs).draw();
				$('#resourcestable').hide();

				$("#dialogitem").html(selectedNode.name);

				if (currentnode.schema)
					$("#loadschemabutton").hide();
				else
					$("#loadschemabutton").show();

				$("#dialog").dialog("open");

				return false;
			},
			icon : '/img/configure_icon.png'
		}
	}, $.contextMenu.separator, {
		'Delete' : {
			onclick : function(menuItem, menu) {
				$(this).remove();
				$("#" + menu.target.id).hide();
				removeNode(menu.target.id);
				globals.id--;
				$.each(instance.getConnections(), function(idx, connection) {
					if (connection.targetId == menu.target.id) {
						instance.detach(connection);
					}
				});
				$(".context-menu").hide();
				$(".context-menu-shadow").hide();

				eventFire(document.getElementById('canvas'), 'click');

				return false;
			},
			icon : '/img/delete_icon.png'
		},
	}, $.contextMenu.separator, {
		'Lock' : {
			onclick : function(menuItem, menu) {
				$("#" + menu.target.id).removeClass('jtk-draggable')
				$("#" + menu.target.id).removeClass('jtk-droppable')
				$("#" + menu.target.id).removeClass('jtk-endpoint-anchor')
				$("#" + menu.target.id).removeClass('jtk-connected')
				$("#" + menu.target.id).removeClass('jtk-node')

				eventFire(document.getElementById('endpointlock' + globals.identifier + id), 'click');

				$(".context-menu").hide();
				$(".context-menu-shadow").hide();
				return false;
			},
			icon : '/img/lock_icon.png'
		}
	}, $.contextMenu.separator, {
		'Detach' : {
			onclick : function(menuItem, menu) {
				$.each(instance.getConnections(), function(idx, connection) {
					instance.detach(connection);
				});
				$(".context-menu").hide();
				$(".context-menu-shadow").hide();
				return false;
			},
			icon : '/img/detach_icon.png'
		}
	} ];

	$(function() {
		$("#" + globals.identifier + id).contextMenu(menu1, {
			theme : 'vista',
			beforeShow : function() {
				var targetmenuid = $(this)[0].target.id;
				$(".context-menu-shadow").hide();
				$(".w").removeClass('glow');
				$("#" + targetmenuid).addClass('glow');
				globals.currentnode = getNode(targetmenuid);
			}
		});
	});

	$("#canvas").mouseover(function() {
		$(".context-menu-shadow").hide();
		$(".context-menu").hide();
	});

	instance.repaintEverything();
}

function initLayout(relX, relY, selectedNode, id) {

	var idFunction = function(n) {
		return n.id;
	};

	var typeFunction = function(n) {
		return n.type;
	};

	var toolkit = jsPlumbToolkit.newInstance({
		idFunction : idFunction,
		typeFunction : typeFunction,
	});

	instance = jsPlumb.getInstance({
		Endpoint : [ "Dot", {
			radius : 1
		} ],
		Connector : "StateMachine",
		HoverPaintStyle : {
			stroke : "#1e8151",
			strokeWidth : 2
		},
		ConnectionOverlays : [ [ "Arrow", {
			location : 1,
			id : "arrow",
			width : 12,
			length : 8,
			foldback : 0.8
		} ], [ "Label", {
			/* label : "pending", */
			id : "label",
			cssClass : "aLabel"
		} ] ],
		Container : "canvas",
		Connector : [ "Bezier" ]
	});

	instance.registerConnectionType("basic", {
		anchor : "Continuous",
		connector : "StateMachine"
	});

	window.jsp = instance;

	var canvas = document.getElementById("canvas");
	var windows = jsPlumb.getSelector(".statemachine-demo .w");

	instance.bind("click", function(c) {
		instance.detach(c);
	});

	instance.bind("connection", function(info) {
		info.connection.getOverlay("label").setLabel(info.connection.id);
	});

	jsPlumb.on(canvas, "dblclick", function(e) {
		// newNode(e.offsetX, e.offsetY);
	});

	jsPlumb.on(canvas, "click", function(e) {
		if (e.target.id == 'canvas') {
			globals.selectednodes.splice(0, globals.selectednodes.length);
			$('.w').removeClass('glow');
		}
	});

	instance.batch(function() {
		for (var i = 0; i < windows.length; i++) {
			initNode(windows[i], true);
		}
		// and finally, make a few connections
		/*
		 * instance.connect({ source : "opened", target : "phone1", type :
		 * "basic" }); instance.connect({ source : "phone1", target : "phone1",
		 * type : "basic" }); instance.connect({ source : "phone1", target :
		 * "inperson", type : "basic" });
		 * 
		 * instance.connect({ source : "phone2", target : "rejected", type :
		 * "basic" });
		 */
	});

	jsPlumb.fire("jsPlumbDemoLoaded", instance);

};