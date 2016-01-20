<?php
	
class Cellar extends Request {
	
	// Get
	function getAll() {
		$query = "SELECT * FROM stored_wines JOIN (vintages, wines, wine_producers, wine_types, countries) "
		. "ON (stored_wines.vintage_id=vintages.vintage_id "
		. "AND vintages.wine_id=wines.wine_id "
		. "AND wines.producer_id=wine_producers.producer_id "
		. "AND wines.winetype_id=wine_types.winetype_id "
		. "AND wine_producers.country_code=countries.country_code) "
		. "ORDER BY -stored_quantity";
		$stmt = $this->connection->prepare($query);		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			$success = True;			
		} else {
			$result = 'Error while executing request';
			$success = False;			
		}
		return Array("success" => $success, "result" => $result);
	}
	
	function getStoredWineWithId($storedWineId) {
		$query = "SELECT * FROM stored_wines JOIN (vintages, wines, wine_producers, wine_types, countries) "
		. "ON (stored_wines.vintage_id=vintages.vintage_id "
		. "AND vintages.wine_id=wines.wine_id "
		. "AND wines.producer_id=wine_producers.producer_id "
		. "AND wines.winetype_id=wine_types.winetype_id "
		. "AND wine_producers.country_code=countries.country_code) "
		. "ORDER BY -stored_quantity "
		. "WHERE stored_wine_id=" . $storedWineId;
		$stmt = $this->connection->prepare($query);		
		if ($stmt->execute()) {
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			$success = True;			
		} else {
			$result = 'Error while executing request';
			$success = False;			
		}
		return Array("success" => $success, "result" => $result);		
	}
		
	// Manipulate stored quantities
	function updateStoredQuantity($storedWineId, $newQuantity) {
		$stmt = $this->connection->prepare("UPDATE stored_wines SET stored_quantity=:newQuantity WHERE stored_wine_id=:wineId");
		$stmt->bindValue(":newQuantity", $newQuantity);	
		$stmt->bindValue(":wineId", (string)$storedWineId);	
		if ($stmt->execute()) {
			$result = $stmt->rowCount();
			if ($result > 0) {
				$success = True;
			} else {
				$success = False;
			}
		} else {
			$result = "Server error";
			$success = False;
		}		
		return Array("success" => $success, "result" => $result);
	}
	
	function getStoredQuantity($storedWineId) {
		$query = "SELECT * FROM stored_wines WHERE stored_wine_id=" . $storedWineId;
		$stmt = $this->connection->prepare($query);
		if ($stmt->execute()) {
			$row= $stmt->fetch(PDO::FETCH_ASSOC);	
			$result = $row["stored_quantity"];
			$success = True;
		} else {
			$success = False;
			$result = 0;
		}
		return Array("success" => $success, "result" => $result);
	}
	
	function addBottles($storedWineId, $date, $quantity) {
		// Get stored bottles
		$storedQuantity = $this->getStoredQuantity($storedWineId);
		if ($storedQuantity["success"]) {
			// Calculate new quantity
			$newQuantity = (int)$storedQuantity["result"] + (int)$quantity;
			// Update database
			$output = $this->updateStoredQuantity($storedWineId, $newQuantity);
		} else {
			$success = False;
			$result = "Error";
			$output = Array("success" => $success, "result" => $result);
		}
		// Add movement
		$movement = new Movement($this->host, $this->database, $this->user, $this->password);
		$result = $movement->addMovement($storedWineId, $date, $quantity);
		
		return $output;		
	}

	function drink($storedWineId, $date) {
		return $this->addBottles($storedWineId, $date, -1);
	}		

}
		
?>