<?php
	require_once("../../_php/config.php");
	
	$db = new PDO("mysql:host=".$host.";dbname=".$db, $user, $password, array(PDO::ATTR_PERSISTENT => true));
	$mainTable = "wine_producers";
	
	if ($_GET["f"] == "get") {
		if (isset($_GET["id"])) {
			$producerId = $_GET["id"];
			$stmt = $db->prepare("SELECT * FROM " . $mainTable . " JOIN (countries) ON (wine_producers.country_code=countries.country_code) WHERE producer_id=" . $producerId);						
		} else {
			$stmt = $db->prepare("SELECT * FROM " . $mainTable . " JOIN (countries) ON (wine_producers.country_code=countries.country_code)");		
		}
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		}
		if (isset($_GET["wines"])) {
			$winesStmt = $db->prepare("SELECT * FROM wines JOIN (wine_types) ON (wines.winetype_id=wine_types.winetype_id) WHERE producer_id=" . $producerId);
			if ($winesStmt->execute()) {
				$wines = $winesStmt->fetchAll(PDO::FETCH_ASSOC);
				$result[0]["wines"] = $wines;
			}
		}
		echo json_encode($result);
	} else if ($_GET["f"] == "update") {
		$stmt = $db->prepare("UPDATE " . $mainTable . " SET producer_name=:prodName, producer_location=:prodLocation, country_code=:countryCode, producer_region=:prodRegion WHERE producer_id=:prodId");
		//$stmt->bindValue(":table", $mainTable);	
		$stmt->bindValue(":prodName", $_POST["producer_name"]);	
		$stmt->bindValue(":prodLocation", $_POST["producer_location"]);	
		$stmt->bindValue(":prodId", $_POST["producer_id"]);	
		$stmt->bindValue(":countryCode", $_POST["country_code"]);	
		$stmt->bindValue(":prodRegion", $_POST["producer_region"]);	
		$stmt->execute();
		$result = $stmt->rowCount();
		echo(json_encode(Array('success'=>$result, 'query'=>$stmt->queryString)));	
	} else if ($_GET["f"] == "insert") {
		$stmt = $db->prepare("INSERT INTO " . $mainTable . " (producer_name, producer_location, producer_region, country_code) VALUES (:prodName, :prodLocation, :prodRegion,:countryCode)");
		$stmt->bindValue(":prodName", $_POST["producer_name"]);	
		$stmt->bindValue(":prodLocation", $_POST["producer_location"]);	
		$stmt->bindValue(":countryCode", $_POST["country_code"]);	
		$stmt->bindValue(":prodRegion", $_POST["producer_region"]);	
		$stmt->execute();
		$id = $db->lastInsertId();
		if ($id > 0) {
			$result = True;
		} else {
			$result = False;
		}
		echo(json_encode(Array('success'=>$result, 'id'=>$id)));	
	}
	
?>