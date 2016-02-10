momocloudRicettatore.controller('RecipiesListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipiesService', 'UrlService',
function($scope, NotificationCenter, DependenciesChecker, RecipiesService, UrlService) {

	console.log('RecipiesListController');
	NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
		title: 'Ricette',
		application: 'Ricettatore'
	}]);
	$scope.loading = true;
	$scope.selectedRecipe = {};

	$scope.go = function(url) {
		UrlService.go(url);
	}

	$scope.setSelectedRecipe = function(aRecipe) {
		if (aRecipe == 'new') {
			$scope.selectedRecipe = {
				recipe_categories : []
			};
		} else {
			$scope.selectedRecipe = angular.copy(aRecipe);
		}
	};

	// Notification functions
	var getRecipies = function() {
		$scope.recipies = RecipiesService.recipies;
		$scope.loading = false;
	}

	var dismissModal = function() {
		$scope.recipies = RecipiesService.recipies;
		$('.modal').modal('hide');
	}

	// Notification handlers
	var getRecipiesSuccess = NotificationCenter.subscribe(RecipiesService.notifications.GET_ALL_SUCCESS, getRecipies);
	var insertRecipeSuccess = NotificationCenter.subscribe(RecipiesService.notifications.INSERT_SUCCESS, dismissModal);
	var updateRecipeSuccess = NotificationCenter.subscribe(RecipiesService.notifications.UPDATE_SUCCESS, dismissModal);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getRecipiesSuccess);
		NotificationCenter.unsubscribe(insertRecipeSuccess);
		NotificationCenter.unsubscribe(updateRecipeSuccess);
	});

	RecipiesService.getAll();

}]);
