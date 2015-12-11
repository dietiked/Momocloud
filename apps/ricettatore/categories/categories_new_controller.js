momocloudControllers.controller('RecipyCategoriesNewController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipyCategoriesService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipyCategoriesService, UrlService, AuthService) {
	console.log('RecipyCategoriesNewController');	
		
	$scope.category = {};
	$scope.success = false;
	
	$scope.save = function() {
		RecipyCategoriesService.insert($scope.category);
	}
	

	// Notification functions
	var insertSuccess = function() {
		UrlService.redirectToRecipyCategoriesList();		
	}
			

	// Notification handlers
	var insertCategorySuccess = NotificationCenter.subscribe(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_INSERT_SUCCESS, insertSuccess);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(insertCategorySuccess);
	});

	AuthService.increaseExpiration();

}]);