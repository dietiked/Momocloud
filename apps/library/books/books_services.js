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
		
	var tagsToString = function(tags) {
		return tags.join(',');
	};
	
	var stringToTags = function(aString) {
		var tags = aString.split(',');
		return tags;
	}

	var googleBookToMomocloudBook = function (googleBook) {
		var isbn10, isbn13;
		var momocloudBook = {
			'title' : googleBook.volumeInfo.title ? googleBook.volumeInfo.title : null,
			'authors' : googleBook.volumeInfo.authors ? googleBook.volumeInfo.authors.join(', ') : null,
			'publisher': googleBook.volumeInfo.publisher ? googleBook.volumeInfo.publisher : null,
			'categories' : googleBook.volumeInfo.categories ? googleBook.volumeInfo.categories : [],
			'published_data': googleBook.volumeInfo.publishedDate ? googleBook.volumeInfo.publishedDate : null,
			'language' : googleBook.volumeInfo.language ? googleBook.volumeInfo.language : null,
			'ISBN10' : googleBook.volumeInfo.industryIdentifiers[0] ? googleBook.volumeInfo.industryIdentifiers[0].identifier : null,
			'ISBN13' : googleBook.volumeInfo.industryIdentifiers[1] ? googleBook.volumeInfo.industryIdentifiers[1].identifier : null,
			'thumbnail': googleBook.volumeInfo.imageLinks ? googleBook.volumeInfo.imageLinks.smallThumbnail : '',
			'source_name' : 'Google Books',
			'source_id': googleBook.id
			
		};
		return momocloudBook;
	};
	
	var indexOfBook = function(aBook) {
		for (var i=0; i<LibraryBooksService.books.length; i++) {
			if (LibraryBooksService.books[i].id_book == aBook.id_book) {
				return i;
			}
		}
	}
	
	LibraryBooksService.getAll = function() {
		$http.get(
			request
		)
		.success(function(data) {
			if (data.success) {
				LibraryBooksService.books = data.result;
				angular.forEach(LibraryBooksService.books, function(book, key) {
					book.categories = stringToTags(book.categories);
				});
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
			//console.log(data);
			for (var i=0; i<data.items.length; i++) {
				LibraryBooksService.searchBooks.push(googleBookToMomocloudBook(data.items[i]));
			}
			//console.log(LibraryBooksService.searchBooks);
			NotificationCenter.postNotification(LibraryBooksService.notifications.SEARCH_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error' + data)
			NotificationCenter.postNotification(LibraryBooksService.notifications.SEARCH_ERROR);
		});
	};
	
	LibraryBooksService.addBookToLibrary = function(book) {
		book.categories = tagsToString(book.categories);
		console.log(book);
		$http.post(
			request,
			book
		)
		.success(function(data) {
			//console.log('Success', data);
			if (data.success) {
				LibraryBooksService.books.push(book);
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

	LibraryBooksService.updateBook = function(book) {
		var bookObj = angular.copy(book);
		book.categories = tagsToString(book.categories);
		$http.post(
			request + book.id_book,
			book
		)
		.success(function(data) {
			//console.log('Success', data);
			if (data.success) {
				var bookIndex = indexOfBook(bookObj);
				LibraryBooksService.books.splice(bookIndex, 1, bookObj);
				NotificationCenter.postNotification(LibraryBooksService.notifications.UPDATE_SUCCESS);	
			} else {
				NotificationCenter.postNotification(LibraryBooksService.notifications.UPDATE_ERROR);			
			}
		})
		.error(function(data) {
			//console.log('Error', data);			
			NotificationCenter.postNotification(LibraryBooksService.notifications.UPDATE_ERROR);
		});
	};

	LibraryBooksService.deleteBook = function(book) {
		//console.log(book);
		$http.delete(
			request + book.id_book
		)
		.success(function(data) {
			//console.log('Success', data);
			if (data.success) {
				var bookIndex = indexOfBook(book);
				LibraryBooksService.books.splice(bookIndex, 1);
				NotificationCenter.postNotification(LibraryBooksService.notifications.DELETE_SUCCESS);	
			} else {
				NotificationCenter.postNotification(LibraryBooksService.notifications.DELETE_ERROR);			
			}
		})
		.error(function(data) {
			//console.log('Error', data);			
			NotificationCenter.postNotification(LibraryBooksService.notifications.DELETE_ERROR);
		});
	};
	
	return LibraryBooksService;
}

momocloudServices.factory('LibraryBooksService', LibraryBooksService);