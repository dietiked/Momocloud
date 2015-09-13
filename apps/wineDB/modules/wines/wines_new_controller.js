wineDBControllers.controller('WinesNewController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'WinesService', 'ProducersService', 'GeneralDataService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, WinesService, ProducersService, GeneralDataService, UrlService, AuthService) {
	//console.log('WinesNewController');	
	
	var redirectToNewVintageForm = false;
	
	$scope.wine = {};
	$scope.producers = [];
	$scope.winetypes = [];
	$scope.success = false;
	DependenciesChecker.setDependencies(2);
	$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	
	$scope.save = function() {
		WinesService.insert($scope.wine);
	}
	
	$scope.saveAndAddVintage = function() {
		redirectToNewVintageForm = true;
		$scope.save();
	};

	// Notification functions
	var insertSuccess = function() {
		if (redirectToNewVintageForm) {
			var wineId = WinesService.lastWineId;
			if (wineId > 0) {
				UrlService.redirectToNewVintage(wineId);								
			} else {
				UrlService.redirectToWineList();		
			}
		} else {
			UrlService.redirectToWineList();		
		}			
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
	AuthService.increaseExpiration();

}]);