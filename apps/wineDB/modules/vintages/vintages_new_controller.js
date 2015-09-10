wineDBControllers.controller('VintagesNewController', ['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'WinesService', 'VintagesService', 'GeneralDataService', 'UrlService', 'AuthService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, WinesService, VintagesService, GeneralDataService, UrlService, AuthService) {
	console.log('WinesDetailsController', $routeParams.wineId);	
		
	$scope.vintage = {};
	$scope.ratings = [];
	$scope.years = [];
	$scope.showError = false;
			
	$scope.save = function() {
		console.log('Save vintage', $scope.vintage);
		VintagesService.insert($scope.vintage, $scope.wine.wine_id);
	}
			
	// Notification functions
	var getWine = function() {
		$scope.wine = WinesService.wine;		
	}
	var getRatings = function() {
		$scope.ratings = GeneralDataService.ratings;		
	}
	var getYears = function() {
		$scope.years = GeneralDataService.years;
	}
	var vintageInserted = function() {
		UrlService.redirectToWine($routeParams.wineId);
	}
	var vintageNotInserted = function() {
		$scope.showError = true;
	}

	// Notification handlers
	var getWineSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_GET_SUCCESS, getWine);
	var getRatingsSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.RATINGS_GET_ALL_SUCCESS, getRatings);
	var getYearsSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.YEARS_GET_ALL_SUCCESS, getYears);
	var insertVintageSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_INSERT_SUCCESS, vintageInserted);
	var insertVintageError = NotificationCenter.subscribe(WinesService.notifications.WINES_ERROR_SUCCESS, vintageNotInserted);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getWineSuccess);
		NotificationCenter.unsubscribe(getRatingsSuccess);
		NotificationCenter.unsubscribe(getYearsSuccess);
		NotificationCenter.unsubscribe(insertVintageSuccess);
		NotificationCenter.unsubscribe(insertVintageError);
	});

	WinesService.getWine($routeParams.wineId);
	GeneralDataService.getRatings();
	GeneralDataService.getYears();
	AuthService.increaseExpiration();
		
}]);