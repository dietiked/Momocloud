<?php

class Recipe extends Request {

	public function getRecipies() {	
		$query = "SELECT * FROM recipe_recipies LEFT JOIN (recipe_books) ON (recipe_books.recipe_book_id=recipe_recipies.recipe_book_id)";
		$stmt = $this->connection->prepare($query);		
		if ($stmt->execute()) {
			$success = true;
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		} else {
			$success = false;
			$result = Array();
		}
		return Array("success"=>$result, "result"=>$result);					
	}
	
	public function getRecipeWithId($id) {
		$query = "SELECT * FROM recipe_recipies LEFT JOIN (recipe_books) ON (recipe_books.recipe_book_id=recipe_recipies.recipe_book_id) "
		. "WHERE recipe_id=" . $id;
		$stmt = $this->connection->prepare($query);		
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
		} else {
			$result = "Server error";				
		}
		return $result;					
	}
	
	public function getRandomRecipe() {
		// Get number of rows
		$queryNumOfRows = "SELECT COUNT(*) FROM recipe_recipies";
		$stmt = $this->connection->prepare($queryNumOfRows);		
		if ($stmt->execute()) {
			$numOfRowsResult = $stmt->fetch(PDO::FETCH_ASSOC);
			$rows = $numOfRowsResult["COUNT(*)"];
			$randomNumber = rand(0, $rows-1);
			$recipies = $this->getRecipies();
			$randomRecipe = $recipies["result"][$randomNumber];
			$result = true;
		} else {
			$result = false;				
		}
		return Array("success"=>$result, "recipe"=>$randomRecipe);					
	}
	
	public function searchForRecipe($string) {
		$query = "SELECT * FROM recipe_recipies JOIN recipe_books ON (recipe_recipies.recipe_book_id=recipe_books.recipe_book_id) WHERE recipe_name LIKE '%" . $string . "%'";
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
	
	public function updateRecipeWithId($id, $data) {
		if (! isset($data["recipe_name"])) { $data["recipe_name"] = ""; }
		if (! isset($data["recipe_book_id"])) { $data["recipe_book_id"] = NULL; }
		if (! isset($data["recipe_book_page"])) { $data["recipe_book_page"] = NULL; }
		if (! isset($data["recipe_ingredients"])) { $data["recipe_ingredients"] = NULL; }
		if (! isset($data["recipe_rating"])) { $data["recipe_rating"] = 1; }
		if (! isset($data["recipe_categories"])) { $data["recipe_categories"] = NULL; }
		$query = "UPDATE recipe_recipies SET "
		. "recipe_name=:name, recipe_book_id=:book, recipe_book_page=:bookPage, "
		."recipe_ingredients=:ingredients, recipe_rating=:rating, recipe_categories=:categories "
		. "WHERE recipe_id=:id";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":name", $data["recipe_name"]);	
		$stmt->bindValue(":book", $data["recipe_book_id"]);	
		$stmt->bindValue(":bookPage", $data["recipe_book_page"]);	
		$stmt->bindValue(":ingredients", $data["recipe_ingredients"]);	
		$stmt->bindValue(":rating", $data["recipe_rating"]);	
		$stmt->bindValue(":categories", $data["recipe_categories"]);	
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
		if (! isset($data["recipe_name"])) { $data["recipe_name"] = ""; }
		if (! isset($data["recipe_book_id"])) { $data["recipe_book_id"] = NULL; }
		if (! isset($data["recipe_book_page"])) { $data["recipe_book_page"] = NULL; }
		if (! isset($data["recipe_ingredients"])) { $data["recipe_ingredients"] = NULL; }
		if (! isset($data["recipe_rating"])) { $data["recipe_rating"] = 1; }
		if (! isset($data["recipe_categories"])) { $data["recipe_categories"] = NULL; }
		$query = "INSERT INTO recipe_recipies (recipe_name, recipe_book_id, recipe_book_page, recipe_ingredients, recipe_rating, recipe_categories) "
		. " VALUES (:name, :book, :bookPage, :ingredients, :rating, :categories)";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":name", $data["recipe_name"]);	
		$stmt->bindValue(":book", $data["recipe_book_id"]);	
		$stmt->bindValue(":bookPage", $data["recipe_book_page"]);	
		$stmt->bindValue(":ingredients", $data["recipe_ingredients"]);	
		$stmt->bindValue(":rating", $data["recipe_rating"]);	
		$stmt->bindValue(":categories", $data["recipe_categories"]);	
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