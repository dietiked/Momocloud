<?php
	
	class Producer extends Request {
		
		private $selectQuery = "SELECT * FROM wine_producers JOIN (countries) ON (wine_producers.country_code=countries.country_code)";

		function getProducers() {
			$stmt = $this->connection->prepare($this->selectQuery);		
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			} else {
				$result = "Server error";
			}
			return $result;					
		}
		
		function getProducerWithId($id) {
			$query = $this->selectQuery . " WHERE producer_id=". $id;
			$stmt = $this->connection->prepare($query);		
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			} else {
				$result = "Server error";				
			}
			return $result;								
		}
		
		function updateProducerWithId($id, $data) {
			$query = "UPDATE wine_producers " 
			. "SET producer_name=:prodName, producer_location=:prodLocation, country_code=:countryCode, producer_region=:prodRegion " 
			. "WHERE producer_id=:prodId";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(":prodName", $data["producer_name"]);	
			$stmt->bindValue(":prodLocation", $data["producer_location"]);	
			$stmt->bindValue(":countryCode", $data["country_code"]);	
			$stmt->bindValue(":prodRegion", $data["producer_region"]);	
			$stmt->bindValue(":prodId", $id);	
			if ($stmt->execute()) {
				$result = $stmt->rowCount();
			} else {
				$result = 0;
			}
			return Array("success"=>$result);						
		}
		
		function deleteProducerWithId($id) {
			
		}
		
		function insertProducer($data) {
			$query = "INSERT INTO wine_producers (producer_name, producer_location, producer_region, country_code) "
			. "VALUES (:prodName, :prodLocation, :prodRegion,:countryCode)";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(":prodName", $data["producer_name"]);	
			$stmt->bindValue(":prodLocation", $data["producer_location"]);	
			$stmt->bindValue(":prodRegion", $data["producer_region"]);	
			$stmt->bindValue(":countryCode", $data["country_code"]);	
			$stmt->execute();
			$id = $this->connection->lastInsertId();
			if ($id > 0) {
				$result = True;
			} else {
				$result = False;
			}
			return Array("success"=>$result, "id"=>$id);			
		}
		
		function getProducerWithIdWithWines($id) {
			$result = $this->getProducerWithId($id);			
			$query = "SELECT * FROM wines JOIN (wine_types) ON (wines.winetype_id=wine_types.winetype_id) "
			."WHERE producer_id=" . $id;
			$stmt = $this->connection->prepare($query);		
			if ($stmt->execute()) {
				$wines = $stmt->fetchAll(PDO::FETCH_ASSOC);			
				$result[0]["wines"] = $wines;
			} else {
				$result = "Server error";				
			}
			return $result;											
		}
	}

?>