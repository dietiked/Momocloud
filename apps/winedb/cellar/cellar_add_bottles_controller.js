momocloudControllers.controller('CellarAddBottlesController', ['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'CellarService', 'MovementsService', 'AuthService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, UrlService, CellarService, MovementsService, AuthService) {
	//console.log('CellarAddBottlesController', $routeParams.storedWineId);	
	
	$scope.loaded = false;
	$scope.showError = false;
	$scope.wine = {};
	$scope.aDate = new Date();
	$scope.movement = {
		'movement_date': '', //moment().format('D.M.YYYY'),
		'movement_quantity': "1"
	};
	$scope.add = function(movement, storedWineId) {
		$scope.movement.movement_date = moment($scope.aDate).format('D.M.YYYY');
		MovementsService.insert(movement, storedWineId);
	}	
	$scope.dateOptions = {};
	

	// Notification functions
	var getWine = function() {
		$scope.wine = CellarService.storedWine;
		console.log('wine', $scope.wine);
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
	AuthService.increaseExpiration();
		
}]);