wineDBControllers.controller('ProducersEditController', ['$scope', '$routeParams', 'ProducersService', 'UrlService',
function($scope, $routeParams, ProducersService, UrlService) {
	console.log('ProducersEditController for producer', $routeParams.producerId);
	
	$scope.producer = {};
	$scope.showError = false;
	$scope.loaded = false;
		
	$scope.save = function() {
		console.log('Save', $scope.producer);
		ProducersService.update($scope.producer);
	}
			
	// Notification functions
	var getProducer = function() {
		$scope.producer = ProducersService.producer;
		$scope.loaded = true;
	}
	var producerUpdated = function() {
		UrlService.redirectToProducer($scope.producer.producer_id);
	}
	var producerNotUpdated = function() {
		$scope.producer = ProducersService.producer;
		$scope.showError = true;
	}

	// Notification handlers
	var getProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_SUCCESS, getProducer);
	var updateProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_UPDATE_SUCCESS, producerUpdated);
	var updateProducerError = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_UPDATE_ERROR, producerNotUpdated);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducerSuccess);
		NotificationCenter.unsubscribe(updateProducerSuccess);
		NotificationCenter.unsubscribe(updateProducerError);
	});
		
	ProducersService.getProducer($routeParams.producerId);
	
}]);