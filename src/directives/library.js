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

.directive('libraryBookForm', ['LibraryBooksService', 'DirectiveTemplatesFolderLibrary', function(LibraryBooksService, DirectiveTemplatesFolderLibrary) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			id: '@modalId',
			mode: '@mode',
			book: '=ngModel'
		},
		templateUrl: DirectiveTemplatesFolderLibrary + 'libraryBookForm.html',
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

.directive('libraryDeleteModal', ['LibraryBooksService', 'DirectiveTemplatesFolderLibrary', function(LibraryBooksService, DirectiveTemplatesFolderLibrary) {
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