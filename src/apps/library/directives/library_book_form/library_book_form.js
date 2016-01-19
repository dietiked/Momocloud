function libraryBookForm (LibraryBooksService) {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			id: '@modalId',
			mode: '@mode',
			book: '=ngModel'
		},
		templateUrl: 'apps/library/directives/library_book_form/library_book_form.html',
		link: function(scope, element, attrs) {
			scope.addBookToLibrary = function () {
				LibraryBooksService.addBookToLibrary(scope.book);
			}
			scope.updateBook = function() {
				LibraryBooksService.updateBook(scope.book);
			}
		}
	};
	
}