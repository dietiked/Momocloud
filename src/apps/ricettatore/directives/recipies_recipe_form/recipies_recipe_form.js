function recipiesRecipeForm (RecipiesService, RecipeBooksService) {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			id: '@modalId',
			mode: '@mode',
			recipe: '=ngModel'
		},
		templateUrl: 'apps/ricettatore/directives/recipies_recipe_form/recipies_recipe_form.html',
		link: function(scope, element, attrs) {
									
			scope.addRecipe = function () {
				console.log(scope.recipe);
				RecipiesService.insert(scope.recipe);
			}
			scope.updateRecipe = function() {
				RecipiesService.update(scope.recipe);
			}

			scope.books =[];
			
			var getBooks = function() {
				scope.books = RecipeBooksService.books;
			}
		
			// Notification handlers
			var getBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
			scope.$on('$destroy', function(){
				NotificationCenter.unsubscribe(getBooksSuccess);
			});
			
			RecipeBooksService.getAll();

		}
	};
	
}