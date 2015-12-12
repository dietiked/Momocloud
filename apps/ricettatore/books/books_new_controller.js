momocloudControllers.controller('RecipeBooksNewController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipeBooksService, UrlService, AuthService) {
	console.log('RecipeBooksNewController');	
		
	$scope.book = {};
	$scope.success = false;
	
	$scope.save = function() {
		RecipeBooksService.insert($scope.book);
	}
	

	// Notification functions
	var insertSuccess = function() {
		UrlService.redirectToRecipeBooksList();		
	}
			

	// Notification handlers
	var insertBookSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.RECIPY_BOOKS_INSERT_SUCCESS, insertSuccess);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(insertBookSuccess);
	});

	AuthService.increaseExpiration();

}]);