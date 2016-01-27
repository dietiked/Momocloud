<?php
	
	class WinesGeneralData extends Request {
		function getWinetypes() {
			$stmt = $this->connection->prepare("SELECT * FROM wine_types");			
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);					
			return $result;			
		}
		
		function getRatings() {
			$stmt = $this->connection->prepare("SELECT * FROM ratings");			
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);					
			return $result;					
		}

		function getYears() {
			$stmt = $this->connection->prepare("SELECT * FROM years");			
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);					
			return $result;					
		}

		function getCountries() {
			$stmt = $this->connection->prepare("SELECT * FROM countries");			
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $result;		
			
		}
	}
	
	
?>