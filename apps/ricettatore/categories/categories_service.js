function RecipeCategoriesService($http, NotificationCenter) {
	var RecipeCategoriesService = {};
	var request = 'apps/api/api.php/ricettatore/';
	
	RecipeCategoriesService.categories = [];
	RecipeCategoriesService.numberOfRecipies = 0;
	RecipeCategoriesService.recipe = {};
	RecipeCategoriesService.lastInsertedCategory = 0;
	
	RecipeCategoriesService.notifications = {
		RECIPY_CATEGORIES_GET_ALL_SUCCESS: 'recipeCategoryGetAllSuccess',
		RECIPY_CATEGORIES_GET_ALL_ERROR: 'recipeCategoryGetAllError',
		RECIPY_CATEGORIES_COUNT_SUCCESS: 'recipeCategoryCountSuccess',
		RECIPY_CATEGORIES_COUNT_ALL_ERROR: 'recipeCategoryCountError',
		RECIPY_CATEGORIES_GET_SUCCESS: 'recipeCategoryGetSuccess',
		RECIPY_CATEGORIES_GET_ERROR: 'recipeCategoryGetError',
		RECIPY_CATEGORIES_UPDATE_SUCCESS: 'recipeCategoryUpdateSuccess',
		RECIPY_CATEGORIES_UPDATE_ERROR: 'recipeCategoryUpdateError',
		RECIPY_CATEGORIES_DELETE_SUCCESS: 'recipeCategoryDeleteSuccess',
		RECIPY_CATEGORIES_DELETE_ERROR: 'recipeCategoryDeleteError',
		RECIPY_CATEGORIES_INSERT_SUCCESS: 'recipeCategoryInsertSuccess',
		RECIPY_CATEGORIES_INSERT_ERROR: 'recipeCategoryInsertError'
	};
	
	RecipeCategoriesService.getAll = function() {
		var results = null;
		$http.get(
			request + 'categories/'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipeCategoriesService.categories = data;
			NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_GET_ALL_ERROR);
		});		
	};
	
	RecipeCategoriesService.countWines = function() {
		$http.post(
			request + '?f=countCategories'
		)
		.success(function(data, status, headers, config) {
			//console.log('success while countin recipies', data.numberOfRecipies);
			RecipeCategoriesService.numberOfRecipies = data.numberOfRecipies;
			NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_COUNT_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_COUNT_ALL_ERROR);
		});				
	}
	
	RecipeCategoriesService.getWine = function(id) {
		$http.post(
			request + '?f=get&id=' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipeCategoriesService.recipe = data[0];
			NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_GET_ERROR);
		});		
	}
	
	RecipeCategoriesService.update = function(producer) {
		$http.post(
			request + '?f=update',
			producer
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while updating', data);
				NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_UPDATE_SUCCESS);			
			} else {
				//console.log('error while updating (101)', data);			
				NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_UPDATE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while updating (102)', data);			
			NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_UPDATE_ERROR);
		});				
	}
	
	RecipeCategoriesService.insert = function(category) {
		RecipeCategoriesService.lastInsertedCategory = 0;
		$http.post(
			request + 'categories/',
			category
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				console.log('success while inserting', data);
				RecipeCategoriesService.lastInsertedCategory = data.id;
				NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_INSERT_SUCCESS);				
			} else {
				console.log('error while inserting', data);			
				NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);			
			NotificationCenter.postNotification(RecipeCategoriesService.notifications.RECIPY_CATEGORIES_INSERT_ERROR);
		});				
		
	}
	
	return RecipeCategoriesService;
}

momocloudServices.factory('RecipeCategoriesService', RecipeCategoriesService);