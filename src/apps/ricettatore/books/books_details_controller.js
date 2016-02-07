momocloudRicettatore.controller('RecipeBooksDetailsController',
['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'RecipeBooksService', 'RecipiesService', 'UrlService', 'AuthService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, RecipeBooksService, RecipiesService, UrlService, AuthService) {

	console.log('RecipeBooksListController');

	$scope.loading = true;
  $scope.books = {};
  $scope.recipes = [];

  $scope.setSelectedRecipe = function(aRecipe) {
    $scope.loading = true;
		$scope.selectedRecipe = angular.copy(aRecipe);
	};

  // Notification functions
	var getBook = function() {
		$scope.book = RecipeBooksService.book;
		NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
			title: $scope.book.recipe_book_title,
			application: 'Ricettatore'
		}]);
	}

  var getRecipes = function() {
    $scope.recipes = RecipiesService.recipesForBook;
    $scope.loading = false;
  }

	var updateRecipeSuccessHandler = function() {
    RecipiesService.getRecipesForBook($routeParams.id);
		$('.modal').modal('hide');
	}

	// Notification handlers
	var getBookSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.GET_SUCCESS, getBook);
  var getRecipesSuccess = NotificationCenter.subscribe(RecipiesService.notifications.GET_FOR_BOOK_SUCCESS, getRecipes);
	var updateRecipeSuccess = NotificationCenter.subscribe(RecipiesService.notifications.UPDATE_SUCCESS, updateRecipeSuccessHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getBookSuccess);
    NotificationCenter.unsubscribe(getRecipesSuccess);
		NotificationCenter.unsubscribe(updateRecipeSuccess);
	});

	RecipeBooksService.get($routeParams.id);
  RecipiesService.getRecipesForBook($routeParams.id);
	AuthService.increaseExpiration();

}]);
