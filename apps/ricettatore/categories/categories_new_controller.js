momocloudControllers.controller('RecipeCategoriesNewController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeCategoriesService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipeCategoriesService, UrlService, AuthService) {
	console.log('RecipeCategoriesNewController');	
		
	$scope.category = {};
	$scope.success = false;
	
	$scope.save = function() {
		RecipeCategoriesService.insert($scope.category);
	}
	$scope.go = function(url) {
		UrlService.go(url);
	}
	

	// Notification functions
	var insertSuccess = function() {
		UrlService.redirectToRecipeCategoriesList();		
	}
			

	// Notification handlers
	var insertCategorySuccess = NotificationCenter.subscribe(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_INSERT_SUCCESS, insertSuccess);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(insertCategorySuccess);
	});

	AuthService.increaseExpiration();

}]);