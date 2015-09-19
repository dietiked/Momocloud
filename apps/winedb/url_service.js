function UrlService($http, $location, NotificationCenter) {
	var UrlService = {};
		
	UrlService.notifications = {
	};
	
	UrlService.redirectToNewVintage = function(wineId) {
		$location.path('wines/' +  wineId + '/vintage/new');				
	};
	UrlService.redirectToNewWine = function() {
		$location.path('/wines/new');				
	};
	UrlService.redirectToWine = function(id) {
		$location.path('/wines/' + id);		
	};
	UrlService.redirectToWineList = function() {
		$location.path('/wines');		
	};

	UrlService.redirectToProducer = function(id) {
		$location.path('/producers/' + id);		
	};
	UrlService.redirectToProducerList = function() {
		$location.path('/producers');		
	};
	UrlService.redirectToCellar = function() {
		$location.path('/cellar');		
	};
	UrlService.redirectToAddBottles = function(storedWineId) {
		$location.path('/cellar/' + storedWineId + '/bottles/add');		
	};

	return UrlService;
}

wineDBServices.factory('UrlService', UrlService);