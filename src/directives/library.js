momocloudLibrary
.directive('libraryBookCard', ['LibraryBooksService', 'DirectiveTemplatesFolderLibrary', function(LibraryBooksService, DirectiveTemplatesFolderLibrary) {

	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			advanced: '@advanced', // default = false
			book: '=ngModel'
		},
		templateUrl: DirectiveTemplatesFolderLibrary + 'libraryBookCard.html',
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

.directive('libraryBookForm', ['LibraryBooksService', 'DirectiveTemplatesFolderLibrary',
function(LibraryBooksService, DirectiveTemplatesFolderLibrary) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			book: '=ngModel'
		},
		templateUrl: DirectiveTemplatesFolderLibrary + 'libraryBookForm.html',
		link: function(scope, element, attrs) {
		}
	};
}])

.directive('libraryBookEditModal', ['LibraryBooksService', 'DirectiveTemplatesFolderLibrary',
function(LibraryBooksService, DirectiveTemplatesFolderLibrary) {
	return {
		restrict: 'E',
		//replace: true,
		scope: {
			id: '@modalId',
			mode: '@mode',
			book: '=ngModel'
		},
		templateUrl: DirectiveTemplatesFolderLibrary + 'libraryBookEditModal.html',
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

.directive('libraryBookSearch', ['LibraryBooksService', 'DirectiveTemplatesFolderLibrary',
function(LibraryBooksService, DirectiveTemplatesFolderLibrary) {
	return {
		//require: 'ngModel',
		restrict: 'E',
		scope: {
			id: '@modalId',
		},
		templateUrl: DirectiveTemplatesFolderLibrary + 'libraryBookSearch.html',
		link: function(scope, element, attrs) {

			scope.searchQuery = '';
			scope.searchBooks = [];
			scope.book = null;
			scope.performingSearch = false;
			scope.searchStartIndex = 0;
			scope.isEditMode = false;

			scope.search = function(query) {
				scope.performingSearch = true;
				LibraryBooksService.search(query);
			};

			scope.editBook = function(aBook) {
				scope.book = angular.copy(aBook);
				scope.isEditMode = true;
				console.log(scope.isEditMode);
			};

			scope.dismissEditBook = function () {
				scope.isEditMode = false;
			}

			scope.addBookToLibrary = function () {
				LibraryBooksService.addBookToLibrary(scope.book);
			}

			var getSearchBooks = function() {
				scope.searchBooks = LibraryBooksService.searchBooks;
				scope.searchStartIndex += 11;
				console.log(scope.searchBooks);
				scope.performingSearch = false;
			};

			var searchBookSuccess = NotificationCenter.subscribe(LibraryBooksService.notifications.SEARCH_SUCCESS, getSearchBooks);

			scope.$on('$destroy', function(){
				NotificationCenter.unsubscribe(searchBookSuccess);
			});
		}
	};
}])

.directive('libraryDeleteModal', ['LibraryBooksService', 'DirectiveTemplatesFolderLibrary',
function(LibraryBooksService, DirectiveTemplatesFolderLibrary) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			id: '@modalId',
			book: '=ngModel'
		},
		templateUrl: DirectiveTemplatesFolderLibrary + 'libraryDeleteModal.html',
		link: function(scope, element, attrs) {
			scope.deleteBook = function () {
				LibraryBooksService.deleteBook(scope.book);
			}
		}
	};
}]);
