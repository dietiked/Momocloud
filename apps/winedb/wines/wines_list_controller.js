momocloudControllers.controller('WinesListController', ['$scope', 'WinesService', 'AuthService', function($scope, WinesService, AuthService) {
	//console.log('WinesListController');	
	
	$scope.loaded = false;
	
	// Notification functions
	var getWines = function() {
		$scope.wines = WinesService.wines;
		$scope.loaded = true;
	}

	// Notification handlers
	var getWinesSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_GET_ALL_SUCCESS, getWines);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getWinesSuccess);
	});

	WinesService.getAll();
	AuthService.increaseExpiration();

}]);