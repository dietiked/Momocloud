momocloudControllers.controller('RecipiesListController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipiesService', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, RecipiesService, UrlService, AuthService) {
	
	console.log('RecipiesListController');
	$scope.loaded = false;
	$scope.selectedRecipe = {};
	
	$scope.go = function(url) {
		UrlService.go(url);
	}
	
	$scope.setSelectedRecipe = function(aBook) {
		$scope.selectedRecipe = angular.copy(aBook);	
	};

	// Notification functions
	var getRecipies = function() {
		$scope.recipies = RecipiesService.recipies;
		$scope.loaded = true;
	}
	
	var dismissModal = function() {
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
	AuthService.increaseExpiration();

}]);