momocloudControllers.controller('RecipiesEditController', 
['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'RecipeCategoriesService', 'RecipeBooksService', 'RecipiesService', 'UrlService', 'AuthService', 'GeneralDataService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, RecipeCategoriesService, RecipeBooksService, RecipiesService, UrlService, AuthService, GeneralDataService) {
	console.log('RecipiesEditController');	
	
	var recipeId = $routeParams.recipeId;
		
	$scope.recipe = {};
	$scope.recipeCategories = [];
	$scope.books =[];
	$scope.categories = [];
	$scope.ratings = [];
	$scope.success = false;
	$scope.dependenciesLoaded = DependenciesChecker.init();
	DependenciesChecker.setDependencies(3);
	
	$scope.save = function() {
		RecipiesService.update($scope.recipe, $scope.recipeCategories);
	}
	

	// Notification functions
	var getRecipe = function() {
		$scope.recipe = RecipiesService.recipe;
		$scope.recipeCategories = RecipiesService.recipe.recipe_categories;
		DependenciesChecker.loaded();
		$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
		RecipeBooksService.getAll();
		RecipeCategoriesService.getAll();
		GeneralDataService.getRatings();
	}
	var updateSuccess = function() {
		UrlService.redirectToRecipiesList();		
	}
	var getBooks = function() {
		$scope.books = RecipeBooksService.books;
		DependenciesChecker.loaded();
		$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	}
	var getCategories = function() {
		angular.forEach(RecipeCategoriesService.categories, function(category, key) {
			$scope.categories.push(category.recipe_category_name);
		});		
		DependenciesChecker.loaded();
		$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	}
	var getRatings = function() {
		$scope.ratings = GeneralDataService.ratings;		
		DependenciesChecker.loaded();
		$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	}
			

	// Notification handlers
	var getRecipeSuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_GET_SUCCESS, getRecipe);
	var updateRecipeSuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_UPDATE_SUCCESS, updateSuccess);
	var getBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
	var getCategoriesSuccess = NotificationCenter.subscribe(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS, getCategories);
	var getRatingsSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.RATINGS_GET_ALL_SUCCESS, getRatings);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getRecipeSuccess);
		NotificationCenter.unsubscribe(updateRecipeSuccess);
		NotificationCenter.unsubscribe(getBooksSuccess);
		NotificationCenter.unsubscribe(getCategoriesSuccess);
		NotificationCenter.unsubscribe(getRatingsSuccess);
	});

	RecipiesService.get(recipeId);
	AuthService.increaseExpiration();

}]);