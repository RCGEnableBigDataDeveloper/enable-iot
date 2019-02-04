(function() {

	var _workflowModel = {};
	var nodes = {};
	var selecteditems = {};
	var currentNode;
	var _messages = [];

	prepareModel = function(id) {

		var _model = getModel(id);

		$.each(_model, function(idx, elem) {

			if (!elem || !getNode(elem.source.id)) {
				return false;
			}

			var _sourceNode = getNode(elem.source.id)[0];

			elem.source.filter = _sourceNode.filter;
			elem.source.schema = _sourceNode.schema
			var children = [];
			if (_sourceNode.children) {
				$.each(_sourceNode.children, function(index, child) {
					if (child.checked) {
						children.push({
							text : child.text,
							schema : child.schema
						});
					}
				});
			}

			elem.source.resources = children;
			elem.source.options = _sourceNode.options;
			if (_sourceNode.advanced) {
				var advanced = [];
				$.each(_sourceNode.advanced, function(index, elem) {
					advanced.push({
						name : elem.name,
						value : elem.value
					});
				});
				elem.source.advanced = advanced;
			}

			elem.source.config = _sourceNode.data.config;

			if (!getNode(elem.target.id)) {
				return false;
			}

			var _targetNode = getNode(elem.target.id)[0];

			elem.target.options = _targetNode.options;
			elem.target.filter = _targetNode.filter;

			if (_targetNode.advanced) {
				var advanced = [];

				$.each(_targetNode.advanced, function(index, elem) {
					advanced.push({
						name : elem.name,
						value : elem.value
					});
				});

				elem.target.advanced = advanced;
			}

			elem.target.config = _targetNode.data.config;
			elem.target.schema = _targetNode.schema
			// elem.target.children = _targetNode.children
		});

		return _model;
	};

	getCurrentNode = function() {
		return currentNode;
	};

	getMessages = function() {
		return _messages;
	};

	setMessage = function(msg) {
		_messages.push(msg);
	};

	setCurrentNode = function(node) {
		currentNode = node;
	};

	saveNode = function(tabid, id, item) {

		if (nodes.hasOwnProperty(id)) {
			nodes[id].push(item);
		} else {
			nodes[id] = [ item ];
		}
	};

	getNode = function(id) {
		return nodes[id];
	};

	getSelectedItems = function(id) {
		return selecteditems[id];
	};

	getAllSelectedItems = function() {
		return selecteditems;
	};

	setSelectedItems = function(id, items) {
		selecteditems[id] = items;
	};

	getNodes = function(id) {
		return nodes;
	};

	clearNodes = function(id) {
		nodes = {};
	};

	saveModel = function(id, item) {

		if (_workflowModel.hasOwnProperty(id)) {
			_workflowModel[id].push(item);
		} else {
			_workflowModel[id] = [ item ];
		}
	};

	getModel = function(id) {
		return _workflowModel[id];
	};

	getFullModel = function() {
		return _workflowModel;
	};

	removeModel = function(id) {
		delete _workflowModel[id];
	};

	removeNode = function(id) {
		delete nodes[id];
	};

}());