momocloudControllers.controller('WinesEditController', ['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'WinesService', 'ProducersService', 'GeneralDataService', 'UrlService', 'AuthService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, WinesService, ProducersService, GeneralDataService, UrlService, AuthService) {
	//console.log('WinesEditController', $routeParams.wineId);	
		
	$scope.wine = {};
	$scope.producers = [];
	$scope.winetypes = [];
	$scope.showError = false;
	$scope.loaded = false;
	DependenciesChecker.setDependencies(2);
	$scope.dependenciesLoaded = DependenciesChecker.serviceReady;

	$scope.save = function() {
		WinesService.update($scope.wine);
	}
	
	var loadProgress = function() {
		DependenciesChecker.loaded();
		if (DependenciesChecker.serviceReady) {
			$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
			WinesService.getWine($routeParams.wineId);
		}		
	}
			
	// Notification functions
	var getWine = function() {
		$scope.wine = WinesService.wine;		
		$scope.loaded = true;
	}

	var wineUpdated = function() {
		UrlService.redirectToWine($routeParams.wineId);
	}

	var wineNotUpdated = function() {
		$scope.showError = true;
	}

	var getProducers = function() {
		$scope.producers = ProducersService.producers;
		loadProgress();
	}

	var getTypes = function() {
		$scope.winetypes = GeneralDataService.winetypes;
		loadProgress();
	}

	// Notification handlers
	var getWineSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_GET_SUCCESS, getWine);
	var updateWineSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_UPDATE_SUCCESS, wineUpdated);
	var updateWineError = NotificationCenter.subscribe(WinesService.notifications.WINES_UPDATE_ERROR, wineNotUpdated);
	var getProducersSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_ALL_SUCCESS, getProducers);
	var getTypesSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.TYPES_GET_ALL_SUCCESS, getTypes);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getWineSuccess);
		NotificationCenter.unsubscribe(getProducersSuccess);
		NotificationCenter.unsubscribe(getTypesSuccess);
	});
		
	ProducersService.getAll();
	GeneralDataService.getWinetypes();
	AuthService.increaseExpiration();

}]);