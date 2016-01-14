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
		GET_ALL_SUCCESS: 'recipeGetAllSuccess',
		GET_ALL_ERROR: 'recipeGetAllError',
		COUNT_SUCCESS: 'recipeCountSuccess',
		COUNT_ALL_ERROR: 'recipeCountError',
		GET_SUCCESS: 'recipeGetSuccess',
		GET_ERROR: 'recipeGetError',
		GET_RANDOM_SUCCESS: 'recipeGetRandomSuccess',
		GET_RANDOM_ERROR: 'recipeGetRandomError',
		GET_SEARCH_SUCCESS: 'recipeSearchSuccess',
		GET_SEARCH_ERROR: 'recipeSearchError',
		UPDATE_SUCCESS: 'recipeUpdateSuccess',
		UPDATE_ERROR: 'recipeUpdateError',
		DELETE_SUCCESS: 'recipeDeleteSuccess',
		DELETE_ERROR: 'recipeDeleteError',
		INSERT_SUCCESS: 'recipeInsertSuccess',
		INSERT_ERROR: 'recipeInsertError'
	};
	
	var tagsToString = function(tags) {
		return tags.join(',');
	};
	
	var stringToTags = function(aString) {
		var tags = aString.split(',');
		return tags;
	}
	
	var indexOfRecipe = function(aRecipe) {
		for (var i=0; i<RecipiesService.recipies.length; i++) {
			if (RecipiesService.recipies[i].recipe_id == aRecipe.recipe_id) {
				return i;
			}
		}
	}

	RecipiesService.getAll = function() {
		var results = null;
		$http.get(
			request + 'recipies/'
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success', data);
				RecipiesService.recipies = data.result;
				angular.forEach(RecipiesService.recipies, function(recipe, key) {
					recipe.recipe_categories = stringToTags(recipe.recipe_categories);
				});
				NotificationCenter.postNotification(RecipiesService.notifications.GET_ALL_SUCCESS);				
			} else {
				console.log('error', data);
				NotificationCenter.postNotification(RecipiesService.notifications.GET_ALL_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.GET_ALL_ERROR);
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
			NotificationCenter.postNotification(RecipiesService.notifications.GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.GET_ERROR);
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
				NotificationCenter.postNotification(RecipiesService.notifications.GET_RANDOM_SUCCESS);				
				//console.log('Recipe', RecipiesService.recipe);
			} else {
				NotificationCenter.postNotification(RecipiesService.notifications.GET_RANDOM_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.GET_RANDOM_ERROR);
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
				NotificationCenter.postNotification(RecipiesService.notifications.SEARCH_SUCCESS);				
			} else {
				NotificationCenter.postNotification(RecipiesService.notifications.SEARCH_ERROR);			
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.SEARCH_ERROR);
		});		
	}

	RecipiesService.update = function(aRecipe) {
		var recipe = angular.copy(aRecipe);
		recipe.recipe_categories = tagsToString(aRecipe.recipe_categories);
		$http.post(
			request + 'recipies/' + recipe.recipe_id,
			recipe
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				var recipeIndex = indexOfRecipe(aRecipe);
				console.log('Index', recipeIndex);
				RecipiesService.recipies.splice(recipeIndex, 1, aRecipe);
				console.log('success while updating', data);
				NotificationCenter.postNotification(RecipiesService.notifications.UPDATE_SUCCESS);			
			} else {
				console.log('error while updating (101)', data);			
				NotificationCenter.postNotification(RecipiesService.notifications.UPDATE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error while updating (102)', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.UPDATE_ERROR);
		});				
	}
	
	RecipiesService.insert = function(aRecipe, categories) {
		RecipiesService.lastInsertedId = 0;
		var recipe = angular.copy(aRecipe);
		recipe.recipe_categories = tagsToString(recipe.recipe_categories);
		$http.post(
			request + 'recipies/',
			recipe
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				console.log('success while inserting', data);
				RecipiesService.lastInsertedId = data.id;
				RecipiesService.recipies.push(aRecipe);
				NotificationCenter.postNotification(RecipiesService.notifications.INSERT_SUCCESS);				
			} else {
				console.log('error while inserting', data);			
				NotificationCenter.postNotification(RecipiesService.notifications.INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.INSERT_ERROR);
		});				
		
	}
	
	return RecipiesService;
}

momocloudServices.factory('RecipiesService', RecipiesService);