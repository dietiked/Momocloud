wineDBControllers.controller('CellarListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'VintagesService', 'CellarService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, VintagesService, CellarService, AuthService) {
	console.log('WinesDetailsController');	
	
	$scope.loaded = false;
	DependenciesChecker.setDependencies(2);
		
	$scope.storedWines = [];
		
	$scope.recalculateQuantity = function(storedWineId) {
		CellarService.recalculateQuantity(storedWineId);
	}

	// Notification functions
	var getStoredWines = function() {
		$scope.storedWines = CellarService.storedWines;
		$scope.loaded = true;	
	}

	var recalculateQuantitySuccessHandler = function() {
		CellarService.getAll();
	}


	// Notification handlers
	var getStoredWinesSuccess = NotificationCenter.subscribe(CellarService.notifications.CELLAR_GET_ALL_SUCCESS, getStoredWines);
	var recalculateQuantitySuccess = NotificationCenter.subscribe(CellarService.notifications.CELLAR_RECALCULATE_SUCCESS, recalculateQuantitySuccessHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getStoredWinesSuccess);
		NotificationCenter.unsubscribe(recalculateQuantitySuccess);
	});

	CellarService.getAll()
	AuthService.increaseExpiration();
		
}]);