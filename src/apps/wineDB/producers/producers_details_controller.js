momocloudWineDb.controller('ProducersDetailsController',
['$scope', '$routeParams', 'ProducersService', 'AuthService', 'UrlService', 'NotificationCenter',
function($scope, $routeParams, ProducersService, AuthService, UrlService, NotificationCenter) {
	//console.log('ProducersDetailsController for producer', $routeParams.producerId);

	$scope.loaded = false;

	// Notification functions
	var getProducer = function() {
		$scope.producer = ProducersService.producer;
		$scope.loaded = true;
	}

	$scope.go = function(url) {
		UrlService.go(url);
	}

	// Notification handlers
	var getProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_SUCCESS, getProducer);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducerSuccess);
	});

	ProducersService.getProducer($routeParams.producerId, true);
	AuthService.increaseExpiration();

}]);
