function RecipeMenusService($http, NotificationCenter, RecipiesService) {
	var RecipeMenusService = {};
	var request = 'apps/api/api.php/ricettatore/';
	
	RecipeMenusService.menus = [];
	RecipeMenusService.menu = {};
	RecipeMenusService.availableRecipies = [];
	RecipeMenusService.lastInsertedId = 0;
	
	RecipeMenusService.notifications = {
		RECIPE_MENUS_GET_ALL_SUCCESS: 'recipeMenusGetAllSuccess',
		RECIPE_MENUS_GET_ALL_ERROR: 'recipeMenusGetAllError',
		RECIPE_MENUS_COUNT_SUCCESS: 'recipeMenusCountSuccess',
		RECIPE_MENUS_COUNT_ALL_ERROR: 'recipeMenusCountError',
		RECIPE_MENUS_GET_SUCCESS: 'recipeMenusGetSuccess',
		RECIPE_MENUS_GET_ERROR: 'recipeMenusGetError',
		RECIPE_MENUS_GET_AVAILABLE_SUCCESS: 'recipeMenusGetAvailableSuccess',
		RECIPE_MENUS_GET_AVAILABLE_ERROR: 'recipeMenusGetAvailableError',
		RECIPE_MENUS_GET_SEARCH_SUCCESS: 'recipeMenusSearchSuccess',
		RECIPE_MENUS_GET_SEARCH_ERROR: 'recipeMenusSearchError',
		RECIPE_MENUS_UPDATE_SUCCESS: 'recipeMenusUpdateSuccess',
		RECIPE_MENUS_UPDATE_ERROR: 'recipeMenusUpdateError',
		RECIPE_MENUS_DELETE_SUCCESS: 'recipeMenusDeleteSuccess',
		RECIPE_MENUS_DELETE_ERROR: 'recipeMenusDeleteError',
		RECIPE_MENUS_INSERT_SUCCESS: 'recipeMenusInsertSuccess',
		RECIPE_MENUS_INSERT_ERROR: 'recipeMenusInsertError'
	};
		
	RecipeMenusService.getAll = function() {
		$http.get(
			request + 'menus/'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			if (data.success) {
				RecipeMenusService.menus = data.result;
				NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_ALL_SUCCESS);			
			} else {
				NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_ALL_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_ALL_ERROR);
		});		
	};
		
	RecipeMenusService.get = function(id) {
		$http.get(
			request + 'menus/' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			if (data.success) {
				RecipeMenusService.menu = data.result;
				NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_SUCCESS);				
			} else {
				NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_ERROR);
		});		
	}

	RecipeMenusService.getAvailableRecipies = function(id) {
		$http.get(
			request + 'menus/available/' + id
		)
		.success(function(data, status, headers, config) {
			console.log('success', data);
			if (data.success) {
				RecipeMenusService.availableRecipies = data.result;
				NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_AVAILABLE_SUCCESS);				
			} else {
				NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_AVAILABLE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error', data);			
			NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_GET_AVAILABLE_ERROR);
		});		
	}
	
	RecipeMenusService.insert = function() {
		RecipeMenusService.lastInsertedId = 0;
		$http.post(
			request + 'menus/'
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				console.log('success while inserting', data);
				RecipeMenusService.lastInsertedId = data.id;
				NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_INSERT_SUCCESS);				
			} else {
				console.log('error while inserting', data);			
				NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);			
			NotificationCenter.postNotification(RecipeMenusService.notifications.RECIPE_MENUS_INSERT_ERROR);
		});				
		
	}
	
	return RecipeMenusService;
}

momocloudServices.factory('RecipeMenusService', RecipeMenusService);