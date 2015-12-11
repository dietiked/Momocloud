function GeneralDataService($http, NotificationCenter) {
	var GeneralDataService = {};
	var request = 'apps/winedb/generalData_request.php';
	
	GeneralDataService.winetypes = [];
	GeneralDataService.ratings = [];
	GeneralDataService.years = [];
	GeneralDataService.countries = [];
	
	GeneralDataService.notifications = {
		TYPES_GET_ALL_SUCCESS: 'winetypesGetAllSuccess',
		TYPES_GET_ALL_ERROR: 'winetypesGetAllError',
		RATINGS_GET_ALL_SUCCESS: 'ratingsGetAllSuccess',
		RATINGS_GET_ALL_ERROR: 'ratingsGetAllError',
		YEARS_GET_ALL_SUCCESS: 'yearsGetAllSuccess',
		YEARS_GET_ALL_ERROR: 'yearsGetAllError',
		COUNTRIES_GET_ALL_SUCCESS: 'countriesGetAllSuccess',
		COUNTRIES_GET_ALL_ERROR: 'countriesGetAllError',
	};
	
	GeneralDataService.getWinetypes = function() {
		var results = null;
		$http.post(
			request + '?f=winetypes'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			GeneralDataService.winetypes = data;
			NotificationCenter.postNotification(GeneralDataService.notifications.TYPES_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(GeneralDataService.notifications.TYPES_GET_ALL_ERROR);
		});		
	};
	
	GeneralDataService.getRatings = function() {
		var results = null;
		$http.post(
			request + '?f=ratings'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			GeneralDataService.ratings = data;
			NotificationCenter.postNotification(GeneralDataService.notifications.RATINGS_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(GeneralDataService.notifications.RATINGS_GET_ALL_ERROR);
		});		
	};

	GeneralDataService.getYears = function() {
		var results = null;
		$http.post(
			request + '?f=years'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			GeneralDataService.years = data;
			NotificationCenter.postNotification(GeneralDataService.notifications.YEARS_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(GeneralDataService.notifications.YEARS_GET_ALL_ERROR);
		});		
	};

	GeneralDataService.getCountries = function() {
		var results = null;
		$http.post(
			request + '?f=countries'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data, status, headers);
			GeneralDataService.countries = data;
			NotificationCenter.postNotification(GeneralDataService.notifications.COUNTRIES_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(GeneralDataService.notifications.COUNTRIES_GET_ALL_ERROR);
		});		
	};

	return GeneralDataService;
}

momocloudServices.factory('GeneralDataService', GeneralDataService);