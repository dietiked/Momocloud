function LibraryBooksService($http, NotificationCenter) {
	var LibraryBooksService = {};
	var request = 'apps/api/api.php/library/';
	var googleBooksAPIUrl = 'https://www.googleapis.com/books/v1/';
	var googleBooksAPIKey = 'AIzaSyBkPMNOde4rkLGYbvkJvESfLE5tcQn0UyQ';
	
	LibraryBooksService.books = [];
	LibraryBooksService.searchBooks = [];
	LibraryBooksService.numberOfBooks = 0;
	LibraryBooksService.book = {};
	LibraryBooksService.lastInsertedId = 0;
	
	LibraryBooksService.notifications = {
		GET_ALL_SUCCESS: 'libraryBookGetAllSuccess',
		GET_ALL_ERROR: 'libraryBookGetAllError',
		GET_SUCCESS: 'libraryBookGetSuccess',
		GET_ERROR: 'libraryBookGetError',
		UPDATE_SUCCESS: 'libraryBookUpdateSuccess',
		UPDATE_ERROR: 'libraryBookUpdateError',
		DELETE_SUCCESS: 'libraryBookDeleteSuccess',
		DELETE_ERROR: 'libraryBookDeleteError',
		INSERT_SUCCESS: 'libraryBookInsertSuccess',
		INSERT_ERROR: 'libraryBookInsertError',
		SEARCH_SUCCESS: 'libraryBookSearchSuccess',
		SEARCH_ERROR: 'libraryBookSearchError',
	};
		
	var googleBookToMomocloudBook = function (googleBook) {
		var isbn10, isbn13;
		var momocloudBook = {
			'title' : googleBook.volumeInfo.title ? googleBook.volumeInfo.title : null,
			'authors' : googleBook.volumeInfo.authors ? googleBook.volumeInfo.authors.join(', ') : null,
			'categories' : googleBook.volumeInfo.categories ? googleBook.volumeInfo.categories.join(', ') : null,
			'language' : googleBook.volumeInfo.language ? googleBook.volumeInfo.language : null,
			'ISBN10' : googleBook.volumeInfo.industryIdentifiers[0] ? googleBook.volumeInfo.industryIdentifiers[0].identifier : null,
			'ISBN13' : googleBook.volumeInfo.industryIdentifiers[1] ? googleBook.volumeInfo.industryIdentifiers[1].identifier : null,
			'publisher': googleBook.volumeInfo.publisher ? googleBook.volumeInfo.publisher : null,
			'published_data': googleBook.volumeInfo.publishedDate ? googleBook.volumeInfo.publishedDate : null,
			'thumbnail': googleBook.volumeInfo.imageLinks ? googleBook.volumeInfo.imageLinks.smallThumbnail : '',
			'source_name' : 'Google Books',
			'source_id': googleBook.id
			
		};
		return momocloudBook;
	};
	
	LibraryBooksService.getAll = function() {
		$http.get(
			request
		)
		.success(function(data) {
			if (data.success) {
				LibraryBooksService.books = data.result;
				NotificationCenter.postNotification(LibraryBooksService.notifications.GET_ALL_SUCCESS);
			} else {
				NotificationCenter.postNotification(LibraryBooksService.notifications.GET_ALL_ERROR);				
			}
		})
		.error(function() {
			NotificationCenter.postNotification(LibraryBooksService.notifications.GET_ALL_ERROR);
		});
	}
	
	LibraryBooksService.search = function(query, startIndex) {
		startIndex = startIndex ? startIndex : 0;
		// Reset results if start index is 0 (i.e. new search)
		if (startIndex == 0) {
			LibraryBooksService.searchBooks = [];
		}
		var queryString = query.split(' ').join('+');
		var requestUrl = googleBooksAPIUrl + 'volumes?q=' + queryString + '&startIndex=' + startIndex + '&key=' + googleBooksAPIKey
		$http.get(
			requestUrl
		)
		.success( function(data, status, headers, config) {
			console.log(data);
			for (var i=0; i<data.items.length; i++) {
				LibraryBooksService.searchBooks.push(googleBookToMomocloudBook(data.items[i]));
			}
			console.log(LibraryBooksService.searchBooks);
			NotificationCenter.postNotification(LibraryBooksService.notifications.SEARCH_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			console.log('error' + data)
			NotificationCenter.postNotification(LibraryBooksService.notifications.SEARCH_ERROR);
		});
	};
	
	LibraryBooksService.addBookToLibrary = function(book) {
		console.log(book);
		$http.post(
			request,
			book
		)
		.success(function(data) {
			//console.log('Success', data);
			if (data.success) {
				NotificationCenter.postNotification(LibraryBooksService.notifications.INSERT_SUCCESS);			
			} else {
				NotificationCenter.postNotification(LibraryBooksService.notifications.INSERT_ERROR);			
			}
		})
		.error(function(data) {
			//console.log('Error', data);			
			NotificationCenter.postNotification(LibraryBooksService.notifications.INSERT_ERROR);
		});
	};
	
	return LibraryBooksService;
}

momocloudServices.factory('LibraryBooksService', LibraryBooksService);