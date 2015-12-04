function RecipyCategoriesService($http, NotificationCenter) {
	var RecipyCategoriesService = {};
	var request = 'apps/ricettatore/categories/categories_request.php';
	
	RecipyCategoriesService.wines = [];
	RecipyCategoriesService.numberOfWines = 0;
	RecipyCategoriesService.wine = {};
	RecipyCategoriesService.lastWineId = 0;
	
	RecipyCategoriesService.notifications = {
		RECIPY_CATEGORIES_GET_ALL_SUCCESS: 'recipyCategoryGetAllSuccess',
		RECIPY_CATEGORIES_GET_ALL_ERROR: 'recipyCategoryGetAllError',
		RECIPY_CATEGORIES_COUNT_SUCCESS: 'recipyCategoryCountSuccess',
		RECIPY_CATEGORIES_COUNT_ALL_ERROR: 'recipyCategoryCountError',
		RECIPY_CATEGORIES_GET_SUCCESS: 'recipyCategoryGetSuccess',
		RECIPY_CATEGORIES_GET_ERROR: 'recipyCategoryGetError',
		RECIPY_CATEGORIES_UPDATE_SUCCESS: 'recipyCategoryUpdateSuccess',
		RECIPY_CATEGORIES_UPDATE_ERROR: 'recipyCategoryUpdateError',
		RECIPY_CATEGORIES_DELETE_SUCCESS: 'recipyCategoryDeleteSuccess',
		RECIPY_CATEGORIES_DELETE_ERROR: 'recipyCategoryDeleteError',
		RECIPY_CATEGORIES_INSERT_SUCCESS: 'recipyCategoryInsertSuccess',
		RECIPY_CATEGORIES_INSERT_ERROR: 'recipyCategoryInsertError'
	};
	
	RecipyCategoriesService.getAll = function() {
		var results = null;
		$http.post(
			request + '?f=get'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipyCategoriesService.wines = data;
			NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_ERROR);
		});		
	};
	
	RecipyCategoriesService.countWines = function() {
		$http.post(
			request + '?f=countCategories'
		)
		.success(function(data, status, headers, config) {
			//console.log('success while countin wines', data.numberOfWines);
			RecipyCategoriesService.numberOfWines = data.numberOfWines;
			NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_COUNT_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_COUNT_ALL_ERROR);
		});				
	}
	
	RecipyCategoriesService.getWine = function(id) {
		$http.post(
			request + '?f=get&id=' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipyCategoriesService.wine = data[0];
			NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_GET_ERROR);
		});		
	}
	
	RecipyCategoriesService.update = function(producer) {
		$http.post(
			request + '?f=update',
			producer
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while updating', data);
				NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_UPDATE_SUCCESS);			
			} else {
				//console.log('error while updating (101)', data);			
				NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_UPDATE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while updating (102)', data);			
			NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_UPDATE_ERROR);
		});				
	}
	
	RecipyCategoriesService.insert = function(wine) {
		RecipyCategoriesService.lastWineId = 0;
		$http.post(
			request + '?f=insert',
			wine
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while inserting', data);
				RecipyCategoriesService.lastWineId = data.id;
				NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_INSERT_SUCCESS);				
			} else {
				//console.log('error while inserting', data);			
				NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);			
			NotificationCenter.postNotification(RecipyCategoriesService.notifications.RECIPY_CATEGORIES_INSERT_ERROR);
		});				
		
	}
	
	return RecipyCategoriesService;
}

momocloudServices.factory('RecipyCategoriesService', RecipyCategoriesService);