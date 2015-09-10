wineDBControllers.controller('VintagesEditController', ['$scope', '$routeParams', '$location', 'NotificationCenter', 'DependenciesChecker', 'WinesService', 'VintagesService', 'GeneralDataService', 'UrlService', 'AuthService',
function($scope, $routeParams, $location, NotificationCenter, DependenciesChecker, WinesService, VintagesService, GeneralDataService, UrlService, AuthService) {
	console.log('VintagesEditController', $routeParams.wineId, $routeParams.vintageId);	
		
	$scope.vintage = {};
	$scope.ratings = [];
	$scope.years = [];
	DependenciesChecker.setDependencies(2);
	$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	$scope.showError = false;
			
	$scope.save = function() {
		console.log('Save vintage', $scope.vintage);
		VintagesService.update($scope.vintage);
	}

	var loadProgress = function() {
		DependenciesChecker.loaded();
		if (DependenciesChecker.serviceReady) {
			$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
			VintagesService.get($routeParams.vintageId)
		}		
	}
			
	// Notification functions
	var getVintage = function() {
		$scope.vintage = VintagesService.vintage;
		console.log('Check', $scope.vintage);	
	}
	var vintageUpdated = function() {
		UrlService.redirectToWine($routeParams.wineId);
	}
	var vintageNotUpdated = function() {
		$scope.showError = true;
	}
	var getRatings = function() {
		$scope.ratings = GeneralDataService.ratings;
		loadProgress();		
	}
	var getYears = function() {
		$scope.years = GeneralDataService.years;
		loadProgress();		
	}

	// Notification handlers
	var getVintageSuccess = NotificationCenter.subscribe(VintagesService.notifications.VINTAGES_GET_SUCCESS, getVintage);
	var updateVintageSuccess = NotificationCenter.subscribe(VintagesService.notifications.VINTAGES_UPDATE_SUCCESS, vintageUpdated);
	var updateVintageError = NotificationCenter.subscribe(VintagesService.notifications.VINTAGES_UPDATE_ERROR, vintageNotUpdated);
	var getRatingsSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.RATINGS_GET_ALL_SUCCESS, getRatings);
	var getYearsSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.YEARS_GET_ALL_SUCCESS, getYears);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getVintageSuccess);
		NotificationCenter.unsubscribe(updateVintageSuccess);
		NotificationCenter.unsubscribe(updateVintageError);
		NotificationCenter.unsubscribe(getRatingsSuccess);
		NotificationCenter.unsubscribe(getYearsSuccess);
	});

	GeneralDataService.getRatings();
	GeneralDataService.getYears();
	AuthService.increaseExpiration();
		
}]);