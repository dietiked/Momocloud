angular.module('mc.library', [])

.directive('libraryBookCard', ['LibraryBooksService', function(LibraryBooksService) {
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			advanced: '@advanced', // default = false
			book: '=ngModel'
		},
		templateUrl: 'apps/library/directives/mc.library.bookcard.html',
		link: function(scope, element, attrs) {
			if (scope.advanced == undefined) {
				scope.isAdvanced = false;
			} else if (scope.advanced == 'false') {
				scope.isAdvanced = false;				
			} else if (scope.advanced == 'true') {
				scope.isAdvanced = true;
			}
		}
	};
	
}])

.directive('libraryBookForm', ['LibraryBooksService', function(LibraryBooksService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			id: '@modalId',
			mode: '@mode',
			book: '=ngModel'
		},
		templateUrl: 'apps/library/directives/mc.library.bookform.html',
		link: function(scope, element, attrs) {
			scope.addBookToLibrary = function () {
				LibraryBooksService.addBookToLibrary(scope.book);
			}
			scope.updateBook = function() {
				LibraryBooksService.updateBook(scope.book);
			}
		}
	};
}])

.directive('libraryDeleteModal', ['LibraryBooksService', function(LibraryBooksService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			id: '@modalId',
			book: '=ngModel'
		},
		templateUrl: 'apps/library/directives/mc.library.deletemodal.html',
		link: function(scope, element, attrs) {
			scope.deleteBook = function () {
				LibraryBooksService.deleteBook(scope.book);
			}
		}
	};
}]);