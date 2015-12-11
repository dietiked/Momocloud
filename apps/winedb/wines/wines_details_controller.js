momocloudControllers.controller('WinesDetailsController', ['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'WinesService', 'VintagesService', 'AuthService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, WinesService, VintagesService, AuthService) {
	//console.log('WinesDetailsController', $routeParams.wineId);	
	
	$scope.loaded = false;
	DependenciesChecker.setDependencies(2);
		
	$scope.wine = {};
	$scope.vintages = [];
			
	var loadProgress = function() {
		DependenciesChecker.loaded();
		if (DependenciesChecker.serviceReady) {
			$scope.loaded = DependenciesChecker.serviceReady;
		}		
	}

	// Notification functions
	var getWine = function() {
		$scope.wine = WinesService.wine;
		loadProgress();		
	}

	var getVintages = function() {
		$scope.vintages = VintagesService.vintages;	
		loadProgress();
	}


	// Notification handlers
	var getWineSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_GET_SUCCESS, getWine);
	var getVintagesSuccess = NotificationCenter.subscribe(VintagesService.notifications.VINTAGES_GET_ALL_SUCCESS, getVintages);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getWineSuccess);
		NotificationCenter.unsubscribe(getVintagesSuccess);
	});

	WinesService.getWine($routeParams.wineId);
	VintagesService.getAll($routeParams.wineId)
	AuthService.increaseExpiration();
		
}]);