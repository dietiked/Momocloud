<?php
	
class Movement extends Request {
		
	function addMovement($storedWineId, $date, $quantity) {
		$query = "INSERT INTO wine_movements (movement_quantity, movement_date, stored_wine_id) VALUES (:quantity, :date, :wineId)";
		$stmt = $this->connection->prepare($query);				
		$stmt->bindValue(":quantity", $quantity);	
		$stmt->bindValue(":date", $date);	
		$stmt->bindValue(":wineId", $storedWineId);	
		if ($stmt->execute()) {
			$id = $this->connection->lastInsertId();
			if ($id > 0) {
				$result = True;
			} else {
				$result = False;
			}
		} else {
			$result = False;
			$id = -1;				
		}
		return Array("success"=>$result, "id"=>$id);
	}
	
}
		
?>