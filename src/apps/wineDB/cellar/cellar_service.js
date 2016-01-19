function CellarService($http, NotificationCenter) {
	var CellarService = {};
	//var request = 'apps/winedb/cellar/cellar_request.php';
	var request = 'apps/api/api.php/cellar/';
	
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
		CELLAR_ADDED_ERROR: 'cellarInsertError',
		CELLAR_DRINK_SUCCESS: 'cellarDrinkSuccess',
		CELLAR_DRINK_ERROR: 'cellarDrinkError',
		CELLAR_BUY_SUCCESS: 'cellarBuySuccess',
		CELLAR_BUY_ERROR: 'cellarBuyError'
	};
	
	CellarService.getAll = function() {
		var results = null;
		$http.get(
			request
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				for (var i=0; i<data.length; i++) {
					data.result[i].stored_quantity = Number(data[i].stored_quantity);
					data.result[i].vintage_rating = Number(data[i].vintage_rating);
					data.result[i].vintage_year = Number(data[i].vintage_year);
				}
				CellarService.storedWines = data.result;
				//console.log(CellarService.storedWines);
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_ALL_SUCCESS);				
			} else {
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_ALL_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_ALL_ERROR);
		});		
	};
	
	CellarService.get = function(id) {
		$http.post(
			request + id + '/'
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success', data);
				CellarService.storedWine = data.result;
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_SUCCESS);				
			} else {
				//console.log('error', data);
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_ERROR);			
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_GET_ERROR);
		});		
	};
	
	CellarService.drink = function(storedWineId, aDate) {
		var postContent = { 'date': moment(aDate).format('YYYY.MM.DD') };
		//console.log(postContent);
		$http.post(
			request + storedWineId + '/drink/',
			postContent
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while drinking', data);
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_DRINK_SUCCESS);				
			} else {
				//console.log('error while drinking (201)', data);			
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_DRINK_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while drinking (202)', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_DRINK_ERROR);
		});						
	}

	CellarService.buy = function(storedWineId, aDate, quantity) {
		var postContent = { 
			'date': moment(aDate).format('YYYY.MM.DD'),
			'quantity': Number(quantity)
		};
		//console.log(postContent);
		$http.post(
			request + storedWineId + '/buy/',
			postContent
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while drinking', data);
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_BUY_SUCCESS);				
			} else {
				//console.log('error while drinking (201)', data);			
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_BUY_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while drinking (202)', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_BUY_ERROR);
		});						
	}
		
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
				console.log('success while adding bottles', data);
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_ADDED_SUCCESS);				
			} else {
				console.log('error while inserting bottles (201)', data);			
				NotificationCenter.postNotification(CellarService.notifications.CELLAR_ADDED_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error while inserting bottles (202)', data);			
			NotificationCenter.postNotification(CellarService.notifications.CELLAR_ADDED_ERROR);
		});				
		
	};
	
	return CellarService;
}

momocloudServices.factory('CellarService', CellarService);