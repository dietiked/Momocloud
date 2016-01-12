momocloudControllers.controller('LibraryBookSearchController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'LibraryBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, LibraryBooksService, UrlService, AuthService) {
	
	console.log('LibraryBooksService');

	$scope.searchStartIndex = 0;
	$scope.performingSearch = false;

	$scope.searchQuery = '';
	$scope.searchBooks = [];
	$scope.selectedBook = null;
	
	$scope.go = function(url) {
		UrlService.go(url);
	};
	$scope.search = function() {
		$scope.performingSearch = true;
		LibraryBooksService.search($scope.searchQuery);
	};
	$scope.loadMoreSearchResults = function () {
		LibraryBooksService.search($scope.searchQuery, $scope.searchStartIndex);
	};
	$scope.setSelectedBook = function (book) {
		$scope.selectedBook = angular.copy(book);
	};
	$scope.addBookToLibrary = function () {
		LibraryBooksService.addBookToLibrary($scope.selectedBook);
	}

	// Notification functions
	var getSearchBooks = function() {
		$scope.searchBooks = LibraryBooksService.searchBooks;
		$scope.searchStartIndex += 11;
		console.log($scope.searchBooks);
		$scope.performingSearch = false;
	};
	
	var dismissModal = function() {
		$('.modal').modal('hide');	
	};

	// Notification handlers
	var searchBookSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.SEARCH_SUCCESS, getSearchBooks);
	var addBookSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.INSERT_SUCCESS, dismissModal);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(searchBookSuccess);
		NotificationCenter.unsubscribe(addBookSuccess);
	});

	AuthService.increaseExpiration();

}]);