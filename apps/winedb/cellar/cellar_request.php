<?php
	require_once("../../_php/config.php");
	
	$db = new PDO("mysql:host=".$host.";dbname=".$db, $user, $password, array(PDO::ATTR_PERSISTENT => true));
	$mainTable = "stored_wines";
	
	function getCurrentStoredQuantity($db, $table, $storedWineId) {
		$query = "SELECT * FROM " . $table . " WHERE stored_wine_id=" . $storedWineId;
		$stmt = $db->prepare($query);
		if ($stmt->execute()) {
			$row= $stmt->fetch(PDO::FETCH_ASSOC);	
			$result = $row["stored_quantity"];
		} else {
			$result = 0;
		}
		return $result;		
	}
	
	function updateStoredQuantity($db, $table, $storedWineId, $newQuantity) {
		$stmt = $db->prepare("UPDATE " . $table . " SET stored_quantity=:newQuantity WHERE stored_wine_id=:wineId");
		$stmt->bindValue(":newQuantity", $newQuantity);	
		$stmt->bindValue(":wineId", (string)$storedWineId);	
		if ($stmt->execute()) {
			$result = $stmt->rowCount();
		} else {
			$result = 0;
		}		
		return $result;
	}
	
	if ($_GET["f"] == "get") {
		$query = "SELECT * FROM " . $mainTable . " JOIN (vintages, wines, wine_producers, wine_types, countries) ON (" . $mainTable . ".vintage_id=vintages.vintage_id AND vintages.wine_id=wines.wine_id AND wines.producer_id=wine_producers.producer_id AND wines.winetype_id=wine_types.winetype_id AND wine_producers.country_code=countries.country_code)";
		if (isset($_GET["vintage_id"])) {
			$id = $_GET["vintage_id"];
			$query = $query . " WHERE vintage_id=" . $id;
		} else if (isset($_GET["id"])) {
			$id = $_GET["id"];
			$query = $query . " WHERE stored_wine_id=" . $id;			
		}
		$stmt = $db->prepare($query);		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		} else {
			$result = 'Error while executing request';
		}
		echo json_encode($result);
		
	} else if ($_GET["f"] == "update") {
		$currentStoredQuantity = getCurrentStoredQuantity($db, $mainTable, $_POST["stored_wine_id"]);
		$newStoredQuantity = $currentStoredQuantity + $_POST["movement_quantity"];
		$result = updateStoredQuantity($db, $mainTable, $_POST["stored_wine_id"], $newStoredQuantity);
		echo(json_encode(Array('success'=>$result)));
			
	} else if ($_GET["f"] == "recalculate") {
		$id = $_GET["id"];
		// Get all wine movements for the stored wine
		$query = "SELECT * FROM wine_movements WHERE stored_wine_id=" . $id;
		$stmt = $db->prepare($query);
		if ($stmt->execute()) {
			$quantity = 0;
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			   $quantity = $quantity + (int)$row["movement_quantity"];
			}		
			$updateResult = updateStoredQuantity($db, $mainTable, $_GET["id"], $quantity);
			$result = $quantity;
			if ($updateResult > 0) {
				$success = True;				
			} else {
				$success = False;								
			}
		} else {
			$result = 'Error while recalculating';
			$success = False;
		}
		echo(json_encode(Array('result'=>$result, 'success'=>$success)));
	}
	
?>