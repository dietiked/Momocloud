momocloudControllers.controller('RecipyBooksNewController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipyBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipyBooksService, UrlService, AuthService) {
	console.log('RecipyBooksNewController');	
		
	$scope.book = {};
	$scope.success = false;
	
	$scope.save = function() {
		RecipyBooksService.insert($scope.book);
	}
	

	// Notification functions
	var insertSuccess = function() {
		UrlService.redirectToRecipyBooksList();		
	}
			

	// Notification handlers
	var insertBookSuccess = NotificationCenter.subscribe(RecipyBooksService.notifications.RECIPY_BOOKS_INSERT_SUCCESS, insertSuccess);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(insertBookSuccess);
	});

	AuthService.increaseExpiration();

}]);