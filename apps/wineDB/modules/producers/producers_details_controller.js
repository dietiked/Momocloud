wineDBControllers.controller('ProducersDetailsController', ['$scope', '$routeParams', 'ProducersService', function($scope, $routeParams, ProducersService) {
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
				
}]);