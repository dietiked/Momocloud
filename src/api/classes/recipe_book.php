<?php

	class RecipeBook extends Request {

		public function getBooks() {
			$query = "SELECT * FROM recipe_books";
			$stmt = $this->connection->prepare($query);
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			} else {
				$result = "Server error";
			}
			return $result;
		}

		public function getBookWithId($id) {
			$query = "SELECT * FROM recipe_books WHERE recipe_book_id=". $id;
			$stmt = $this->connection->prepare($query);
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$success = true;
			} else {
				$success = false;
				$result = "Server error";
			}
			return Array('success'=>$success, 'result'=>$result);
		}

		public function updateBookWithId($id, $data) {
			if (! isset($data["recipe_book_title"])) { $data["recipe_book_title"] = ""; }
			if (! isset($data["recipe_book_author"])) { $data["recipe_book_author"] = ""; }
			$query = "UPDATE recipe_books SET recipe_book_title=:bookName, recipe_book_author=:bookAuthor WHERE recipe_book_id=:bookID";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(":bookName", $data["recipe_book_title"]);
			$stmt->bindValue(":bookAuthor", $data["recipe_book_author"]);
			$stmt->bindValue(":bookID", $id);
			if ($stmt->execute()) {
				$success = true;
			} else {
				$success = false;
			}
			return Array('success'=>$success, 'result'=>$id);
		}

		public function insertBook($data) {
			if (! isset($data["recipe_book_author"])) {$data["recipe_book_author"] = ""; }
			$query = "INSERT INTO recipe_books (recipe_book_title, recipe_book_author) VALUES (:bookName, :bookAuthor)";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(":bookName", $data["recipe_book_title"]);
			$stmt->bindValue(":bookAuthor", $data["recipe_book_author"]);
			$stmt->execute();
			$id = $this->connection->lastInsertId();
			if ($id > 0) {
				$result = True;
			} else {
				$result = False;
			}
			return Array('success'=>$result, 'id'=>$id);
		}

		public function countBooks() {
			$rows = $this->getBooks();
			return count($rows);
		}

		public function getRecipesForBookWithId($id) {
			$query = "SELECT * FROM recipe_recipies "
			. "JOIN recipe_books ON recipe_recipies.recipe_book_id=recipe_books.recipe_book_id "
			. "WHERE recipe_recipies.recipe_book_id=". $id;
			$stmt = $this->connection->prepare($query);
			if ($stmt->execute()) {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$success = true;
			} else {
				$success = false;
				$result = "Server error";
			}
			return Array('success'=>$success, 'result'=>$result);
		}

	}

?>
