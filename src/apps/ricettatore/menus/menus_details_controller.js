momocloudRicettatore.controller('RecipeMenusDetailsController',
['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'RecipeMenusService', 'RecipiesService', 'UrlService', 'AuthService', 'GeneralDataService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, RecipeMenusService, RecipiesService, UrlService, AuthService, GeneralDataService) {
	console.log('RecipeMenusDetailsController');

	$scope.menu = {};
	$scope.recipies = [];
	$scope.availableRecipies = [];
	$scope.showSaveButton = false;
	$scope.loading = true;

	$scope.addToMenu = function(aRecipe, index) {
		RecipeMenusService.addRecipeToMenu(aRecipe);
	}

	$scope.removeFromMenu = function(recipe, index) {
		$scope.availableRecipies.push(recipe);
		$scope.menu.recipies.splice(index, 1);
		$scope.showSaveButton = true;
	}

	$scope.saveMenu = function() {
		RecipeMenusService.save($scope.menu);
	}

	$scope.go = function(url) {
		UrlService.go(url);
	}

	$scope.setSelectedRecipe = function(aRecipe) {
			$scope.selectedRecipe = aRecipe;
	}

	var getMenuSuccessHandler = function(aMenu) {
		$scope.menu = RecipeMenusService.menu;
		$scope.loading = false;
		NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
			title: 'Menu #' + $scope.menu.recipe_menu_id,
			application: 'Ricettatore'
		}]);
	};

	var deleteRecipeFromMenuSuccessHandler = function() {
		$('.modal').modal('hide');
	}

	var getRecipiesSuccessHandler = function() {
		$scope.availableRecipies = RecipeMenusService.availableRecipies;
	};

	var saveMenuSuccessHandler = function() {
		UrlService.redirectToRecipeMenus();
	}

	var getMenuSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_GET_SUCCESS, getMenuSuccessHandler);
	var deleteRecipeFromMenuSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.REMOVE_SUCCESS, deleteRecipeFromMenuSuccessHandler);
	var getRecipiesSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_GET_AVAILABLE_SUCCESS, getRecipiesSuccessHandler);
	var saveMenuSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_SAVE_SUCCESS, saveMenuSuccessHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getMenuSuccess);
		NotificationCenter.unsubscribe(deleteRecipeFromMenuSuccess);
		NotificationCenter.unsubscribe(getRecipiesSuccess);
		NotificationCenter.unsubscribe(saveMenuSuccess);
	});

	RecipeMenusService.get($routeParams.menuId)
	RecipeMenusService.getAvailableRecipies($routeParams.menuId);
	AuthService.increaseExpiration();
}]);
