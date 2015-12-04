<?php
	require_once("../../_php/config.php");
	require_once("../../_php/request.php");
	
	class RecipyCategoryRequest extends Request {
		
		private $selectQuery = "SELECT * FROM recipy_categories";
		private $updateQuery = "UPDATE recipy_categories SET recipy_category_name=:catName WHERE recipy_category_id=:catId";
		private $insertQuery = "INSERT INTO recipy_categories (recipy_category_name) VALUES (:catName)";
		
		public function getCategories() {	
			$stmt = $this->connection->prepare($this->selectQuery);		
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			} else {
				$result = "Server error";
			}
			return $result;		
		}
		
		public function getCategoryWithId($id) {
			$query = $this->selectQuery . " WHERE recipy_category_id=". $id;
			$stmt = $this->connection->prepare($query);		
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			} else {
				$result = "Server error";				
			}
			return $result;					
		}
		
		public function updateCategoryWithId($data) {
			$stmt = $this->connection->prepare($this->updateQuery);
			$stmt->bindValue(":catName", $data["recipy_category_name"]);	
			$stmt->bindValue(":catId", $data["recipy_category_id"]);	
			if ($stmt->execute()) {
				$result = $stmt->rowCount();
			} else {
				$result = 0;
			}
			return $result;			
		}
		
		public function insertCategory($data) {
			$stmt = $this->connection->prepare($this->insertQuery);
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
	
		
	$request = new RecipyCategoryRequest($host, $db, $user, $password);
	
	if ($_GET["f"] == "get") {
		if (isset($_GET["id"])) {
			$id = $_GET["id"];
			$result = $request->getCategoryWithId($id);
		} else {
			$result = $request->getCategories();
		}
		echo json_encode($result);
		
	} else if ($_GET["f"] == "update") {
		$result = $request->updateCategoryWithId($_POST);
		echo(json_encode(Array('success'=>$result)));	
		
	} else if ($_GET["f"] == "insert") {
		$result = $request->insertCategory($_POST);
		echo(json_encode($result));
			
	} else if ($_GET["f"] == "countRecipyCategories") {
		$numberOfWines = $request->countCategories();
		echo(json_encode(Array('numberOfCategories'=>$numberOfWines)));
	}
	
?>