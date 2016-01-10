<?php

require "classes/library_book.php";

// Books
$app->post("/library/", function () use ($host, $db, $user, $password, $app) {
	$book = $app->request->post();
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->addBookToLibrary($book);
	echo json_encode($result);
});

?>