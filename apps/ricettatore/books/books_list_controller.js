momocloudControllers.controller('RecipyBooksListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipyBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipyBooksService, UrlService, AuthService) {
	
	console.log('RecipyBooksListController');
	$scope.loaded = false;

	// Notification functions
	var getBooks = function() {
		$scope.books = RecipyBooksService.books;
		$scope.loaded = true;
	}

	// Notification handlers
	var getBooksSuccess = NotificationCenter.subscribe(RecipyBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBooksSuccess);
	});

	RecipyBooksService.getAll();
	AuthService.increaseExpiration();

}]);