momocloudWineDb.controller('ProducersListController',
['$scope', 'ProducersService', 'UrlService', 'NotificationCenter',
function($scope, ProducersService, UrlService, NotificationCenter) {
	//console.log('ProducersController');

	$scope.go = function(url) {
		UrlService.go(url);
	}

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

}]);
