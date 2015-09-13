function VintagesService($http, NotificationCenter) {
	var VintagesService = {};
	var request = 'modules/vintages/vintages_request.php';
	
	VintagesService.vintages = [];
	VintagesService.vintage = {};
	VintagesService.isUpdated = false;
	VintagesService.isInserted = false;
	
	VintagesService.notifications = {
		VINTAGES_GET_ALL_SUCCESS: 'winesGetAllSuccess',
		VINTAGES_GET_ALL_ERROR: 'winesGetAllError',
		VINTAGES_GET_SUCCESS: 'winesGetSuccess',
		VINTAGES_GET_ERROR: 'winesGetError',
		VINTAGES_UPDATE_SUCCESS: 'winesUpdateSuccess',
		VINTAGES_UPDATE_ERROR: 'winesUpdateError',
		VINTAGES_DELETE_SUCCESS: 'winesDeleteSuccess',
		VINTAGES_DELETE_ERROR: 'winesDeleteError',
		VINTAGES_INSERT_SUCCESS: 'winesInsertSuccess',
		VINTAGES_INSERT_ERROR: 'winesInsertError'
	};
	
	VintagesService.getAll = function(wineId) {
		$http.post(
			request + '?f=get&wine_id=' + wineId
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			VintagesService.vintages = data;
			NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_GET_ALL_ERROR);
		});		
	};
	
	VintagesService.get = function(id) {
		$http.post(
			request + '?f=get&id=' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			VintagesService.vintage = data[0];
			NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_GET_ERROR);
		});		
	}
	
	VintagesService.update = function(vintage) {
		$http.post(
			request + '?f=update',
			vintage
		)
		.success(function(data, status, headers, config) {
			//console.log('success while updating', data);
			if (data.success > 0) {
				VintagesService.isUpdated = true;
				NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_UPDATE_SUCCESS);			
			} else {
				//console.log('error while updating (101)', data);			
				VintagesService.isUpdated = false;
				NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_UPDATE_ERROR);			
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while updating (102)', data);			
			VintagesService.isUpdated = false;
			NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_UPDATE_ERROR);
		});				
	}
	
	VintagesService.insert = function(vintage, wineId) {
		vintage.wine_id = wineId;
		$http.post(
			request + '?f=insert',
			vintage
		)
		.success(function(data, status, headers, config) {
			if (data.id > 0) {
				//console.log('success while inserting', data);
				VintagesService.isInserted = true;
				NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_INSERT_SUCCESS);				
			} else {
				//console.log('error while inserting (201)', data);			
				VintagesService.isInserted = false;
				NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting (202)', data);			
			VintagesService.isInserted = false;
			NotificationCenter.postNotification(VintagesService.notifications.VINTAGES_INSERT_ERROR);
		});				
		
	}
	
	return VintagesService;
}

wineDBServices.factory('VintagesService', VintagesService);