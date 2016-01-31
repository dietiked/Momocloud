momocloudRicettatore.controller('RecipeMenusListController',
['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeMenusService', 'UrlService', 'AuthService', 'GeneralDataService',
function($scope, NotificationCenter, DependenciesChecker, RecipeMenusService, UrlService, AuthService, GeneralDataService) {
	console.log('RecipeMenusListController');

	$scope.loading = true;
	$scope.selectedMenu = null;
	
	$scope.newMenu = function() {
		RecipeMenusService.insert();
	};

	$scope.go = function(url) {
		UrlService.go(url);
	};

	$scope.setSelectedMenu = function(aMenu) {
		$scope.selectedMenu = angular.copy(aMenu);
	};

	var addMenusSuccessHandler = function() {
		UrlService.redirectToRecipeMenuDetails(RecipeMenusService.lastInsertedId);
	};

	var getMenusSuccessHandler = function() {
		$scope.menus = RecipeMenusService.menus;
		$scope.loading = false;
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
