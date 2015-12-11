function CellarService($http, NotificationCenter) {
	var CellarService = {};
	var request = 'apps/winedb/cellar/cellar_request.php';
	
	CellarService.storedWines = [];
	CellarService.storedWine = {};
	CellarService.bottlesInCellar = {};
	CellarService.numberOfStoredWines = 0;
	
	CellarService.notifications = {
		CELLAR_GET_ALL_SUCCESS: 'cellarGetAllSuccess',
		CELLAR_GET_ALL_ERROR: 'cellarGetAllError',
		CELLAR_GET_SUCCESS: 'cellarGetSuccess',
		CELLAR_GET_ERROR: 'cellarGetError',
		CELLAR_GET_BOTTLES_SUCCESS: 'cellarGetBottlesSuccess',
		CELLAR_GET_BOTTLES_ERROR: 'cellarGetBottlesError',
		CELLAR_UPDATE_SUCCESS: 'cellarUpdateSuccess',
		CELLAR_UPDATE_ERROR: 'cellarUpdateError',
		CELLAR_DELETE_SUCCESS: 'cellarDeleteSuccess',
		CELLAR_DELETE_ERROR: 'cellarDeleteError',
		CELLAR_ADDED_SUCCESS: 'cellarInsertSuccess',
		CELLAR_ADDED_ERROR: 'cellarInsertError'
	};
	
	CellarService.getAll = function() {
		var results = null;
		$http.post(
			request + '?f=get'
		)
		.success(function(data, status, headers, config) {
			for (var i=0; i<data.length; i++) {
				data[i].stored_quantity = Number(data[i].stored_quantity);
				data[i].vintage_rating = Number(data[i].vintage_rating);
				data[i].vintage_year = Number(data[i].vintage_year);
			}
			CellarService.storedWines = data;
			console.log(CellarService.storedWines);
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_ALL_ERROR);
		});		
	};
	
	CellarService.get = function(id) {
		$http.post(
			request + '?f=get&id=' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			CellarService.storedWine = data[0];
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_ERROR);
		});		
	};
		
	CellarService.recalculateQuantity = function(storedWineId) {
		$http.post(
			request + '?f=recalculate&id=' + storedWineId
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while adding recalculated quantity', data);
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_RECALCULATE_SUCCESS);				
			} else {
				//console.log('error while inserting recalculated quantity (201)', data);			
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_RECALCULATE_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting recalculated quantity (202)', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_RECALCULATE_ERROR);
		});						
	};
		
	CellarService.updateQuantity = function(movement) {
		$http.post(
			request + '?f=update',
			movement
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while adding bottles', data);
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_ADDED_SUCCESS);				
			} else {
				//console.log('error while inserting bottles (201)', data);			
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_ADDED_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting bottles (202)', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_ADDED_ERROR);
		});				
		
	};
	
	return CellarService;
}

momocloudServices.factory('CellarService', CellarService);