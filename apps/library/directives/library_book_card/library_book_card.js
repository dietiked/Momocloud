function libraryBookCard (LibraryBooksService) {
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			advanced: '@advanced', // default = false
			book: '=ngModel'
		},
		templateUrl: 'apps/library/directives/library_book_card/library_book_card.html',
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
	
}