<?php

require "config.php";
require "request.php";
require "Slim/Slim.php";

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get("/wines", "getWines");
$app->get("/countWines", "countWines");

$app->run();


function getWines() {
	echo json_encode("Hallo");
}
function countWines() {
	echo json_encode("Hallo");
}


?>