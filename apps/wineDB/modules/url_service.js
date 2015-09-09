function UrlService($http, $location, NotificationCenter) {
	var UrlService = {};
		
	UrlService.notifications = {
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

	return UrlService;
}

wineDBServices.factory('UrlService', UrlService);