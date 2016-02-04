function RecipeBooksService($http, NotificationCenter, apiUrlRicettatore, UtilityService) {
	var RecipeBooksService = {};
	var request = apiUrlRicettatore;

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
		UPDATE_SUCCESS: 'recipeBookUpdateSuccess',
		UPDATE_ERROR: 'recipeBookUpdateError',
		DELETE_SUCCESS: 'recipeBookDeleteSuccess',
		DELETE_ERROR: 'recipeBookDeleteError',
		INSERT_SUCCESS: 'recipeBookInsertSuccess',
		INSERT_ERROR: 'recipeBookInsertError'
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

	RecipeBooksService.update = function(aBook) {
		$http.post(
			request + 'books/' + aBook.recipe_book_id,
			aBook
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while updating', data);
				var index = UtilityService.indexForObjectInArray(aBook, RecipeBooksService.books, 'recipe_book_id');
				RecipeBooksService.books.splice(index, 1, aBook);
				NotificationCenter.postNotification(RecipeBooksService.notifications.UPDATE_SUCCESS);
			} else {
				//console.log('error while updating (101)', data);
				NotificationCenter.postNotification(RecipeBooksService.notifications.UPDATE_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while updating (102)', data);
			NotificationCenter.postNotification(RecipeBooksService.notifications.UPDATE_ERROR);
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
				//console.log('success while inserting', data);
				RecipeBooksService.lastInsertedId = data.id;
				RecipeBooksService.books.push(book);
				NotificationCenter.postNotification(RecipeBooksService.notifications.INSERT_SUCCESS);
			} else {
				//console.log('error while inserting', data);
				NotificationCenter.postNotification(RecipeBooksService.notifications.INSERT_ERROR);
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting', data);
			NotificationCenter.postNotification(RecipeBooksService.notifications.INSERT_ERROR);
		});

	}

	return RecipeBooksService;
}

momocloudRicettatore.factory('RecipeBooksService', RecipeBooksService);
