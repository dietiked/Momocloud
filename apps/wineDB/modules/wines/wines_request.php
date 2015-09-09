<?php
	require_once("../../../config.php");
	
	$db = new PDO("mysql:host=".$host.";dbname=".$db, $user, $password, array(PDO::ATTR_PERSISTENT => true));
	$mainTable = "wines";
	
	function getWines($db, $table, $id=NULL) {
		$query = "SELECT * FROM " . $table . " JOIN (wine_producers, wine_types) ON (" . $table. ".producer_id=wine_producers.producer_id AND  " . $table . ".winetype_id=wine_types.winetype_id)";
		if ($id != NULL) {
			$query = $query . " WHERE wine_id=" . $id;
		} 
		$stmt = $db->prepare($query);		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		}
		return $result;		
	}
	
	if ($_GET["f"] == "get") {
		if (isset($_GET["id"])) {
			$id = $_GET["id"];
		} else {
			$id = null;
		}
		$result = getWines($db, $mainTable, $id);
		echo json_encode($result);
		
	} else if ($_GET["f"] == "update") {
		$stmt = $db->prepare("UPDATE " . $mainTable . " SET wine_name=:wineName, producer_id=:prodId, wine_alcohol=:wineAlcohol, wine_grapes=:wineGrapes, winetype_id=:winetypeId, wine_notes=:wineNotes WHERE wine_id=:wineId");
		//$stmt->bindValue(":table", $mainTable);	
		$stmt->bindValue(":wineName", $_POST["wine_name"]);	
		$stmt->bindValue(":prodId", $_POST["producer_id"]);	
		$stmt->bindValue(":wineAlcohol", $_POST["wine_alcohol"]);	
		$stmt->bindValue(":wineGrapes", $_POST["wine_grapes"]);	
		$stmt->bindValue(":winetypeId", $_POST["winetype_id"]);	
		$stmt->bindValue(":wineNotes", $_POST["wine_notes"]);	
		$stmt->bindValue(":wineId", $_POST["wine_id"]);	
		if ($stmt->execute()) {
			$result = $stmt->rowCount();
		} else {
			$result = 0;
		}
		echo(json_encode(Array('success'=>$result, 'query'=>$stmt->queryString)));	
		
	} else if ($_GET["f"] == "insert") {
		$stmt = $db->prepare("INSERT INTO " . $mainTable . " (wine_name, producer_id, winetype_id, wine_alcohol, wine_grapes, wine_notes) VALUES (:wineName, :producerId, :winetypeId, :wineAlcohol, :wineGrapes, :wineNotes)");
		$stmt->bindValue(":wineName", $_POST["wine_name"]);	
		$stmt->bindValue(":producerId", $_POST["producer_id"]);	
		$stmt->bindValue(":winetypeId", $_POST["winetype_id"]);	
		$stmt->bindValue(":wineAlcohol", $_POST["wine_alcohol"]);	
		$stmt->bindValue(":wineGrapes", $_POST["wine_grapes"]);	
		$stmt->bindValue(":wineNotes", $_POST["wine_notes"]);	
		$stmt->execute();
		$id = $db->lastInsertId();
		if ($id > 0) {
			$result = True;
		} else {
			$result = False;
		}
		echo(json_encode(Array('success'=>$result, 'id'=>$id)));
			
	} else if ($_GET["f"] == "countWines") {
		$wines = getWines($db, $mainTable);
		echo(json_encode(Array('numberOfWines'=>count($wines))));
	}
	
?>