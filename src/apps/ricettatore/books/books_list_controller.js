momocloudRicettatore.controller('RecipeBooksListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeBooksService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipeBooksService, UrlService, AuthService) {

	console.log('RecipeBooksListController');
	NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
		title: 'Libri di cucina',
		application: 'Ricettatore'
	}]);

	$scope.loading = true;

	$scope.go = function(url) {
		UrlService.go(url);
	}

	$scope.setSelectedBook = function(aBook) {
		$scope.selectedBook = angular.copy(aBook);
	}

	// Notification functions
	var getBooks = function() {
		$scope.books = RecipeBooksService.books;
		$scope.loading = false;
	}

	var dismissModal = function() {
		$('.modal').modal('hide');
	}

	// Notification handlers
	var getBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
	var updateBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.UPDATE_SUCCESS, dismissModal);
	var insertBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.INSERT_SUCCESS, dismissModal);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBooksSuccess);
		NotificationCenter.unsubscribe(updateBooksSuccess);
		NotificationCenter.unsubscribe(insertBooksSuccess);
	});

	RecipeBooksService.getAll();
	AuthService.increaseExpiration();

}]);
