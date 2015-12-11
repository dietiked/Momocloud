momocloudControllers.controller('RecipiesListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipiesService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipiesService, UrlService, AuthService) {
	
	console.log('RecipiesListController');
	$scope.loaded = false;

	// Notification functions
	var getRecipies = function() {
		$scope.recipies = RecipiesService.recipies;
		$scope.loaded = true;
	}

	// Notification handlers
	var getRecipiesSuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_GET_ALL_SUCCESS, getRecipies);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getRecipiesSuccess);
	});

	RecipiesService.getAll();
	AuthService.increaseExpiration();

}]);