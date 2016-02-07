momocloudLibrary.controller('LibraryAuthorsListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'LibraryAuthorsService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, LibraryAuthorsService, UrlService, AuthService) {

	console.log('LibraryAuthorsListController');

	NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
		title: 'Autori',
		application: 'Libreria'
	}]);

	$scope.loading = true;
	$scope.authors = [];

	// Notification functions
	var getAuthors = function() {
		$scope.authors = LibraryAuthorsService.authors;
		$scope.loading = false;
	};
	$scope.go = function(url) {
		UrlService.go(url);
	};
	$scope.showDetailsForAuthor = function(author) {
		var authorDescr = author;//.replace(' ', '+');
		UrlService.go('library/authors/' + authorDescr);
	}

	// Notification handlers
	var getAuthorsSuccess = NotificationCenter.subscribe(LibraryAuthorsService.notifications.GET_ALL_SUCCESS, getAuthors);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getAuthorsSuccess);
	});

	LibraryAuthorsService.getAll();
	AuthService.increaseExpiration();

}]);
