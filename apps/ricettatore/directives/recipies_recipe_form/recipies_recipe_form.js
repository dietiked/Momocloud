function recipiesRecipeForm (RecipiesService, RecipeBooksService, RecipeCategoriesService) {
	
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
				RecipiesService.insert(scope.recipe);
			}
			scope.updateRecipe = function() {
				RecipiesService.update(scope.recipe);
			}

			scope.books =[];
			scope.categories =[];
			
			var getBooks = function() {
				scope.books = RecipeBooksService.books;
			}
			var getCategories = function() {
				angular.forEach(RecipeCategoriesService.categories, function(category, key) {
					scope.categories.push(category.recipe_category_name);
				});		
			}
		
			// Notification handlers
			var getBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
			var getCategoriesSuccess = NotificationCenter.subscribe(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS, getCategories);
			scope.$on('$destroy', function(){
				NotificationCenter.unsubscribe(getBooksSuccess);
				NotificationCenter.unsubscribe(getCategoriesSuccess);
			});
			
			RecipeBooksService.getAll();

		}
	};
	
}