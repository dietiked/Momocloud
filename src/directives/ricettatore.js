momocloudRicettatore
.directive('recipiesRecipeCard', ['DirectiveTemplatesFolderRicettatore', function(DirectiveTemplatesFolderRicettatore) {

	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			advanced: '@advanced', // default = false
			recipe: '=ngModel',
			footer: '@footer',
		},
		templateUrl: DirectiveTemplatesFolderRicettatore + 'recipesCard.html',
		link: function(scope, element, attrs) {
			if (scope.footer == undefined) {
				scope.isFooterVisible = true;
			} else if (scope.footer == 'false') {
				scope.isFooterVisible = false;
			} else if (scope.footer == 'true') {
				scope.isFooterVisible = true;
			}
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

.directive('recipeDeleteModal', ['DirectiveTemplatesFolderRicettatore', 'RecipeMenusService', 'RecipiesService',
function(DirectiveTemplatesFolderRicettatore, RecipeMenusService, RecipiesService) {

	return {
		restrict: 'E',
		scope: {
			id: '@modalId',
			recipe: '=',
			menu: '=',
		},
		templateUrl: DirectiveTemplatesFolderRicettatore + 'recipeDeleteModal.html',
		link: function(scope, element, attrs) {
			scope.delete = function() {
				if (scope.menu !== undefined) {
					RecipeMenusService.removeRecipeFromMenu(scope.recipe, scope.menu);
				} else if (scope.menu === undefined) {
					RecipiesService.delete(scope.recipe);
				}
			}
		}
	};

}])

.directive('recipiesRecipeForm',
['RecipiesService', 'RecipeBooksService', 'DirectiveTemplatesFolderRicettatore', 'NotificationCenter',
function(RecipiesService, RecipeBooksService, DirectiveTemplatesFolderRicettatore, NotificationCenter) {

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
	}
	}])

	.directive('recipesBookForm',
	['RecipeBooksService', 'DirectiveTemplatesFolderRicettatore', 'NotificationCenter',
	function(RecipeBooksService, DirectiveTemplatesFolderRicettatore, NotificationCenter) {

		return {
			restrict: 'E',
			scope: {
				id: '@modalId',
				book: '=ngModel',
				mode: '@'
			},
			templateUrl: DirectiveTemplatesFolderRicettatore + 'recipesBookForm.html',
			link: function(scope, element, attrs) {
				scope.save = function() {
					if (scope.mode == 'insert') {
						RecipeBooksService.insert(scope.book);
					} else if (scope.mode == 'update') {
						RecipeBooksService.update(scope.book);
					}
				}
			}
		};

}])

.directive('recipesBookCard', ['DirectiveTemplatesFolderRicettatore',
function(DirectiveTemplatesFolderRicettatore) {

	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			book: '=ngModel'
		},
		templateUrl: DirectiveTemplatesFolderRicettatore + 'recipesBookCard.html',
		link: function(scope, element, attrs) {
		}
	};

}]);
