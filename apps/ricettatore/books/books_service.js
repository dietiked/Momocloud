function RecipyBooksService($http, NotificationCenter) {
	var RecipyBooksService = {};
	var request = 'apps/api/api.php/ricettatore/';
	
	RecipyBooksService.books = [];
	RecipyBooksService.numberOfBooks = 0;
	RecipyBooksService.book = {};
	RecipyBooksService.lastInsertedId = 0;
	
	RecipyBooksService.notifications = {
		RECIPY_BOOKS_GET_ALL_SUCCESS: 'recipyBookGetAllSuccess',
		RECIPY_BOOKS_GET_ALL_ERROR: 'recipyBookGetAllError',
		RECIPY_BOOKS_COUNT_SUCCESS: 'recipyBookCountSuccess',
		RECIPY_BOOKS_COUNT_ALL_ERROR: 'recipyBookCountError',
		RECIPY_BOOKS_GET_SUCCESS: 'recipyBookGetSuccess',
		RECIPY_BOOKS_GET_ERROR: 'recipyBookGetError',
		RECIPY_BOOKS_UPDATE_SUCCESS: 'recipyBookUpdateSuccess',
		RECIPY_BOOKS_UPDATE_ERROR: 'recipyBookUpdateError',
		RECIPY_BOOKS_DELETE_SUCCESS: 'recipyBookDeleteSuccess',
		RECIPY_BOOKS_DELETE_ERROR: 'recipyBookDeleteError',
		RECIPY_BOOKS_INSERT_SUCCESS: 'recipyBookInsertSuccess',
		RECIPY_BOOKS_INSERT_ERROR: 'recipyBookInsertError'
	};
	
	RecipyBooksService.getAll = function() {
		var results = null;
		$http.get(
			request + 'books/'
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipyBooksService.books = data;
			NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_GET_ALL_ERROR);
		});		
	};
	
	RecipyBooksService.count = function() {
		$http.post(
			request + '?f=countCategories'
		)
		.success(function(data, status, headers, config) {
			//console.log('success while countin recipies', data.numberOfBooks);
			RecipyBooksService.numberOfBooks = data.numberOfBooks;
			NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_COUNT_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_COUNT_ALL_ERROR);
		});				
	}
	
	RecipyBooksService.getWine = function(id) {
		$http.post(
			request + '?f=get&id=' + id
		)
		.success(function(data, status, headers, config) {
			//console.log('success', data);
			RecipyBooksService.recipy = data[0];
			NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_GET_ERROR);
		});		
	}
	
	RecipyBooksService.update = function(producer) {
		$http.post(
			request + '?f=update',
			producer
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while updating', data);
				NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_UPDATE_SUCCESS);			
			} else {
				//console.log('error while updating (101)', data);			
				NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_UPDATE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while updating (102)', data);			
			NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_UPDATE_ERROR);
		});				
	}
	
	RecipyBooksService.insert = function(book) {
		RecipyBooksService.lastInsertedId = 0;
		$http.post(
			request + 'books/',
			book
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				console.log('success while inserting', data);
				RecipyBooksService.lastInsertedId = data.id;
				NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_INSERT_SUCCESS);				
			} else {
				console.log('error while inserting', data);			
				NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);			
			NotificationCenter.postNotification(RecipyBooksService.notifications.RECIPY_BOOKS_INSERT_ERROR);
		});				
		
	}
	
	return RecipyBooksService;
}

momocloudServices.factory('RecipyBooksService', RecipyBooksService);