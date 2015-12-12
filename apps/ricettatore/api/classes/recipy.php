<?php

class Recipy extends Request {

	public function getRecipies() {	
		$query = "SELECT * FROM recipy_recipies LEFT JOIN (recipy_books) ON (recipy_books.recipy_book_id=recipy_recipies.recipy_book_id)";
		$stmt = $this->connection->prepare($query);		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		} else {
			$result = "Server error";
		}
		return $result;		
	}
	
	public function getRecipyWithId($id) {
		$query = "SELECT * FROM recipy_recipies LEFT JOIN (recipy_books) ON (recipy_books.recipy_book_id=recipy_recipies.recipy_book_id) "
		. "WHERE recipy_id=" . $id;
		$stmt = $this->connection->prepare($query);		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		} else {
			$result = "Server error";				
		}
		return $result;					
	}
	
	public function getRandomRecipy() {
		// Get number of rows
		$queryNumOfRows = "SELECT COUNT(*) FROM recipy_recipies";
		$stmt = $this->connection->prepare($queryNumOfRows);		
		if ($stmt->execute()) {
			$numOfRowsResult = $stmt->fetch(PDO::FETCH_ASSOC);
			$rows = $numOfRowsResult["COUNT(*)"];
			$randomNumber = rand(0, $rows-1);
			$recipies = $this->getRecipies();
			$randomRecipy = $recipies[$randomNumber];
			$result = true;
		} else {
			$result = false;				
		}
		return Array("success"=>$result, "recipy"=>$randomRecipy);					
	}
	
	public function searchForRecipy($string) {
		$query = "SELECT * FROM recipy_recipies JOIN recipy_books ON (recipy_recipies.recipy_book_id=recipy_books.recipy_book_id) WHERE recipy_name LIKE '%" . $string . "%'";
		$stmt = $this->connection->prepare($query);
		$result = Array();
		if ($stmt->execute()) {
			$success = true;
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		} else {
			$success = false;
		}
		return Array("success"=>$success, "result"=>$result);
	}
	
	public function updateRecipyWithId($id, $data) {
		if (! isset($data["recipy_name"])) { $data["recipy_name"] = ""; }
		if (! isset($data["recipy_book_id"])) { $data["recipy_book_id"] = NULL; }
		if (! isset($data["recipy_book_page"])) { $data["recipy_book_page"] = NULL; }
		if (! isset($data["recipy_ingredients"])) { $data["recipy_ingredients"] = NULL; }
		if (! isset($data["recipy_rating"])) { $data["recipy_rating"] = 1; }
		if (! isset($data["recipy_categories"])) { $data["recipy_categories"] = NULL; }
		$query = "UPDATE recipy_recipies SET "
		. "recipy_name=:name, recipy_book_id=:book, recipy_book_page=:bookPage, "
		."recipy_ingredients=:ingredients, recipy_rating=:rating, recipy_categories=:categories "
		. "WHERE recipy_id=:id";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":name", $data["recipy_name"]);	
		$stmt->bindValue(":book", $data["recipy_book_id"]);	
		$stmt->bindValue(":bookPage", $data["recipy_book_page"]);	
		$stmt->bindValue(":ingredients", $data["recipy_ingredients"]);	
		$stmt->bindValue(":rating", $data["recipy_rating"]);	
		$stmt->bindValue(":categories", $data["recipy_categories"]);	
		$stmt->bindValue(":id", $id);	
		if ($stmt->execute()) {
			if ($stmt->rowCount() == 1) {
				$result = true;
			} else {
				$result = false;
			}
		} else {
			$result = false;
		}
		return Array('success'=>$result, 'id'=>$id);
	}
	
	public function insert($data) {
		if (! isset($data["recipy_name"])) { $data["recipy_name"] = ""; }
		if (! isset($data["recipy_book_id"])) { $data["recipy_book_id"] = NULL; }
		if (! isset($data["recipy_book_page"])) { $data["recipy_book_page"] = NULL; }
		if (! isset($data["recipy_ingredients"])) { $data["recipy_ingredients"] = NULL; }
		if (! isset($data["recipy_rating"])) { $data["recipy_rating"] = 1; }
		if (! isset($data["recipy_categories"])) { $data["recipy_categories"] = NULL; }
		$query = "INSERT INTO recipy_recipies (recipy_name, recipy_book_id, recipy_book_page, recipy_ingredients, recipy_rating, recipy_categories) "
		. " VALUES (:name, :book, :bookPage, :ingredients, :rating, :categories)";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":name", $data["recipy_name"]);	
		$stmt->bindValue(":book", $data["recipy_book_id"]);	
		$stmt->bindValue(":bookPage", $data["recipy_book_page"]);	
		$stmt->bindValue(":ingredients", $data["recipy_ingredients"]);	
		$stmt->bindValue(":rating", $data["recipy_rating"]);	
		$stmt->bindValue(":categories", $data["recipy_categories"]);	
		$stmt->execute();
		$id = $this->connection->lastInsertId();
		if ($id > 0) {
			$result = True;
		} else {
			$result = False;
		}
		return Array('success'=>$result, 'id'=>$id);
	}
	
	public function countRecipies() {
		$rows = $this->getRecipies();
		return count($rows);
	}

}

	
?>