momocloudRicettatore.controller('RecipeDashboardController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'RecipiesService',
function($scope, NotificationCenter, DependenciesChecker, UrlService, RecipiesService) {
	console.log('RecipeDashboardController');

	$scope.randomRecipe;
	$scope.searchRecipies;
	$scope.searchString = "";

	$scope.getRandomRecipe = function() {
		RecipiesService.getRandomRecipe();
	}

	$scope.search = function() {
		RecipiesService.search($scope.searchString);
	}

	var getRandomRecipeHandler = function() {
		$scope.randomRecipe = RecipiesService.randomRecipe;
	}

	var getSearchRecipeHandler = function() {
		$scope.searchRecipies = RecipiesService.searchRecipies;
	}

	var getRandomRecipeSuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_GET_RANDOM_SUCCESS, getRandomRecipeHandler);
	var getSearchRecipeSuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_SEARCH_SUCCESS, getSearchRecipeHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getRandomRecipeSuccess);
		NotificationCenter.unsubscribe(getSearchRecipeHandler);
	});

}]);
