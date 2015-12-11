momocloudControllers.controller('RecipyCategoriesListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipyCategoriesService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipyCategoriesService, UrlService, AuthService) {
	
	console.log('RecipyCategoriesNewController');
	$scope.loaded = false;

	// Notification functions
	var getCategories = function() {
		$scope.categories = RecipyCategoriesService.categories;
		$scope.loaded = true;
	}

	// Notification handlers
	var getCategoriesSuccess = NotificationCenter.subscribe(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS, getCategories);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getCategoriesSuccess);
	});

	RecipyCategoriesService.getAll();
	AuthService.increaseExpiration();

}]);