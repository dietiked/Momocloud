<?php

require "classes/library_book.php";

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

?>