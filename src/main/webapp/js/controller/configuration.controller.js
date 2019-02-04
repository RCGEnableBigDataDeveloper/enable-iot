$(document).ready(

/** CONFIGURATION TABLES * */
function() {

	var configurationtables = [];

	var generaltable = $("#general").on('click', function(e) {
		updateConfigurationTables(e);
	});
	configurationtables.push(generaltable);

	var optionstable = $("#options").on('click', function(e) {
		updateConfigurationTables(e);
	});
	configurationtables.push(optionstable);

	var resourcestable = $("#resources").on('click', function(e) {
		updateConfigurationTables(e);
	});
	configurationtables.push(resourcestable);

	var filtertable = $("#filter").on('click', function(e) {
		updateConfigurationTables(e);
	});
	configurationtables.push(filtertable);

	var schematable = $("#schema").on('click', function(e) {
		updateConfigurationTables(e);
	});
	configurationtables.push(schematable);

	var updateConfigurationTables = function(e) {
		$.each(configurationtables, function(index, configurationtable) {
			if (e.target.id == configurationtable[0].id) {
				$('#' + configurationtable[0].id + 'table').show();
				$('#' + configurationtable[0].id + 'table_wrapper').show();
			} else {
				$('#' + configurationtable[0].id + 'table').hide();
				$('#' + configurationtable[0].id + 'table_wrapper').hide();
			}
		});
	};

	var updateDataTableSelectAllCtrl = function(table) {
		var $table = table.table().node();
		var $chkbox_all = $('tbody input[type="checkbox"]', $table);
		var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
		var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

		// If none of the checkboxes are checked
		if ($chkbox_checked.length === 0) {
			chkbox_select_all.checked = false;
			if ('indeterminate' in chkbox_select_all) {
				chkbox_select_all.indeterminate = false;
			}

			// If all of the checkboxes are checked
		} else if ($chkbox_checked.length === $chkbox_all.length) {
			chkbox_select_all.checked = true;
			if ('indeterminate' in chkbox_select_all) {
				chkbox_select_all.indeterminate = false;
			}

			// If some of the checkboxes are checked
		} else {
			chkbox_select_all.checked = true;
			if ('indeterminate' in chkbox_select_all) {
				chkbox_select_all.indeterminate = true;
			}
		}
	}

	/** CONFIGURATION DIALOG* */
	$("#dialog").dialog({
		autoOpen : false,
		dialogClass : 'ui-dialog-shadow',
		height : 'auto',
		width : 'auto',
		modal : true,
		create : function(event, ui) {
			$(".ui-widget-header").hide();
		},
		buttons : [ {
			text : "LOAD SCHEMA",
			id : 'loadschemabutton',
			click : function(e) {
				handlePrefs(e)
			},
			iconCls : 'icon-save'
		}, {
			text : "OK",
			click : function(e) {
				$('#dialog').dialog('close');
				var options = $(".optionclass");
				var updatenode = getNode(globals.currentnode[0].uid);
				$.each(options, function(idx, option) {
					updatenode[0].options[idx].value = option.value;
				});

				console.log(getNodes())
			},
			iconCls : 'icon-save'
		} ]
	});

	/** GENERAL * */
	$('#generaltable').DataTable({
		data : [],
		"paging" : false,
		"ordering" : false,
		"autoWidth" : false,
		"fixedHeader" : {
			"header" : false,
			"footer" : false
		},
		"columns" : [ {
			"width" : "250px",
			"targets" : 0
		}, {
			"width" : "250px",
			"targets" : 1
		} ]
	});

	$('#generaltable thead').css("display", "none");
	$('#generaltable thead').css("border-bottom", "0px");
	$("#generaltable_previous").hide();
	$("#generaltable_next").hide();

	/** OPTIONS * */
	var optiontable = $('#optionstable').DataTable({
		data : [],
		"paging" : false,
		"ordering" : false,
		"autoWidth" : false,
		"fixedHeader" : {
			"header" : false,
			"footer" : false
		},
		"columns" : [ {
			"width" : "250px",
			"targets" : 0
		}, {
			"width" : "250px",
			"targets" : 1
		} ]
	});

	$('#optionstable thead').css("display", "none");
	$('#optionstable thead').css("border-bottom", "0px");
	$("#optionstable_previous").hide();
	$("#optionstable_next").hide();

	$(".paginate_button").hide();
	$(".dataTables_filter").hide();
	$(".dataTables_info").hide();
	$(".dataTables_length").hide();

	/** SCHEMA * */
	var schematable = $('#schematable').DataTable({
		data : [],
		'columnDefs' : [ {
			'targets' : 0,
			'searchable' : false,
			'orderable' : false,
			'width' : '30px',
			'className' : 'dt-body-center',
			'render' : function(data, type, full, meta) {
				return '<input type="checkbox" checked="true">';
			}
		}, {
			"width" : "190px",
			"targets" : 1
		}, {
			"width" : "190px",
			"targets" : 2
		}, {
			"width" : "190px",
			"targets" : 3
		} ],
		columns : [ {
			title : "Selected"
		}, {
			title : "Name"
		}, {
			title : "UDF"
		}, {
			title : "Type"
		} ]
	});

	$('#schematable thead').on('click', 'th', function() {
		var index = schematable.column(this).index();
		if (index == 0) {
			var cells = schematable.cells().nodes();
			var checkboxes = $(cells).find(':checkbox');
			var checked = checkboxes[0].checked;
			$(cells).find(':checkbox').prop('checked', checked ? false : true);
			$.each(getNode(globals.currentnode[0].uid).schema, function(index, schemaentry) {
				schemaentry.checked = checked ? false : true;
			});
		}
	});

	$('#schematable').on('click', 'tbody td', function(e) {
		var index = schematable.column(this).index();
		var rowindex = schematable.row(this).index();
		if (index == 0) {
			var cells = schematable.cells().nodes();
			var checkboxes = $(cells).find(':checkbox');
			var checked = checkboxes[rowindex].checked;
			var updatenode = getNode(globals.currentnode[0].uid);
			updatenode[0].schema[rowindex].checked = checked;
		}
	});

	$('#schematable_length').hide();
	$('#schematable').hide();
	$('#schematable_wrapper').hide();

	/** RESOURCES * */
	var resourcestable = $('#resourcestable').DataTable({
		data : [],
		'columnDefs' : [ {
			'targets' : 0,
			'searchable' : false,
			'orderable' : false,
			'width' : '30px',
			'className' : 'dt-body-center',
			'render' : function(data, type, full, meta) {
				return '<input type="checkbox" checked="true">';
			}
		}, {
			"width" : "190px",
			"targets" : 1
		} ],
		columns : [ {
			title : "Selected"
		}, {
			title : "Name"
		} ]
	});

	$('#resourcestable thead').on('click', 'th', function() {
		var index = resourcestable.column(this).index();
		if (index == 0) {
			var cells = resourcestable.cells().nodes();
			var checkboxes = $(cells).find(':checkbox');
			var checked = checkboxes[0].checked;
			$(cells).find(':checkbox').prop('checked', checked ? false : true);
			$.each(getNode(globals.currentnode.uid)[0].children, function(index, resourceentry) {
				resourceentry.checked = checked ? false : true;
			});

			console.log(getNodes())
		}
	});

	$('#resourcestable').on('click', 'tbody td', function(e) {
		var index = resourcestable.column(this).index();
		var rowindex = resourcestable.row(this).index();
		if (index == 0) {
			var cells = resourcestable.cells().nodes();
			var checkboxes = $(cells).find(':checkbox');
			var checked = checkboxes[rowindex].checked;
			var updatenode = getNode(globals.currentnode[0].uid);
			updatenode[0].children[rowindex].checked = checked;
			console.log(getNodes())
		}
	});

	$('#resourcestable_length').hide();
	$('#resourcestable').hide();
	$('#resourcestable_wrapper').hide();

	$('#filtertable').hide();
});

