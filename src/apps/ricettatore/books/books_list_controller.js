momocloudRicettatore.controller('RecipeBooksListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipeBooksService, UrlService, AuthService) {
	
	console.log('RecipeBooksListController');
	$scope.loading = true;

	// Notification functions
	var getBooks = function() {
		$scope.books = RecipeBooksService.books;
		$scope.loading = false;
	}
	$scope.go = function(url) {
		UrlService.go(url);
	}

	// Notification handlers
	var getBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBooksSuccess);
	});

	RecipeBooksService.getAll();
	AuthService.increaseExpiration();

}]);