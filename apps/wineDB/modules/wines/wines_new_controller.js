wineDBControllers.controller('WinesNewController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'WinesService', 'ProducersService', 'GeneralDataService', 'UrlService',
function($scope, NotificationCenter, DependenciesChecker, WinesService, ProducersService, GeneralDataService, UrlService) {
	console.log('WinesNewController');	
	
	$scope.wine = {};
	$scope.producers = [];
	$scope.winetypes = [];
	$scope.success = false;
	DependenciesChecker.setDependencies(2);
	$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	
	$scope.save = function() {
		console.log('Save', $scope.wine);
		WinesService.insert($scope.wine);
	}

	// Notification functions
	var insertSuccess = function() {
		// Visualize message with ng-show
		$scope.success = true;
		UrlService.redirectToWineList();
	}

	var getProducers = function() {
		$scope.producers = ProducersService.producers;
		DependenciesChecker.loaded();
		$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	}

	var getTypes = function() {
		$scope.winetypes = GeneralDataService.winetypes;
		DependenciesChecker.loaded();
		$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	}
			

	// Notification handlers
	var insertWineSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_INSERT_SUCCESS, insertSuccess);
	var getProducersSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_ALL_SUCCESS, getProducers);
	var getTypesSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.TYPES_GET_ALL_SUCCESS, getTypes);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(insertWineSuccess);
		NotificationCenter.unsubscribe(getProducersSuccess);
		NotificationCenter.unsubscribe(getTypesSuccess);
	});

	ProducersService.getAll();
	GeneralDataService.getWinetypes();

}]);