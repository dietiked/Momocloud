<?php

require "Slim/Slim.php";
require "config.php";
require "classes/request.php";

require "classes/authPasswordHash.php";	
require "classes/auth.php";

require "classes/library_book.php";
require "classes/library_author.php";

require "classes/recipe.php";
require "classes/recipe_category.php";
require "classes/recipe_book.php";
require "classes/recipe_menu.php";

require "classes/winedb_wine.php";
require "classes/winedb_general_data.php";
require "classes/winedb_vintage.php";
require "classes/winedb_producer.php";
require "classes/winedb_movement.php";
require "classes/winedb_cellar.php";

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->response->headers->set("Content-Type", "application/json");

// ! Authentication API
$app->post("/auth/login/", function () use ($host, $db, $user, $password, $app) {
	$email = $app->request->post("email");
	$userPassword = $app->request->post("password");
	$request = new Auth($host, $db, $user, $password);	
	$result = $request->login($email, $userPassword);
	echo json_encode($result);	
});

$app->post("/auth/subscribe/", function () use ($host, $db, $user, $password, $app) {
	$email = $app->request->post("email");
	$password = $app->request->post("password");
	$request = new Auth($host, $db, $user, $password);	
	$result = $request->subscribe($email, $password);
	echo json_encode($result);	
});

// ! Books API
$app->get("/library/books/", function () use ($host, $db, $user, $password) {
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->getBooks();
	echo json_encode($result);
});

$app->post("/library/books/", function () use ($host, $db, $user, $password, $app) {
	$book = $app->request->post();
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->addBookToLibrary($book);
	echo json_encode($result);
});

$app->post("/library/books/:bookId", function ($bookId) use ($host, $db, $user, $password, $app) {
	$book = $app->request->post();
	$request = new LibraryBook($host, $db, $user, $password);	
	$result = $request->updateBook($bookId, $book);
	echo json_encode($result);
});

$app->delete("/library/books/:bookId", function ($bookId) use ($host, $db, $user, $password, $app) {
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

// ! Ricettatore API
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


// ! WineDb API
$app->get("/winedb/generaldata/winetypes/", function () use ($host, $db, $user, $password) {
	$request = new WinesGeneralData($host, $db, $user, $password);	
	echo json_encode($request->getWinetype());
});

$app->get("/winedb/generaldata/ratings/", function () use ($host, $db, $user, $password) {
	$request = new WinesGeneralData($host, $db, $user, $password);	
	echo json_encode($request->getRatings());
});

$app->get("/winedb/generaldata/countries/", function () use ($host, $db, $user, $password) {
	$request = new WinesGeneralData($host, $db, $user, $password);	
	echo json_encode($request->getCountries());
});

$app->get("/winedb/generaldata/years/", function () use ($host, $db, $user, $password) {
	$request = new WinesGeneralData($host, $db, $user, $password);	
	echo json_encode($request->getYears());
});

$app->get("/winedb/wines/", function () use ($host, $db, $user, $password) {
	$request = new Wine($host, $db, $user, $password);	
	echo json_encode($request->getWines());
});

$app->get("/winedb/wines/count/", function () use ($host, $db, $user, $password) {
	$request = new Wine($host, $db, $user, $password);	
	echo json_encode($request->countWines());
});

$app->post("/winedb/wines/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request()->post();
	$request = new Wine($host, $db, $user, $password);	
	$result = $request->insertWine($data);
	echo json_encode($result);
});

$app->get("/winedb/wines/:id/", function ($id) use ($host, $db, $user, $password) {
	$request = new Wine($host, $db, $user, $password);	
	echo json_encode($request->getWineWithId($id));
});

$app->post("/winedb/wines/:id/", function ($id) use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new Wine($host, $db, $user, $password);	
	$result = $request->updateWineWithId($id, $data);
	echo json_encode($result);
});

// Producers
$app->get("/winedb/producers/", function () use ($host, $db, $user, $password) {
	$request = new Producer($host, $db, $user, $password);	
	echo json_encode($request->getProducers());
});

$app->post("/winedb/producers/", function () use ($host, $db, $user, $password, $app) {
	$data = $app->request()->post();
	$request = new Producer($host, $db, $user, $password);	
	echo json_encode($request->insertProducer($data));
});

$app->get("/winedb/producers/:id/", function ($id) use ($host, $db, $user, $password) {
	$request = new Producer($host, $db, $user, $password);	
	echo json_encode($request->getProducerWithId($id));
});

$app->post("/winedb/producers/:id/", function ($id) use ($host, $db, $user, $password, $app) {
	$data = $app->request->post();
	$request = new Producer($host, $db, $user, $password);	
	$result = $request->updateProducerWithId($id, $data);
	echo json_encode($result);
});

$app->get("/winedb/producers/:id/wines/", function ($id) use ($host, $db, $user, $password) {
	$request = new Producer($host, $db, $user, $password);	
	echo json_encode($request->getProducerWithIdWithWines($id));
});

//Stored wines (cellar)
$app->get("/winedb/cellar/", function() use ($host, $db, $user, $password) {
	$request = new Cellar($host, $db, $user, $password);	
	$result = $request->getAll();
	echo json_encode($result);	
});
$app->get("/winedb/cellar/:id/", function($id) use ($host, $db, $user, $password) {
	$request = new Cellar($host, $db, $user, $password);	
	$result = $request->getStoredWineWithId($id);
	echo json_encode($result);	
});
$app->post("/winedb/cellar/:id/drink/", function($id) use ($host, $db, $user, $password, $app) {
	$date = $app->request->post('date');
	$request = new Cellar($host, $db, $user, $password);	
	$result = $request->drink($id, $date);
	echo json_encode($result);
});
$app->post("/winedb/cellar/:id/buy/", function($id) use ($host, $db, $user, $password, $app) {
	$date = $app->request->post('date');
	$quantity = $app->request->post('quantity');
	$request = new Cellar($host, $db, $user, $password);	
	$result = $request->addBottles($id, $date, $quantity);
	echo json_encode($result);	
});

$app->run();	


?>