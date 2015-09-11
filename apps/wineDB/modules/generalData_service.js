function GeneralDataService($http, NotificationCenter) {
	var GeneralDataService = {};
	var request = 'modules/generalData_request.php';
	
	GeneralDataService.winetypes = [];
	GeneralDataService.ratings = [];
	GeneralDataService.years = [];
	
	GeneralDataService.notifications = {
		TYPES_GET_ALL_SUCCESS: 'winetypesGetAllSuccess',
		TYPES_GET_ALL_ERROR: 'winetypesGetAllError',
		RATINGS_GET_ALL_SUCCESS: 'ratingsGetAllSuccess',
		RATINGS_GET_ALL_ERROR: 'ratingsGetAllError',
		YEARS_GET_ALL_SUCCESS: 'yearsGetAllSuccess',
		YEARS_GET_ALL_ERROR: 'yearsGetAllError',
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

	return GeneralDataService;
}

wineDBServices.factory('GeneralDataService', GeneralDataService);