<?php

require "classes/recipy.php";
require "classes/recipy_category.php";
require "classes/recipy_book.php";
require "classes/recipy_menu.php";

$app->get("/ricettatore/recipies/", function () use ($host, $db, $user, $password) {
	$request = new Recipy($host, $db, $user, $password);	
	echo json_encode($request->getRecipies());
});

$app->get("/ricettatore/recipies/:id", function ($id) use ($host, $db, $user, $password) {
	$request = new Recipy($host, $db, $user, $password);	
	echo json_encode($request->getRecipyWithId($id));
});

$app->get("/ricettatore/randomrecipy", function () use ($host, $db, $user, $password) {
	$request = new Recipy($host, $db, $user, $password);	
	echo json_encode($request->getRandomRecipy());
});

$app->get("/ricettatore/search/:query", function ($string) use ($host, $db, $user, $password) {
	$request = new Recipy($host, $db, $user, $password);	
	echo json_encode($request->searchForRecipy($string));
});

$app->post("/ricettatore/recipies/:id", function ($id) use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new Recipy($host, $db, $user, $password);	
	echo json_encode($request->updateRecipyWithId($id, $data));
});

$app->post("/ricettatore/recipies/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new Recipy($host, $db, $user, $password);	
	echo json_encode($request->insert($data));
});

$app->get("/ricettatore/categories/", function () use ($host, $db, $user, $password) {
	$request = new RecipyCategory($host, $db, $user, $password);	
	echo json_encode($request->getCategories());
});

$app->post("/ricettatore/categories/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new RecipyCategory($host, $db, $user, $password);	
	echo json_encode($request->insertCategory($data));
});

$app->get("/ricettatore/books/", function () use ($host, $db, $user, $password) {
	$request = new RecipyBook($host, $db, $user, $password);	
	echo json_encode($request->getBooks());
});

$app->post("/ricettatore/books/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new RecipyBook($host, $db, $user, $password);	
	echo json_encode($request->insertBook($data));
});

?>