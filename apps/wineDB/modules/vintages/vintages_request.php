<?php
	require_once("../../../config.php");
	
	$db = new PDO("mysql:host=".$host.";dbname=".$db, $user, $password, array(PDO::ATTR_PERSISTENT => true));
	$mainTable = "vintages";
	
	function getMainCellarId ($db) {
		$stmt = $db->prepare("SELECT * FROM cellars");
		$stmt->execute();
		$cellars = $stmt->fetch();
		return $cellars["cellar_id"];		
	}
	
	function addVintageToStoredWines ($db, $vintageId) {
		$cellarId = getMainCellarId ($db);
		$stmt = $db->prepare("INSERT INTO stored_wines (vintage_id, cellar_id, stored_quantity) VALUES (:vintageId, :cellarId, 0)");
		$stmt->bindValue(":vintageId", $vintageId);	
		$stmt->bindValue(":cellarId", $cellarId);	
		$stmt->execute();
	}
	
	if ($_GET["f"] == "get") {
		$query = "SELECT * FROM " . $mainTable;
		if (isset($_GET["wine_id"])) {
			$id = $_GET["wine_id"];
			$query = $query . " WHERE wine_id=" . $id;
		} else if (isset($_GET["id"])) {
			$id = $_GET["id"];
			$query = $query . " JOIN (wines, wine_producers) ON (" . $mainTable . ".wine_id=wines.wine_id AND wines.producer_id=wine_producers.producer_id) WHERE vintage_id=" . $id;			
		}
		$stmt = $db->prepare($query);		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		} else {
			$result = 'Error while executing request';
		}
		echo json_encode($result);
		
	} else if ($_GET["f"] == "update") {
		$stmt = $db->prepare("UPDATE " . $mainTable . " SET vintage_year=:vintYear, vintage_rating=:vintRating WHERE vintage_id=:vintId");
		//$stmt->bindValue(":table", $mainTable);	
		$stmt->bindValue(":vintYear", $_POST["vintage_year"]);	
		$stmt->bindValue(":vintRating", $_POST["vintage_rating"]);	
		$stmt->bindValue(":vintId", $_POST["vintage_id"]);	
		if ($stmt->execute()) {
			$result = $stmt->rowCount();
		} else {
			$result = 0;
		}
		echo(json_encode(Array('success'=>$result, 'query'=>$stmt->queryString)));	
		
	} else if ($_GET["f"] == "insert") {
		$stmt = $db->prepare("INSERT INTO " . $mainTable . " (vintage_year, vintage_rating, wine_id) VALUES (:vintageYear, :vintageRating, :wineId)");
		$stmt->bindValue(":vintageYear", $_POST["vintage_year"]);	
		$stmt->bindValue(":vintageRating", $_POST["vintage_rating"]);	
		$stmt->bindValue(":wineId", $_POST["wine_id"]);	
		$stmt->execute();
		$id = $db->lastInsertId();
		if ($id > 0) {
			$result = True;
			addVintageToStoredWines ($db, $id);
		} else {
			$result = False;
		}
		echo(json_encode(Array('success'=>$result, 'id'=>$id)));	
	}
	
?>