wineDBControllers.controller('ProducersDetailsController', ['$scope', '$routeParams', 'ProducersService', 'AuthService', 
function($scope, $routeParams, ProducersService, AuthService) {
	console.log('ProducersDetailsController for producer', $routeParams.producerId);

	$scope.loaded = false;

	// Notification functions
	var getProducer = function() {
		$scope.producer = ProducersService.producer;
		$scope.loaded = true;
	}

	// Notification handlers
	var getProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_SUCCESS, getProducer);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducerSuccess);
	});
		
	ProducersService.getProducer($routeParams.producerId, true);
	AuthService.increaseExpiration();
				
}]);