momocloudControllers.controller('RecipeBooksListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipeBooksService, UrlService, AuthService) {
	
	console.log('RecipeBooksListController');
	$scope.loaded = false;

	// Notification functions
	var getBooks = function() {
		$scope.books = RecipeBooksService.books;
		$scope.loaded = true;
	}

	// Notification handlers
	var getBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBooksSuccess);
	});

	RecipeBooksService.getAll();
	AuthService.increaseExpiration();

}]);