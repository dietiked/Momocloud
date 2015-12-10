<?php

	class RecipyCategory extends Request {
		
		public function getCategories() {	
			$query = "SELECT * FROM recipy_categories";
			$stmt = $this->connection->prepare($query);		
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			} else {
				$result = "Server error";
			}
			return $result;		
		}
		
		public function getCategoryWithId($id) {
			$query = "SELECT * FROM recipy_categories WHERE recipy_category_id=". $id;
			$stmt = $this->connection->prepare($query);		
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			} else {
				$result = "Server error";				
			}
			return $result;					
		}
		
		public function updateCategoryWithId($id, $data) {
			$query = "UPDATE recipy_categories SET recipy_category_name=:catName WHERE recipy_category_id=:catId";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(":catName", $data["recipy_category_name"]);	
			$stmt->bindValue(":catId", $id);	
			if ($stmt->execute()) {
				$result = $stmt->rowCount();
			} else {
				$result = 0;
			}
			return $result;			
		}
		
		public function insertCategory($data) {
			$query = "INSERT INTO recipy_categories (recipy_category_name) VALUES (:catName)";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(":catName", $data["recipy_category_name"]);	
			$stmt->execute();
			$id = $this->connection->lastInsertId();
			if ($id > 0) {
				$result = True;
			} else {
				$result = False;
			}
			return Array('success'=>$result, 'id'=>$id);
		}
		
		public function countCategories() {
			$rows = $this->getCategories();
			return count($rows);
		}
	}
	
?>
	