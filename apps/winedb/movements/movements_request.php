<?php
	require_once("../../_php/config.php");

	$db = new PDO("mysql:host=".$host.";dbname=".$db, $user, $password, array(PDO::ATTR_PERSISTENT => true));
	$mainTable = "wine_movements";

	if ($_GET["f"]=="insert") {
		$stmt = $db->prepare("INSERT INTO " . $mainTable . " (movement_quantity, movement_date, stored_wine_id) VALUES (:quantity, :date, :wineId)");
		$stmt->bindValue(":quantity", $_POST["movement_quantity"]);	
		$stmt->bindValue(":date", $_POST["movement_date"]);	
		$stmt->bindValue(":wineId", $_POST["stored_wine_id"]);	
		if ($stmt->execute()) {
			$id = $db->lastInsertId();
			if ($id > 0) {
				$result = True;
			} else {
				$result = False;
			}			
		} else {
			$id = $db->errorCode();
			$result = False;
		}
		echo(json_encode(Array('success'=>$result, 'id'=>$id)));		
	
	} else if ($_GET["f"] == "get") {
		$stmt = $db->prepare("SELECT * FROM " . $mainTable . " ORDER BY movement_date");
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		} else {
			$result = 'Error while executing request';
		}
		echo json_encode($result);
		
	}

?>