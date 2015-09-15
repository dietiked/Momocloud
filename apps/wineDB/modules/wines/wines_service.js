function WinesService($http, NotificationCenter) {
	var WinesService = {};
	var request = 'modules/wines/wines_request.php';
	
	WinesService.wines = [];
	WinesService.numberOfWines = 0;
	WinesService.wine = {};
	WinesService.lastWineId = 0;
	
	WinesService.notifications = {
		WINES_GET_ALL_SUCCESS: 'winesGetAllSuccess',
		WINES_GET_ALL_ERROR: 'winesGetAllError',
		WINES_COUNT_SUCCESS: 'winesCountSuccess',
		WINES_COUNT_ALL_ERROR: 'winesCountError',
		WINES_GET_SUCCESS: 'winesGetSuccess',
		WINES_GET_ERROR: 'winesGetError',
		WINES_UPDATE_SUCCESS: 'winesUpdateSuccess',
		WINES_UPDATE_ERROR: 'winesUpdateError',
		WINES_DELETE_SUCCESS: 'winesDeleteSuccess',
		WINES_DELETE_ERROR: 'winesDeleteError',
		WINES_INSERT_SUCCESS: 'winesInsertSuccess',
		WINES_INSERT_ERROR: 'winesInsertError'
	};
	
	WinesService.getAll = function() {
		var results = null;
		$http.post(
			request + '?f=get'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			WinesService.wines = data;
			NotificationCenter.postNotification(WinesService.notifications.WINES_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(WinesService.notifications.WINES_GET_ALL_ERROR);
		});		
	};
	
	WinesService.countWines = function() {
		$http.post(
			request + '?f=countWines'
		)
		.success(function(data, status, headers, config) {
			//console.log('success while countin wines', data.numberOfWines);
			WinesService.numberOfWines = data.numberOfWines;
			NotificationCenter.postNotification(WinesService.notifications.WINES_COUNT_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(WinesService.notifications.WINES_COUNT_ALL_ERROR);
		});				
	}
	
	WinesService.getWine = function(id) {
		$http.post(
			request + '?f=get&id=' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			WinesService.wine = data[0];
			NotificationCenter.postNotification(WinesService.notifications.WINES_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(WinesService.notifications.WINES_GET_ERROR);
		});		
	}
	
	WinesService.update = function(producer) {
		$http.post(
			request + '?f=update',
			producer
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while updating', data);
				NotificationCenter.postNotification(WinesService.notifications.WINES_UPDATE_SUCCESS);			
			} else {
				//console.log('error while updating (101)', data);			
				NotificationCenter.postNotification(WinesService.notifications.WINES_UPDATE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while updating (102)', data);			
			NotificationCenter.postNotification(WinesService.notifications.WINES_UPDATE_ERROR);
		});				
	}
	
	WinesService.insert = function(wine) {
		WinesService.lastWineId = 0;
		$http.post(
			request + '?f=insert',
			wine
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while inserting', data);
				WinesService.lastWineId = data.id;
				NotificationCenter.postNotification(WinesService.notifications.WINES_INSERT_SUCCESS);				
			} else {
				//console.log('error while inserting', data);			
				NotificationCenter.postNotification(WinesService.notifications.WINES_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);			
			NotificationCenter.postNotification(WinesService.notifications.WINES_INSERT_ERROR);
		});				
		
	}
	
	return WinesService;
}

wineDBServices.factory('WinesService', WinesService);