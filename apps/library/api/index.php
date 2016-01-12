<?php

require "classes/library_book.php";
require "classes/library_author.php";

// Books
$app->get("/library/", function () use ($host, $db, $user, $password) {
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->getBooks();
	echo json_encode($result);
});

$app->post("/library/", function () use ($host, $db, $user, $password, $app) {
	$book = $app->request->post();
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->addBookToLibrary($book);
	echo json_encode($result);
});

$app->post("/library/:bookId", function ($bookId) use ($host, $db, $user, $password, $app) {
	$book = $app->request->post();
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->updateBook($bookId, $book);
	echo json_encode($result);
});

$app->delete("/library/:bookId", function ($bookId) use ($host, $db, $user, $password, $app) {
	$book = $app->request->post();
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->deleteBook($bookId);
	echo json_encode($result);
});

// Authors
$app->get("/library/authors/", function () use ($host, $db, $user, $password) {
	$request = new LibraryAuthor($host, $db, $user, $password);	
	$result = $request->getAuthors();
	echo json_encode($result);
});
$app->get("/library/authors/:authorDescr", function ($authorDescr) use ($host, $db, $user, $password) {
	$request = new LibraryAuthor($host, $db, $user, $password);	
	$result = $request->getBooksForAuthor($authorDescr);
	echo json_encode($result);
});

?>