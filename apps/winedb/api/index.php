<?php

require "classes/wine.php";
require "classes/vintage.php";
require "classes/producer.php";

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


?>