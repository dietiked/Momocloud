momocloudControllers.controller('RecipyDashboardController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'AuthService', 'RecipiesService',
function($scope, NotificationCenter, DependenciesChecker, UrlService, AuthService, RecipiesService) {
	console.log('RecipyDashboardController');	
	
	$scope.randomRecipy;
	$scope.searchRecipies;
	$scope.searchString = "";
	
	$scope.getRandomRecipy = function() {
		RecipiesService.getRandomRecipy();
	}
	
	$scope.search = function() {
		RecipiesService.search($scope.searchString);
	}
	
	var getRandomRecipyHandler = function() {
		$scope.randomRecipy = RecipiesService.randomRecipy;
	}

	var getSearchRecipyHandler = function() {
		$scope.searchRecipies = RecipiesService.searchRecipies;
	}
		
	var getRandomRecipySuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_GET_RANDOM_SUCCESS, getRandomRecipyHandler);
	var getSearchRecipySuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_SEARCH_SUCCESS, getSearchRecipyHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getRandomRecipySuccess);
		NotificationCenter.unsubscribe(getSearchRecipyHandler);
	});

	AuthService.increaseExpiration();

}]);