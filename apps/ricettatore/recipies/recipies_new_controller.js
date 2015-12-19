momocloudControllers.controller('RecipiesNewController', 
['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipeCategoriesService', 'RecipeBooksService', 'RecipiesService', 'UrlService', 'AuthService',
'GeneralDataService',
function($scope, NotificationCenter, DependenciesChecker, RecipeCategoriesService, RecipeBooksService, RecipiesService, UrlService, AuthService,
GeneralDataService) {
	console.log('RecipiesNewController');	
		
	$scope.recipe = {};
	$scope.recipeCategories = [];
	$scope.books =[];
	$scope.categories = [];
	$scope.ratings = [];
	$scope.success = false;
	$scope.dependenciesLoaded = DependenciesChecker.init();
	DependenciesChecker.setDependencies(3);
	
	$scope.go = function(url) {
		UrlService.go(url);
	}

	$scope.save = function() {
		RecipiesService.insert($scope.recipe, $scope.recipeCategories);
	}
	

	// Notification functions
	var insertSuccess = function() {
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
	var insertRecipeSuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_INSERT_SUCCESS, insertSuccess);
	var getBooksSuccess = NotificationCenter.subscribe(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
	var getCategoriesSuccess = NotificationCenter.subscribe(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS, getCategories);
	var getRatingsSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.RATINGS_GET_ALL_SUCCESS, getRatings);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(insertRecipeSuccess);
		NotificationCenter.unsubscribe(getBooksSuccess);
		NotificationCenter.unsubscribe(getCategoriesSuccess);
		NotificationCenter.unsubscribe(getRatingsSuccess);
	});

	RecipeBooksService.getAll();
	RecipeCategoriesService.getAll();
	GeneralDataService.getRatings();
	AuthService.increaseExpiration();

}]);