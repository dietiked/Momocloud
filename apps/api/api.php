<?php

require "../../libs/Slim/Slim.php";
require "config.php";
require "request.php";

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->response->headers->set('Content-Type', 'application/json');

include "../winedb/api/index.php";
include "../ricettatore/api/index.php";

$app->run();	


?>