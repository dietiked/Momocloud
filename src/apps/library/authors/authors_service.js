function LibraryAuthorsService($http, NotificationCenter) {
	var LibraryAuthorsService = {};
	var request = 'apps/api/api.php/library/authors/';
	
	LibraryAuthorsService.authors = [];
	LibraryAuthorsService.author = {};
	LibraryAuthorsService.books = [];
	
	LibraryAuthorsService.notifications = {
		GET_ALL_SUCCESS: 'libraryAuthorsGetAllSuccess',
		GET_ALL_ERROR: 'libraryAuthorsGetAllError',
		GET_SUCCESS: 'libraryAuthorsGetSuccess',
		GET_ERROR: 'libraryAuthorsGetError',
		UPDATE_SUCCESS: 'libraryAuthorsUpdateSuccess',
		UPDATE_ERROR: 'libraryAuthorsUpdateError',
		DELETE_SUCCESS: 'libraryAuthorsDeleteSuccess',
		DELETE_ERROR: 'libraryAuthorsDeleteError',
		INSERT_SUCCESS: 'libraryAuthorsInsertSuccess',
		INSERT_ERROR: 'libraryAuthorsInsertError',
		SEARCH_SUCCESS: 'libraryAuthorsSearchSuccess',
		SEARCH_ERROR: 'libraryAuthorsSearchError',
	};
			
	LibraryAuthorsService.getAll = function() {
		$http.get(
			request
		)
		.success(function(data) {
			if (data.success) {
				for (var i=0; i<data.result.length; i++) {
					data.result[i].count = data.result[i]['COUNT(*)'];
				}
				console.log(data.result);
				LibraryAuthorsService.authors = data.result;
				NotificationCenter.postNotification(LibraryAuthorsService.notifications.GET_ALL_SUCCESS);
			} else {
				console.log(data);
				NotificationCenter.postNotification(LibraryAuthorsService.notifications.GET_ALL_ERROR);				
			}
		})
		.error(function(data) {
			console.log(data);
			NotificationCenter.postNotification(LibraryAuthorsService.notifications.GET_ALL_ERROR);
		});
	}
		
	return LibraryAuthorsService;
}

momocloudServices.factory('LibraryAuthorsService', LibraryAuthorsService);