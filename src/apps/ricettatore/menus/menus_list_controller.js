momocloudRicettatore.controller('RecipeMenusListController',
['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeMenusService', 'RecipiesService', 'UrlService', 'AuthService', 'GeneralDataService',
function($scope, NotificationCenter, DependenciesChecker, RecipeMenusService, RecipiesService, UrlService, AuthService, GeneralDataService) {
	console.log('RecipeMenusListController');

	NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
		title: 'Menu',
		application: 'Ricettatore'
	}]);

	$scope.loading = true;
	$scope.selectedMenu = null;
	$scope.recipes = [];

	$scope.newMenu = function() {
		RecipeMenusService.insert();
	};

	$scope.go = function(url) {
		UrlService.go(url);
	};

	$scope.setSelectedMenu = function(aMenu, editMode) {
		$scope.selectedMenu = angular.copy(aMenu);
		if (editMode) {
			var aRecipe, menuRecipe;
			var counter = 0;
			var endLoop = $scope.selectedMenu.recipies.length;
			for (var i=0; i<$scope.recipes.length; i++) {
				aRecipe = $scope.recipes[i];
				aRecipe.isInMenu = false;
				if (counter < endLoop) {
					for (var j=0; j<$scope.selectedMenu.recipies.length; j++) {
						menuRecipe = $scope.selectedMenu.recipies[j];
						if (aRecipe.recipe_id == menuRecipe.recipe_id) {
							aRecipe.isInMenu = true;
							counter += 1;
							break;
						}
					}
				}
			}
		}
	};

	$scope.addRecipeToMenu = function (aRecipe) {
		aRecipe.isInMenu = true; // For UI
		$scope.selectedMenu.recipies.push(aRecipe); // For data
	};

	$scope.removeRecipeFromMenu = function (aRecipe) {
		aRecipe.isInMenu = false;
	};

	$scope.saveMenu = function() {
		RecipeMenusService.save($scope.selectedMenu);
	}

	var addMenusSuccessHandler = function() {
		UrlService.redirectToRecipeMenuDetails(RecipeMenusService.lastInsertedId);
	};

	var getMenusSuccessHandler = function() {
		$scope.menus = RecipeMenusService.menus;
		$scope.loading = false;
	};

	var getRecipesSuccessHandler = function() {
		$scope.recipes = RecipiesService.recipies;
		$scope.loading = false;
	};

	var saveMenuSuccessHandler = function() {
		//$('.modal').modal('dismiss');
	}

	var getMenusSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_GET_ALL_SUCCESS, getMenusSuccessHandler);
	var addMenusSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_INSERT_SUCCESS, addMenusSuccessHandler);
	var getRecipesSuccess = NotificationCenter.subscribe(RecipiesService.notifications.GET_ALL_SUCCESS, getRecipesSuccessHandler);
	var saveMenuSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_SAVE_SUCCESS, saveMenuSuccessHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getMenusSuccess);
		NotificationCenter.unsubscribe(addMenusSuccess);
		NotificationCenter.unsubscribe(getRecipesSuccess);
		NotificationCenter.unsubscribe(saveMenuSuccess);
	});

	RecipeMenusService.getAll();
	RecipiesService.getAll();
	AuthService.increaseExpiration();
}]);
