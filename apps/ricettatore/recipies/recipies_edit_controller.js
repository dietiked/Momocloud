momocloudControllers.controller('RecipiesEditController', 
['$scope', '$routeParams', 'NotificationCenter', 'DependenciesChecker', 'RecipyCategoriesService', 'RecipyBooksService', 'RecipiesService', 'UrlService', 'AuthService', 'GeneralDataService',
function($scope, $routeParams, NotificationCenter, DependenciesChecker, RecipyCategoriesService, RecipyBooksService, RecipiesService, UrlService, AuthService, GeneralDataService) {
	console.log('RecipiesEditController');	
	
	var recipyId = $routeParams.recipyId;
		
	$scope.recipy = {};
	$scope.recipyCategories = [];
	$scope.books =[];
	$scope.categories = [];
	$scope.ratings = [];
	$scope.success = false;
	$scope.dependenciesLoaded = DependenciesChecker.init();
	DependenciesChecker.setDependencies(3);
	
	$scope.save = function() {
		RecipiesService.update($scope.recipy, $scope.recipyCategories);
	}
	

	// Notification functions
	var getRecipy = function() {
		$scope.recipy = RecipiesService.recipy;
		$scope.recipyCategories = RecipiesService.recipy.recipy_categories;
		DependenciesChecker.loaded();
		$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
		RecipyBooksService.getAll();
		RecipyCategoriesService.getAll();
		GeneralDataService.getRatings();
	}
	var updateSuccess = function() {
		UrlService.redirectToRecipiesList();		
	}
	var getBooks = function() {
		$scope.books = RecipyBooksService.books;
		DependenciesChecker.loaded();
		$scope.dependenciesLoaded = DependenciesChecker.serviceReady;
	}
	var getCategories = function() {
		angular.forEach(RecipyCategoriesService.categories, function(category, key) {
			$scope.categories.push(category.recipy_category_name);
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
	var getRecipySuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_GET_SUCCESS, getRecipy);
	var updateRecipySuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_UPDATE_SUCCESS, updateSuccess);
	var getBooksSuccess = NotificationCenter.subscribe(RecipyBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
	var getCategoriesSuccess = NotificationCenter.subscribe(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS, getCategories);
	var getRatingsSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.RATINGS_GET_ALL_SUCCESS, getRatings);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getRecipySuccess);
		NotificationCenter.unsubscribe(updateRecipySuccess);
		NotificationCenter.unsubscribe(getBooksSuccess);
		NotificationCenter.unsubscribe(getCategoriesSuccess);
		NotificationCenter.unsubscribe(getRatingsSuccess);
	});

	RecipiesService.get(recipyId);
	AuthService.increaseExpiration();

}]);