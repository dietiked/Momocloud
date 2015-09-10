wineDBControllers.controller('ProducersNewController', ['$scope', '$routeParams', 'ProducersService', 'AuthService',
function($scope, $routeParams, ProducersService, AuthService) {
	console.log('ProducersNewController');
	
	$scope.producer = {};
	$scope.success = false;
	
	$scope.save = function() {
		console.log('Save', $scope.producer);
		ProducersService.insert($scope.producer);
	}
			
	// Notification functions
	var insertSuccess = function() {
		// Visualize message with ng-show
		$scope.success = true;
	}

	// Notification handlers
	var getProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_INSERT_SUCCESS, insertSuccess);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducerSuccess);
	});

	AuthService.increaseExpiration();
			
}]);