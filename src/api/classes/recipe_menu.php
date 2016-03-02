<?php


class RecipeMenu extends Request {

	function getAll() {
		$query = "SELECT * FROM recipe_menus ORDER BY -recipe_menu_id";
		$stmt = $this->connection->prepare($query);
		if ($stmt->execute()) {
			$success = true;
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			for ($i=0; $i<count($result); $i++) {
				$recipesForMenu = $this->getRecipiesForMenuWithId($result[$i]["recipe_menu_id"]);
				$result[$i]["recipies"] = $recipesForMenu["result"]["recipies"];
			}
		} else {
			$success = false;
			$result = Array();
		}
		return Array("success"=>$success, "result"=>$result);
	}

	function _getQueryForAvailableRecipiesForMenu($id) {
		$menuRecipiesResult = $this->getRecipiesForMenuWithId($id);
		if ($menuRecipiesResult["success"]) {
			$menuRecipies = $menuRecipiesResult["result"]["recipies"];
			$exclusionQuery = " ";
			for ($i=0; $i<count($menuRecipies); $i++) {
				if ($i==0) {
					$exclusionQuery .= "WHERE NOT";
				}
				$menuRecipe = $menuRecipies[$i];
				$menuRecipeId = $menuRecipe["recipe_id"];
				$exclusionQuery .= " recipe_id=" .$menuRecipeId;
				if ($i!=(count($menuRecipies)-1)) {
					$exclusionQuery .= " AND NOT";
				}
			}
		}
		return $exclusionQuery;
	}

	function getAvailableRecipiesForMenu($id) {
		$query = "SELECT * FROM recipe_recipies LEFT JOIN recipe_books ON recipe_recipies.recipe_book_id=recipe_books.recipe_book_id"
		. $this->_getQueryForAvailableRecipiesForMenu($id);
		$stmt = $this->connection->prepare($query);
		if ($stmt->execute()) {
			$success = true;
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		} else {
			$success = false;
			$result = Array();
		}
		return Array("success"=>$success, "result"=>$result);
	}

	function getRecipiesForMenuWithId($id) {
		$query = "SELECT * FROM recipe_menus WHERE recipe_menu_id=:id";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":id", $id);
		if ($stmt->execute()) {
			$success = true;
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
			$recipiesQuery = "SELECT * FROM recipe_recipies "
			. "JOIN recipe_menus_recipies "
			. "ON recipe_menus_recipies.recipe_id=recipe_recipies.recipe_id "
			. "LEFT JOIN recipe_books "
			. "ON recipe_recipies.recipe_book_id=recipe_books.recipe_book_id "
			. "WHERE recipe_menu_id=" . $id;
			$recipiesStmt = $this->connection->prepare($recipiesQuery);
			if ($recipiesStmt->execute()) {
				$recipies = $recipiesStmt->fetchAll(PDO::FETCH_ASSOC);
				$result["recipies"] = $recipies;
			} else {
				$result = Array();
			}
		} else {
			$success = false;
			$result = Array();
		}
		return Array("success"=>$success, "result"=>$result);
	}

	function insertMenu() {
		$query = "INSERT INTO recipe_menus () VALUES ()";
		$stmt = $this->connection->prepare($query);
		$stmt->execute();
		$id = $this->connection->lastInsertId();
		if ($id > 0) {
			$result = True;
		} else {
			$result = False;
		}
		return Array('success'=>$result, 'id'=>$id);
	}

	function addRecipeToMenu($recipeId, $menuId) {
		$query = "INSERT INTO recipe_menus_recipies (recipe_id, recipe_menu_id) VALUES (:recipeId, :menuId)";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":recipeId", $recipeId);
		$stmt->bindValue(":menuId", $menuId);
		$stmt->execute();
		$id = $this->connection->lastInsertId();
		if ($id > 0) {
			$result = True;
		} else {
			$result = False;
		}
		return Array('success'=>$result, 'id'=>$id);
	}

	public function removeRecipeFromMenu($recipeId, $menuId) {
		$deleteQuery = "DELETE FROM recipe_menus_recipies WHERE recipe_id=:recipeId AND recipe_menu_id=:menuId";
		$deleteStmt = $this->connection->prepare($deleteQuery);
		$deleteStmt->bindValue(":recipeId", $recipeId);
		$deleteStmt->bindValue(":menuId", $menuId);
		$result = null;
		if ($deleteStmt->execute()) {
			$success = true;
		} else {
			$success = false;
		}
		return Array('success'=>$success, 'result'=>$result);

	}

}


?>
