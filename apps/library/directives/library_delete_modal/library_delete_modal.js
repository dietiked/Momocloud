function libraryDeleteModal (LibraryBooksService) {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			id: '@modalId',
			book: '=ngModel'
		},
		templateUrl: 'apps/library/directives/library_delete_modal/library_delete_modal.html',
		link: function(scope, element, attrs) {
			scope.deleteBook = function () {
				LibraryBooksService.deleteBook(scope.book);
			}
		}
	};
	
}