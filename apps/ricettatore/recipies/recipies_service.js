function RecipiesService($http, NotificationCenter) {
	var RecipiesService = {};
	var request = 'apps/api/api.php/ricettatore/';
	
	RecipiesService.recipies = [];
	RecipiesService.numberOfRecipies = 0;
	RecipiesService.recipe = {};
	RecipiesService.randomRecipe = {};
	RecipiesService.searchRecipies = [];
	RecipiesService.lastInsertedRecipe = 0;
	
	RecipiesService.notifications = {
		RECIPIES_GET_ALL_SUCCESS: 'recipeGetAllSuccess',
		RECIPIES_GET_ALL_ERROR: 'recipeGetAllError',
		RECIPIES_COUNT_SUCCESS: 'recipeCountSuccess',
		RECIPIES_COUNT_ALL_ERROR: 'recipeCountError',
		RECIPIES_GET_SUCCESS: 'recipeGetSuccess',
		RECIPIES_GET_ERROR: 'recipeGetError',
		RECIPIES_GET_RANDOM_SUCCESS: 'recipeGetRandomSuccess',
		RECIPIES_GET_RANDOM_ERROR: 'recipeGetRandomError',
		RECIPIES_GET_SEARCH_SUCCESS: 'recipeSearchSuccess',
		RECIPIES_GET_SEARCH_ERROR: 'recipeSearchError',
		RECIPIES_UPDATE_SUCCESS: 'recipeUpdateSuccess',
		RECIPIES_UPDATE_ERROR: 'recipeUpdateError',
		RECIPIES_DELETE_SUCCESS: 'recipeDeleteSuccess',
		RECIPIES_DELETE_ERROR: 'recipeDeleteError',
		RECIPIES_INSERT_SUCCESS: 'recipeInsertSuccess',
		RECIPIES_INSERT_ERROR: 'recipeInsertError'
	};
	
	var tagsToString = function(tags) {
		var strings = [];
		angular.forEach(tags, function(tag, key) {
			var stringTag = tag.text;
			strings.push(stringTag);
		});
		return strings.join();
	};
	
	var stringToTags = function(aString) {
		var tags = aString.split(',');
		return tags;
	}
	
	RecipiesService.getAll = function() {
		var results = null;
		$http.get(
			request + 'recipies/'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipiesService.recipies = data;
			angular.forEach(RecipiesService.recipies, function(recipe, key) {
				recipe.recipe_categories = stringToTags(recipe.recipe_categories);
			});
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_ALL_ERROR);
		});		
	};
		
	RecipiesService.get = function(id) {
		$http.get(
			request + 'recipies/' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			var aRecipe = data[0];
			aRecipe.recipe_categories = stringToTags(aRecipe.recipe_categories);
			RecipiesService.recipe = aRecipe;
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_ERROR);
		});		
	}

	RecipiesService.getRandomRecipe = function() {
		$http.get(
			request + 'randomrecipe'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			if (data.success) {
				var aRecipe = data.recipe;
				aRecipe.recipe_categories = stringToTags(aRecipe.recipe_categories);
				RecipiesService.randomRecipe = aRecipe;
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_RANDOM_SUCCESS);				
				//console.log('Recipe', RecipiesService.recipe);
			} else {
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_RANDOM_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_RANDOM_ERROR);
		});		
	}
	
	RecipiesService.search = function(aString) {
		$http.get(
			request + 'search/' + aString
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			if (data.success) {
				var searchRecipies = data.result;
				angular.forEach(searchRecipies, function(aRecipe, index) {
					aRecipe.recipe_categories = stringToTags(aRecipe.recipe_categories);
				});
				RecipiesService.searchRecipies = searchRecipies;				
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_SEARCH_SUCCESS);				
			} else {
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_SEARCH_ERROR);			
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_SEARCH_ERROR);
		});		
	}

	RecipiesService.update = function(recipe, categories) {
		recipe.recipe_categories = tagsToString(categories);
		$http.post(
			request + 'recipies/' + recipe.recipe_id,
			recipe
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				console.log('success while updating', data);
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_UPDATE_SUCCESS);			
			} else {
				console.log('error while updating (101)', data);			
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_UPDATE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error while updating (102)', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_UPDATE_ERROR);
		});				
	}
	
	RecipiesService.insert = function(recipe, categories) {
		RecipiesService.lastInsertedId = 0;
		recipe.recipe_categories = tagsToString(categories);
		$http.post(
			request + 'recipies/',
			recipe
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				console.log('success while inserting', data);
				RecipiesService.lastInsertedId = data.id;
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_INSERT_SUCCESS);				
			} else {
				console.log('error while inserting', data);			
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_INSERT_ERROR);
		});				
		
	}
	
	return RecipiesService;
}

momocloudServices.factory('RecipiesService', RecipiesService);