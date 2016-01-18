<?php

require "Slim/Slim.php";
require "config.php";
require "request.php";

require "classes/library_book.php";
require "classes/library_author.php";

require "classes/recipe.php";
require "classes/recipe_category.php";
require "classes/recipe_book.php";
require "classes/recipe_menu.php";

require "classes/wine.php";
require "classes/vintage.php";
require "classes/producer.php";
require "classes/movement.php";
require "classes/cellar.php";

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->response->headers->set('Content-Type', 'application/json');

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
$app->get("/library/authors/:authorDescr/books/", function ($authorDescr) use ($host, $db, $user, $password) {
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->getBooksForAuthor($authorDescr);
	echo json_encode($result);
});


$app->get("/ricettatore/menus/", function () use ($host, $db, $user, $password) {
	$request = new RecipeMenu($host, $db, $user, $password);	
	echo json_encode($request->getAll());
});

$app->post("/ricettatore/menus/", function () use ($host, $db, $user, $password) {
	$request = new RecipeMenu($host, $db, $user, $password);	
	echo json_encode($request->insertMenu());
});

$app->get("/ricettatore/menus/:id", function ($id) use ($host, $db, $user, $password) {
	$request = new RecipeMenu($host, $db, $user, $password);	
	echo json_encode($request->getRecipiesForMenuWithId($id));
});

$app->post("/ricettatore/menus/:id/recipies", function ($id) use ($host, $db, $user, $password, $app) {
	$recipies = $app->request->post();
	$request = new RecipeMenu($host, $db, $user, $password);	
	echo json_encode($request->saveRecipiesForMenu($id, $recipies));
});

$app->get("/ricettatore/menus/available/:id", function ($id) use ($host, $db, $user, $password) {
	$request = new RecipeMenu($host, $db, $user, $password);	
	echo json_encode($request->getAvailableRecipiesForMenu($id));
});

$app->get("/ricettatore/recipies/", function () use ($host, $db, $user, $password) {
	$request = new Recipe($host, $db, $user, $password);	
	echo json_encode($request->getRecipies());
});

$app->get("/ricettatore/recipies/:id", function ($id) use ($host, $db, $user, $password) {
	$request = new Recipe($host, $db, $user, $password);	
	echo json_encode($request->getRecipeWithId($id));
});

$app->get("/ricettatore/randomrecipe", function () use ($host, $db, $user, $password) {
	$request = new Recipe($host, $db, $user, $password);	
	echo json_encode($request->getRandomRecipe());
});

$app->get("/ricettatore/search/:query", function ($string) use ($host, $db, $user, $password) {
	$request = new Recipe($host, $db, $user, $password);	
	echo json_encode($request->searchForRecipe($string));
});

$app->post("/ricettatore/recipies/:id", function ($id) use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new Recipe($host, $db, $user, $password);	
	echo json_encode($request->updateRecipeWithId($id, $data));
});

$app->post("/ricettatore/recipies/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new Recipe($host, $db, $user, $password);	
	echo json_encode($request->insert($data));
});

$app->get("/ricettatore/categories/", function () use ($host, $db, $user, $password) {
	$request = new RecipeCategory($host, $db, $user, $password);	
	echo json_encode($request->getCategories());
});

$app->post("/ricettatore/categories/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new RecipeCategory($host, $db, $user, $password);	
	echo json_encode($request->insertCategory($data));
});

$app->get("/ricettatore/books/", function () use ($host, $db, $user, $password) {
	$request = new RecipeBook($host, $db, $user, $password);	
	echo json_encode($request->getBooks());
});

$app->post("/ricettatore/books/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new RecipeBook($host, $db, $user, $password);	
	echo json_encode($request->insertBook($data));
});


// Wines
$app->get("/wines/", function () use ($host, $db, $user, $password) {
	$request = new Wine($host, $db, $user, $password);	
	echo json_encode($request->getWines());
});

$app->get("/wines/count/", function () use ($host, $db, $user, $password) {
	$request = new Wine($host, $db, $user, $password);	
	echo json_encode($request->countWines());
});

$app->post("/wines/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request()->post();
	$request = new Wine($host, $db, $user, $password);	
	$result = $request->insertWine($data);
	echo json_encode($result);
});

$app->get("/wines/:id/", function ($id) use ($host, $db, $user, $password) {
	$request = new Wine($host, $db, $user, $password);	
	echo json_encode($request->getWineWithId($id));
});

$app->post("/wines/:id/", function ($id) use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new Wine($host, $db, $user, $password);	
	$result = $request->updateWineWithId($id, $data);
	echo json_encode($result);
});

// Producers
$app->get("/producers/", function () use ($host, $db, $user, $password) {
	$request = new Producer($host, $db, $user, $password);	
	echo json_encode($request->getProducers());
});

$app->post("/producers/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request()->post();
	$request = new Producer($host, $db, $user, $password);	
	echo json_encode($request->insertProducer($data));
});

$app->get("/producers/:id/", function ($id) use ($host, $db, $user, $password) {
	$request = new Producer($host, $db, $user, $password);	
	echo json_encode($request->getProducerWithId($id));
});

$app->post("/producers/:id/", function ($id) use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new Producer($host, $db, $user, $password);	
	$result = $request->updateProducerWithId($id, $data);
	echo json_encode($result);
});

$app->get("/producers/:id/wines/", function ($id) use ($host, $db, $user, $password) {
	$request = new Producer($host, $db, $user, $password);	
	echo json_encode($request->getProducerWithIdWithWines($id));
});

//Stored wines (cellar)
$app->get("/cellar/", function() use ($host, $db, $user, $password) {
	$request = new Cellar($host, $db, $user, $password);	
	$result = $request->getAll();
	echo json_encode($result);	
});
$app->get("/cellar/:id/", function($id) use ($host, $db, $user, $password) {
	$request = new Cellar($host, $db, $user, $password);	
	$result = $request->getStoredWineWithId($id);
	echo json_encode($result);	
});
$app->post("/cellar/:id/drink/", function($id) use ($host, $db, $user, $password, $app) {
	$date = $app->request->post('date');
	$request = new Cellar($host, $db, $user, $password);	
	$result = $request->drink($id, $date);
	echo json_encode($result);
});
$app->post("/cellar/:id/buy/", function($id) use ($host, $db, $user, $password, $app) {
	$date = $app->request->post('date');
	$quantity = $app->request->post('quantity');
	$request = new Cellar($host, $db, $user, $password);	
	$result = $request->addBottles($id, $date, $quantity);
	echo json_encode($result);	
});

$app->run();	


?>