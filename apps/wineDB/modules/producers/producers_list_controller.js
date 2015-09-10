wineDBControllers.controller('ProducersListController', ['$scope', 'ProducersService', 'AuthService', function($scope, ProducersService, AuthService) {
	console.log('ProducersController');
	
	// Notification functions
	var getProducers = function() {
		$scope.producers = ProducersService.producers;
	}

	// Notification handlers
	var getProducersSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_ALL_SUCCESS, getProducers);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducersSuccess);
	});

	ProducersService.getAll();
	AuthService.increaseExpiration();
	
}]);