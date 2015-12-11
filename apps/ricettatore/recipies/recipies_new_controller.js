momocloudControllers.controller('RecipiesNewController', 
['$scope', 'NotificationCenter', 'DependenciesChecker', 'RecipyCategoriesService', 'RecipyBooksService', 'RecipiesService', 'UrlService', 'AuthService',
'GeneralDataService',
function($scope, NotificationCenter, DependenciesChecker, RecipyCategoriesService, RecipyBooksService, RecipiesService, UrlService, AuthService,
GeneralDataService) {
	console.log('RecipiesNewController');	
		
	$scope.recipy = {};
	$scope.recipyCategories = [];
	$scope.books =[];
	$scope.categories = [];
	$scope.ratings = [];
	$scope.success = false;
	$scope.dependenciesLoaded = DependenciesChecker.init();
	DependenciesChecker.setDependencies(3);
	
	$scope.save = function() {
		RecipiesService.insert($scope.recipy, $scope.recipyCategories);
	}
	

	// Notification functions
	var insertSuccess = function() {
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
	var insertRecipySuccess = NotificationCenter.subscribe(RecipiesService.notifications.RECIPIES_INSERT_SUCCESS, insertSuccess);
	var getBooksSuccess = NotificationCenter.subscribe(RecipyBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS, getBooks);
	var getCategoriesSuccess = NotificationCenter.subscribe(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS, getCategories);
	var getRatingsSuccess = NotificationCenter.subscribe(GeneralDataService.notifications.RATINGS_GET_ALL_SUCCESS, getRatings);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(insertRecipySuccess);
		NotificationCenter.unsubscribe(getBooksSuccess);
		NotificationCenter.unsubscribe(getCategoriesSuccess);
		NotificationCenter.unsubscribe(getRatingsSuccess);
	});

	RecipyBooksService.getAll();
	RecipyCategoriesService.getAll();
	GeneralDataService.getRatings();
	AuthService.increaseExpiration();

}]);