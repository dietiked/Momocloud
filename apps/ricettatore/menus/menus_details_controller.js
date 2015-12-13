momocloudControllers.controller('RecipeMenusDetailsController', 
['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'RecipeMenusService', 'RecipiesService', 'UrlService', 'AuthService', 'GeneralDataService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, RecipeMenusService, RecipiesService, UrlService, AuthService, GeneralDataService) {
	console.log('RecipeMenusDetailsController');
	
	$scope.menu = [];
	$scope.recipies = [];
	$scope.availableRecipies = [];
	
	$scope.addToMenu = function(recipe, index) {
		$scope.menu.push(recipe);
		$scope.availableRecipies.splice(index, 1);
	}
	
	$scope.removeFromMenu = function(recipe, index) {
		$scope.availableRecipies.push(recipe);
		$scope.menu.splice(index, 1);		
	}
	
	var getMenuSuccessHandler = function() {
		$scope.menu = RecipeMenusService.menu;
	};
	
	var getRecipiesSuccessHandler = function() {
		$scope.availableRecipies = RecipeMenusService.availableRecipies;
	};
	
	var getMenuSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_GET_SUCCESS, getMenuSuccessHandler);
	var getRecipiesSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_GET_AVAILABLE_SUCCESS, getRecipiesSuccessHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getMenuSuccess);
		NotificationCenter.unsubscribe(getRecipiesSuccess);
	});
	
	RecipeMenusService.get($routeParams.menuId)
	RecipeMenusService.getAvailableRecipies($routeParams.menuId);
	AuthService.increaseExpiration();
}]);
