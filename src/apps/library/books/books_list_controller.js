momocloudLibrary.controller('LibraryBooksListController',
['$scope', 'NotificationCenter', 'DependenciesChecker', 'LibraryBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, LibraryBooksService, UrlService, AuthService) {

	console.log('LibraryBooksListController');

	NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
		title: 'Libri',
		application: 'Libreria'
	}]);

	$scope.loading = true;

	// Notification functions
	var getBooks = function() {
		$scope.books = LibraryBooksService.books;
		$scope.loading = false;
	}
	$scope.go = function(url) {
		UrlService.go(url);
	}
	$scope.setSelectedBook = function(aBook) {
		// If the book --> add categories as array to avoid error
		// with directive inputTag
		if (aBook.categories === undefined) {
			aBook.categories = [];
		}
		$scope.selectedBook = angular.copy(aBook);
	};

	var dismissModal = function() {
		$scope.books = LibraryBooksService.books;
		$('.modal').modal('hide');
	};

	// Notification handlers
	var getBooksSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.GET_ALL_SUCCESS, getBooks);
	var addBookSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.INSERT_SUCCESS, dismissModal);
	var updateBookSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.UPDATE_SUCCESS, dismissModal);
	var deleteBookSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.DELETE_SUCCESS, dismissModal);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBooksSuccess);
		NotificationCenter.unsubscribe(addBookSuccess);
		NotificationCenter.unsubscribe(updateBookSuccess);
		NotificationCenter.unsubscribe(deleteBookSuccess);
	});

	LibraryBooksService.getAll();
	AuthService.increaseExpiration();

}]);
