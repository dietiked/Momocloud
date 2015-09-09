<?php
	require_once("../../../config.php");
	require_once("../../../request.php");
	
	class WineRequest extends Request {
		
		private $selectQuery = "SELECT * FROM wines JOIN (wine_producers, wine_types) ON (wines.producer_id=wine_producers.producer_id AND wines.winetype_id=wine_types.winetype_id)";
		private $updateQuery = "UPDATE wines SET wine_name=:wineName, producer_id=:prodId, wine_alcohol=:wineAlcohol, wine_grapes=:wineGrapes, winetype_id=:winetypeId, wine_notes=:wineNotes WHERE wine_id=:wineId";
		private $insertQuery = "INSERT INTO wines (wine_name, producer_id, winetype_id, wine_alcohol, wine_grapes, wine_notes) VALUES (:wineName, :producerId, :winetypeId, :wineAlcohol, :wineGrapes, :wineNotes)";
		
		public function getWines() {	
			$stmt = $this->connection->prepare($this->selectQuery);		
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			} else {
				$result = "Server error";
			}
			return $result;		
		}
		
		public function getWineWithId($id) {
			$query = $this->selectQuery . " WHERE wine_id=". $id;
			$stmt = $this->connection->prepare($query);		
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			} else {
				$result = "Server error";				
			}
			return $result;					
		}
		
		public function updateWineWithId($data) {
			$stmt = $this->connection->prepare($this->updateQuery);
			$stmt->bindValue(":wineName", $data["wine_name"]);	
			$stmt->bindValue(":prodId", $data["producer_id"]);	
			$stmt->bindValue(":wineAlcohol", $data["wine_alcohol"]);	
			$stmt->bindValue(":wineGrapes", $data["wine_grapes"]);	
			$stmt->bindValue(":winetypeId", $data["winetype_id"]);	
			$stmt->bindValue(":wineNotes", $data["wine_notes"]);	
			$stmt->bindValue(":wineId", $data["wine_id"]);	
			if ($stmt->execute()) {
				$result = $stmt->rowCount();
			} else {
				$result = 0;
			}
			return $result;			
		}
		
		public function insertWine($data) {
			$stmt = $this->connection->prepare($this->insertQuery);
			$stmt->bindValue(":wineName", $data["wine_name"]);	
			$stmt->bindValue(":producerId", $data["producer_id"]);	
			$stmt->bindValue(":winetypeId", $data["winetype_id"]);	
			$stmt->bindValue(":wineAlcohol", $data["wine_alcohol"]);	
			$stmt->bindValue(":wineGrapes", $data["wine_grapes"]);	
			$stmt->bindValue(":wineNotes", $data["wine_notes"]);	
			$stmt->execute();
			$id = $this->connection->lastInsertId();
			if ($id > 0) {
				$result = True;
			} else {
				$result = False;
			}
			return Array('success'=>$result, '$id'=>$id);
		}
		
		public function countWines() {
			$wines = $this->getWines();
			return count($wines);
		}
	}
	
		
	$request = new WineRequest($host, $db, $user, $password);
	
	if ($_GET["f"] == "get") {
		if (isset($_GET["id"])) {
			$id = $_GET["id"];
			$result = $request->getWineWithId($id);
		} else {
			$result = $request->getWines();
		}
		echo json_encode($result);
		
	} else if ($_GET["f"] == "update") {
		$result = $request->updateWineWithId($_POST);
		echo(json_encode(Array('success'=>$result)));	
		
	} else if ($_GET["f"] == "insert") {
		$result = $request->insertWine($_POST);
		echo(json_encode($result));
			
	} else if ($_GET["f"] == "countWines") {
		$numberOfWines = $request->countWines();
		echo(json_encode(Array('numberOfWines'=>$numberOfWines)));
	}
	
?>