<?php

require "classes/recipe.php";
require "classes/recipe_category.php";
require "classes/recipe_book.php";
require "classes/recipe_menu.php";

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

?>