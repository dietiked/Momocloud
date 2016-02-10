momocloudWineDb.controller('ProducersEditController', ['$scope', '$routeParams', 'ProducersService', 'UrlService', 'GeneralDataService', 'DependenciesChecker',
function($scope, $routeParams, ProducersService, UrlService, GeneralDataService, DependenciesChecker) {
	//console.log('ProducersEditController for producer', $routeParams.producerId);

	$scope.producer = {};
	$scope.showError = false;
	$scope.loaded = false;
	$scope.countries = [];

	$scope.save = function() {
		//console.log('Save', $scope.producer);
		ProducersService.update($scope.producer);
	}

	$scope.go = function(url) {
		UrlService.go(url);
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
	var getCountries = function() {
		$scope.countries = GeneralDataService.countries;
		ProducersService.getProducer($routeParams.producerId);
	}

	// Notification handlers
	var getProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_SUCCESS, getProducer);
	var updateProducerSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_UPDATE_SUCCESS, producerUpdated);
	var updateProducerError = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_UPDATE_ERROR, producerNotUpdated);
	var getCountriesSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.COUNTRIES_GET_ALL_SUCCESS, getCountries);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducerSuccess);
		NotificationCenter.unsubscribe(updateProducerSuccess);
		NotificationCenter.unsubscribe(updateProducerError);
		NotificationCenter.unsubscribe(getCountriesSuccess);
	});

	GeneralDataService.getCountries();
	
}]);
