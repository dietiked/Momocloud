momocloudControllers.controller('LibraryAuthorsDetailsController', ['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'LibraryAuthorsService', 'UrlService', 'AuthService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, LibraryAuthorsService, UrlService, AuthService) {
	
	console.log('LibraryAuthorsDetailsController');
	$scope.loading = true;
	$scope.books = [];
	$scope.author = $routeParams.authorDescr;

	// Notification functions
	var getBooks = function() {
		$scope.books = LibraryAuthorsService.books;
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
	var getBooksSuccess = NotificationCenter.subscribe(LibraryAuthorsService.notifications.GET_SUCCESS, getBooks);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBooksSuccess);
	});

	LibraryAuthorsService.getBooksForAuthor($routeParams.authorDescr);
	AuthService.increaseExpiration();

}]);