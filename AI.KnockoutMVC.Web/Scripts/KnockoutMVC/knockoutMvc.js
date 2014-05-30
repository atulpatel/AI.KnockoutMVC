knockoutMvc = function () {
    var that = {};

    that.models = {};
    self.counter = 1000;
    self.getData = function(url, callback) {
        $.getJSON(url, function(data) {
            return callback(data);
        });
    };

    self.convertToObservable = function (source, destination) {
        for (var prop in source) {
            if ($.isArray(source[prop])) {
                $(source[prop]).each(function(index, data) {
                    destination[prop] = ko.observableArray([]);
                    var result = {};
                    destination[prop].push(self.convertToObservable(data, result));
                });
            } else if ($.isPlainObject(source[prop])) {
                destination[prop] = {};
                destination[prop] = ko.observable(self.convertToObservable(source[prop], destination[prop]));
            }
            else {
                destination[prop] = ko.observable(source[prop]);
            }
        }
        
        return destination;
    };

    self.extend = function (viewModelName, viewModel) {
        var extendedViewModel = viewModels[viewModelName]();
        for (var prop in viewModel) {
            extendedViewModel[prop] = viewModel[prop];
        }
        extendedViewModel.init();
        return extendedViewModel;
    };

    that.bind = function (container) {
        
        $(container).find('.bindable').each(function (index, data) {
            var url = "";
            var domElement = $(data);
            if (utilities.data.hasDataAttribute(domElement, 'url')) {
                url += utilities.data.getDataAttribute(domElement, 'url');
            }

            if (url === "") {
                return;
            }

            self.getData(url, function (viewModel) {
                if ($(domElement).hasClass('observable')) {
                    var observableViewModel = {};
                    self.convertToObservable(viewModel, observableViewModel);
                    viewModel = observableViewModel;
                }

                if ($(domElement).hasClass('extend')) {
                    var viewModelName = utilities.data.getDataAttribute(domElement, 'model');
                    var extendedViewModel = self.extend(viewModelName, viewModel);
                    viewModel = extendedViewModel;
                }

                var id = self.getContainerId(domElement);
                if (self.doesModelExist(id)) {
                    self.isExistingModel(id, viewModel);
                } else {
                    self.isNewModel(domElement, id, viewModel);
                }
            });
        });
    };

    self.getContainerId = function(container) {
        var id = $(container).attr('id');
        if (id == null) {
            id = "knockoutmvc" + self.getNextId();
            $(container).attr('id',  id);
        }
        return id;
    }

    self.getNextId = function() {
        self.counter++;
        return self.counter;
    };

    self.doesModelExist = function (id) {
        return that.models[id] != null;
    };

    self.isNewModel = function (container, id, model) {
        var containerModel = ko.observable(model);
        that.models[id] = id;
        ko.applyBindings(containerModel, $(container)[0]);
    };

    self.isExistingModel = function (id, model) {
        var existingModel = self.getModel(id);
        existingModel(model);
    };
    
    self.getModel = function(id) {
        var model = ko.dataFor($("#" + id)[0]);
        return model;
    }
    $(function () {
        that.bind($('body'));
    });

    return that;
}();