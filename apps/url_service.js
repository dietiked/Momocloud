function UrlService($http, $location, NotificationCenter) {
	var UrlService = {};
		
	UrlService.notifications = {
	};
	
	UrlService.redirectToNewVintage = function(wineId) {
		$location.path('/winedb/wines/' +  wineId + '/vintage/new');				
	};
	UrlService.redirectToNewWine = function() {
		$location.path('/winedb/wines/new');				
	};
	UrlService.redirectToWine = function(id) {
		$location.path('/winedb/wines/' + id);		
	};
	UrlService.redirectToWineList = function() {
		$location.path('/winedb/wines');		
	};

	UrlService.redirectToProducer = function(id) {
		$location.path('/winedb/producers/' + id);		
	};
	UrlService.redirectToProducerList = function() {
		$location.path('/winedb/producers');		
	};
	UrlService.redirectToCellar = function() {
		$location.path('/winedb/cellar');		
	};
	UrlService.redirectToAddBottles = function(storedWineId) {
		$location.path('/winedb/cellar/' + storedWineId + '/bottles/add');		
	};

	UrlService.redirectToRecipeMenuDetails = function(id) {
		$location.path('/recipies/menus/' + id);		
	};
	UrlService.redirectToRecipeCategoriesList = function() {
		$location.path('/recipies/categories/');		
	};
	UrlService.redirectToRecipeBooksList = function() {
		$location.path('/recipies/books/');		
	};
	UrlService.redirectToRecipiesList = function() {
		$location.path('/recipies/recipies/');		
	};

	return UrlService;
}

momocloudServices.factory('UrlService', UrlService);