function RecipeBooksService($http, NotificationCenter) {
	var RecipeBooksService = {};
	var request = 'apps/api/api.php/ricettatore/';
	
	RecipeBooksService.books = [];
	RecipeBooksService.numberOfBooks = 0;
	RecipeBooksService.book = {};
	RecipeBooksService.lastInsertedId = 0;
	
	RecipeBooksService.notifications = {
		RECIPY_BOOKS_GET_ALL_SUCCESS: 'recipeBookGetAllSuccess',
		RECIPY_BOOKS_GET_ALL_ERROR: 'recipeBookGetAllError',
		RECIPY_BOOKS_COUNT_SUCCESS: 'recipeBookCountSuccess',
		RECIPY_BOOKS_COUNT_ALL_ERROR: 'recipeBookCountError',
		RECIPY_BOOKS_GET_SUCCESS: 'recipeBookGetSuccess',
		RECIPY_BOOKS_GET_ERROR: 'recipeBookGetError',
		RECIPY_BOOKS_UPDATE_SUCCESS: 'recipeBookUpdateSuccess',
		RECIPY_BOOKS_UPDATE_ERROR: 'recipeBookUpdateError',
		RECIPY_BOOKS_DELETE_SUCCESS: 'recipeBookDeleteSuccess',
		RECIPY_BOOKS_DELETE_ERROR: 'recipeBookDeleteError',
		RECIPY_BOOKS_INSERT_SUCCESS: 'recipeBookInsertSuccess',
		RECIPY_BOOKS_INSERT_ERROR: 'recipeBookInsertError'
	};
	
	RecipeBooksService.getAll = function() {
		var results = null;
		$http.get(
			request + 'books/'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipeBooksService.books = data;
			NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ALL_ERROR);
		});		
	};
	
	RecipeBooksService.count = function() {
		$http.post(
			request + '?f=countCategories'
		)
		.success(function(data, status, headers, config) {
			//console.log('success while countin recipies', data.numberOfBooks);
			RecipeBooksService.numberOfBooks = data.numberOfBooks;
			NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_COUNT_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_COUNT_ALL_ERROR);
		});				
	}
	
	RecipeBooksService.getWine = function(id) {
		$http.post(
			request + '?f=get&id=' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipeBooksService.recipe = data[0];
			NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_GET_ERROR);
		});		
	}
	
	RecipeBooksService.update = function(producer) {
		$http.post(
			request + '?f=update',
			producer
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while updating', data);
				NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_UPDATE_SUCCESS);			
			} else {
				//console.log('error while updating (101)', data);			
				NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_UPDATE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while updating (102)', data);			
			NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_UPDATE_ERROR);
		});				
	}
	
	RecipeBooksService.insert = function(book) {
		RecipeBooksService.lastInsertedId = 0;
		$http.post(
			request + 'books/',
			book
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				console.log('success while inserting', data);
				RecipeBooksService.lastInsertedId = data.id;
				NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_INSERT_SUCCESS);				
			} else {
				console.log('error while inserting', data);			
				NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);			
			NotificationCenter.postNotification(RecipeBooksService.notifications.RECIPY_BOOKS_INSERT_ERROR);
		});				
		
	}
	
	return RecipeBooksService;
}

momocloudServices.factory('RecipeBooksService', RecipeBooksService);