momocloudWineDb.controller('ProducersNewController', ['$scope', '$routeParams', 'ProducersService', 'AuthService', 'UrlService', 'GeneralDataService',
function($scope, $routeParams, ProducersService, AuthService, UrlService, GeneralDataService) {
	//console.log('ProducersNewController');
	
	var redirectToNewWineForm = false;
	
	$scope.producer = {};
	$scope.success = false;
	$scope.countries = [];
	
	$scope.save = function() {
		//console.log('Save', $scope.producer);
		ProducersService.insert($scope.producer);
	}
	
	$scope.saveAndAddWine = function() {	
		redirectToNewWineForm = true;
		$scope.save();		
	};
			
	$scope.go = function(url) {
		UrlService.go(url);
	}

	// Notification functions
	var insertSuccess = function() {
		// Visualize message with ng-show
		if (redirectToNewWineForm) {
			UrlService.redirectToNewWine();					
		} else {
			UrlService.redirectToProducerList();		
		}
	}
	var getCountries = function() {
		$scope.countries = GeneralDataService.countries;
	}

	// Notification handlers
	var getProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_INSERT_SUCCESS, insertSuccess);
	var getCountriesSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.COUNTRIES_GET_ALL_SUCCESS, getCountries);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducerSuccess);
		NotificationCenter.unsubscribe(getCountriesSuccess);
	});

	AuthService.increaseExpiration();
	GeneralDataService.getCountries();
			
}]);