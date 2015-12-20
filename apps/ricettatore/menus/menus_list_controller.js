momocloudControllers.controller('RecipeMenusListController', 
['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeMenusService', 'UrlService', 'AuthService', 'GeneralDataService',
function($scope, NotificationCenter, DependenciesChecker, RecipeMenusService, UrlService, AuthService, GeneralDataService) {
	console.log('RecipeMenusListController');
	
	$scope.newMenu = function() {
		RecipeMenusService.insert();
	};
	
	$scope.go = function(url) {
		UrlService.go(url);
	}

	var addMenusSuccessHandler = function() {
		UrlService.redirectToRecipeMenuDetails(RecipeMenusService.lastInsertedId);
	};
	
	var getMenusSuccessHandler = function() {
		$scope.menus = RecipeMenusService.menus;
	};
	
	var getMenusSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_GET_ALL_SUCCESS, getMenusSuccessHandler);
	var addMenusSuccess = NotificationCenter.subscribe(RecipeMenusService.notifications.RECIPE_MENUS_INSERT_SUCCESS, addMenusSuccessHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getMenusSuccess);
		NotificationCenter.unsubscribe(addMenusSuccess);
	});
	
	RecipeMenusService.getAll();
	AuthService.increaseExpiration();
}]);
