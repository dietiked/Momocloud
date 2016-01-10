momocloudControllers.controller('LibraryBooksListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'LibraryBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, LibraryBooksService, UrlService, AuthService) {
	
	console.log('LibraryBooksListController');
	$scope.loaded = false;

	// Notification functions
	var getBooks = function() {
		$scope.books = LibraryBooksService.books;
		$scope.loaded = true;
	}
	$scope.go = function(url) {
		UrlService.go(url);
	}

	// Notification handlers
	var getBooksSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.GET_ALL_SUCCESS, getBooks);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBooksSuccess);
	});

	LibraryBooksService.getAll();
	AuthService.increaseExpiration();

}]);