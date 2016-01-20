momocloudRicettatore
.directive('recipiesRecipeCard', ['DirectiveTemplatesFolderRicettatore', function(DirectiveTemplatesFolderRicettatore) {
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			advanced: '@advanced', // default = false
			recipe: '=ngModel'
		},
		templateUrl: DirectiveTemplatesFolderRicettatore + 'recipesCard.html',
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

.directive('recipiesRecipeForm', ['RecipiesService', 'RecipeBooksService', 'DirectiveTemplatesFolderRicettatore', function(RecipiesService, RecipeBooksService, DirectiveTemplatesFolderRicettatore) {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			id: '@modalId',
			mode: '@mode',
			recipe: '=ngModel'
		},
		templateUrl: DirectiveTemplatesFolderRicettatore + 'recipesForm.html',
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
	
}]);