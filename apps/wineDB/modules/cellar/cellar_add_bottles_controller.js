wineDBControllers.controller('CellarAddBottlesController', ['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'CellarService', 'MovementsService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, UrlService, CellarService, MovementsService) {
	console.log('CellarAddBottlesController', $routeParams.storedWineId);	
	
	$scope.loaded = false;
	$scope.showError = false;
	$scope.wine = {};
	$scope.movement = {
		'movement_date': moment().format('D.M.YYYY'),
		'movement_quantity': "1"
	};
		
	$scope.add = function(movement, storedWineId) {
		MovementsService.insert(movement, storedWineId);
	}	
	

	// Notification functions
	var getWine = function() {
		$scope.wine = CellarService.storedWine;
	}
	var movementInserted = function() {
		UrlService.redirectToCellar();
	}
	var movementNotInserted = function() {
		$scope.showError = true;
	}


	// Notification handlers
	var getStoredWine = NotificationCenter.subscribe(CellarService.notifications.CELLAR_GET_SUCCESS, getWine);
	var insertMovementSuccess = NotificationCenter.subscribe(MovementsService.notifications.MOVEMENTS_INSERT_SUCCESS, movementInserted);
	var insertMovementError = NotificationCenter.subscribe(MovementsService.notifications.MOVEMENTS_INSERT_ERROR, movementNotInserted);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getStoredWine);
		NotificationCenter.unsubscribe(insertMovementSuccess);
		NotificationCenter.unsubscribe(insertMovementError);
	});

	CellarService.get($routeParams.storedWineId);
		
}]);