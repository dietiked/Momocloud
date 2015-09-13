wineDBControllers.controller('ProducersNewController', ['$scope', '$routeParams', 'ProducersService', 'AuthService', 'UrlService',
function($scope, $routeParams, ProducersService, AuthService, UrlService) {
	//console.log('ProducersNewController');
	
	var redirectToNewWineForm = false;
	
	$scope.producer = {};
	$scope.success = false;
	
	$scope.save = function() {
		//console.log('Save', $scope.producer);
		ProducersService.insert($scope.producer);
	}
	
	$scope.saveAndAddWine = function() {	
		redirectToNewWineForm = true;
		$scope.save();		
	};
			
	// Notification functions
	var insertSuccess = function() {
		// Visualize message with ng-show
		if (redirectToNewWineForm) {
			UrlService.redirectToNewWine();					
		} else {
			UrlService.redirectToProducerList();		
		}
	}

	// Notification handlers
	var getProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_INSERT_SUCCESS, insertSuccess);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducerSuccess);
	});

	AuthService.increaseExpiration();
			
}]);