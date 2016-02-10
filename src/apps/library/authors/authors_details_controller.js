momocloudLibrary.controller('LibraryAuthorsDetailsController',
['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'LibraryAuthorsService', 'LibraryBooksService', 'UrlService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, LibraryAuthorsService, LibraryBooksService, UrlService) {

	console.log('LibraryAuthorsDetailsController');
	NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
		title: $routeParams.authorDescr,
		application: 'Libreria'
	}]);

	$scope.loading = true;
	$scope.books = [];
	$scope.author = $routeParams.authorDescr;

	// Notification functions
	var getBooks = function() {
		$scope.books = LibraryBooksService.books;
		$scope.loading = false;
	};
	$scope.go = function(url) {
		UrlService.go(url);
	};
	$scope.showDetailsForAuthor = function(author) {
		var authorDescr = author;
		UrlService.go('library/authors/' + authorDescr);
	}

	// Notification handlers
	var getBooksSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.GET_FORAUTHOR_SUCCESS, getBooks);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBooksSuccess);
	});

	LibraryBooksService.getBooksForAuthor($routeParams.authorDescr);

}]);
