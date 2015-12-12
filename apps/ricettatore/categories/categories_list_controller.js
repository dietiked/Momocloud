momocloudControllers.controller('RecipeCategoriesListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeCategoriesService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipeCategoriesService, UrlService, AuthService) {
	
	console.log('RecipeCategoriesNewController');
	$scope.loaded = false;

	// Notification functions
	var getCategories = function() {
		$scope.categories = RecipeCategoriesService.categories;
		$scope.loaded = true;
	}

	// Notification handlers
	var getCategoriesSuccess = NotificationCenter.subscribe(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS, getCategories);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getCategoriesSuccess);
	});

	RecipeCategoriesService.getAll();
	AuthService.increaseExpiration();

}]);