function handlePrefs() {
	$.ajax({
		url : "/getSchemaReaders/" + "name",
		success : function(result) {
			readers = JSON.parse(result);
			var readeroptions = '<select id="schematype" class=small>';
			for ( var key in readers) {
				readeroptions += '<option class=small  id="' + readers[key] + '" >' + key + '</option>';
			}
			readeroptions += '</select>';

			var form = '<table border=0 cellpadding=10><tr><td class=small nowrap>Schema type:</td><td>'
					+ readeroptions + '</td></tr><tr><td height=3></td></tr><tr><td class=small >Protocol</td><td class=small >'
					+ '<select class=small  id="protocol"><option class=small  id="file://">file://</option>' + '<option  class=small  id="classpath://">classpath://</option>'
					+ '<option id="http://">http://</option>' + '<option class=small  id="https://">https://</option></select>'
					+ '</td></tr><tr><td height=3></td></tr><tr><td class=small  nowrap>Schema Path</td><td class=small >' + '<input id="schemapath" name="email" type="text" size=40>'
					+ '</td></tr></table>'

			$("#schemareadermsg").html(form);

			$("#schemareaderdialog").dialog({
				id : 'schemaDialog',
				modal : true,
				height : 250,
				width : 400,
				create : function(event, ui) {
					$(".ui-widget-header").hide();
				},
				buttons : [ {
					text : "OK",
					click : function(e) {

						var schemadata = [];
						var schematype = $("#schematype option:selected").text();
						var protocol = $("#protocol option:selected").text();
						var schemapath = $("#schemapath").val();

						schemadata.push({
							'schematype' : schematype,
							'protocol' : protocol,
							'schemapath' : schemapath
						});

						$(this).closest('.ui-dialog-content').dialog('close');

						$.ajax({
							url : "/getSchema/" + "name",
							type : "POST",
							data : JSON.stringify(schemadata),
							contentType : 'application/json',
							success : function(result) {
								var schemaresult = JSON.parse(result);
								var schemaconfigs = [];
								$.each(schemaresult, function(index, schema) {
									var schemaconfig = [];
									schemaconfig.push(schema.checked);
									schemaconfig.push(schema.name);
									schemaconfig.push(schema.udfname ? schema.udfname : 'none');
									schemaconfig.push(schema.value);
									schemaconfigs.push(schemaconfig);

								});
								$('#schematable').DataTable().clear().rows.add(schemaconfigs).draw();

								globals.currentnode[0].schema = schemaresult;
								// saveNode(globals.id, globals.identifier +
								// globals.id, globals.currentnode[0]);

							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								console.log("Status: " + textStatus);
								console.log("Error: " + errorThrown);
							}
						});
					}
				} ]
			});
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Status: " + textStatus);
			console.log("Error: " + errorThrown);
		}
	});
}