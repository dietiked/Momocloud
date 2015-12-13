<?php
	

class RecipeMenu extends Request {

	function getAll() {
		$query = "SELECT * FROM recipe_menus ORDER BY -recipe_menu_id";
		$stmt = $this->connection->prepare($query);
		if ($stmt->execute()) {
			$success = true;
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			for ($i=0; $i<count($result); $i++) {
				$query2 = "SELECT * FROM recipe_menus_recipies JOIN (recipe_recipies) ON recipe_menus_recipies.recipe_id=recipe_recipies.recipe_id"
				. " WHERE recipe_menu_id=" . $result[$i]["recipe_menu_id"];
				$stmt2 = $this->connection->prepare($query2);
				$stmt2->execute();
				$result2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
				$result[$i]["recipies"] = $result2;
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
			$menuRecipies = $menuRecipiesResult["result"];
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
		$query = "SELECT * FROM recipe_recipies" . $this->_getQueryForAvailableRecipiesForMenu($id);
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
		$query = "SELECT * FROM recipe_menus_recipies JOIN (recipe_recipies) ON (recipe_recipies.recipe_id=recipe_menus_recipies.recipe_id)"
		. " WHERE recipe_menu_id=:id";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":id", $id);	
		if ($stmt->execute()) {
			$success = true;	
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
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

}

	
?>