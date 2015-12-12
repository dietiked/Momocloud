function RecipiesService($http, NotificationCenter) {
	var RecipiesService = {};
	var request = 'apps/api/api.php/ricettatore/';
	
	RecipiesService.recipies = [];
	RecipiesService.numberOfRecipies = 0;
	RecipiesService.recipy = {};
	RecipiesService.randomRecipy = {};
	RecipiesService.searchRecipies = [];
	RecipiesService.lastInsertedRecipy = 0;
	
	RecipiesService.notifications = {
		RECIPIES_GET_ALL_SUCCESS: 'recipyGetAllSuccess',
		RECIPIES_GET_ALL_ERROR: 'recipyGetAllError',
		RECIPIES_COUNT_SUCCESS: 'recipyCountSuccess',
		RECIPIES_COUNT_ALL_ERROR: 'recipyCountError',
		RECIPIES_GET_SUCCESS: 'recipyGetSuccess',
		RECIPIES_GET_ERROR: 'recipyGetError',
		RECIPIES_GET_RANDOM_SUCCESS: 'recipyGetRandomSuccess',
		RECIPIES_GET_RANDOM_ERROR: 'recipyGetRandomError',
		RECIPIES_GET_SEARCH_SUCCESS: 'recipySearchSuccess',
		RECIPIES_GET_SEARCH_ERROR: 'recipySearchError',
		RECIPIES_UPDATE_SUCCESS: 'recipyUpdateSuccess',
		RECIPIES_UPDATE_ERROR: 'recipyUpdateError',
		RECIPIES_DELETE_SUCCESS: 'recipyDeleteSuccess',
		RECIPIES_DELETE_ERROR: 'recipyDeleteError',
		RECIPIES_INSERT_SUCCESS: 'recipyInsertSuccess',
		RECIPIES_INSERT_ERROR: 'recipyInsertError'
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
			angular.forEach(RecipiesService.recipies, function(recipy, key) {
				recipy.recipy_categories = stringToTags(recipy.recipy_categories);
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
			var aRecipy = data[0];
			aRecipy.recipy_categories = stringToTags(aRecipy.recipy_categories);
			RecipiesService.recipy = aRecipy;
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_ERROR);
		});		
	}

	RecipiesService.getRandomRecipy = function() {
		$http.get(
			request + 'randomrecipy'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			if (data.success) {
				var aRecipy = data.recipy;
				aRecipy.recipy_categories = stringToTags(aRecipy.recipy_categories);
				RecipiesService.randomRecipy = aRecipy;
				NotificationCenter.postNotification(RecipiesService.notifications.RECIPIES_GET_RANDOM_SUCCESS);				
				//console.log('Recipy', RecipiesService.recipy);
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
				angular.forEach(searchRecipies, function(aRecipy, index) {
					aRecipy.recipy_categories = stringToTags(aRecipy.recipy_categories);
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

	RecipiesService.update = function(recipy, categories) {
		recipy.recipy_categories = tagsToString(categories);
		$http.post(
			request + 'recipies/' + recipy.recipy_id,
			recipy
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
	
	RecipiesService.insert = function(recipy, categories) {
		RecipiesService.lastInsertedId = 0;
		recipy.recipy_categories = tagsToString(categories);
		$http.post(
			request + 'recipies/',
			recipy
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