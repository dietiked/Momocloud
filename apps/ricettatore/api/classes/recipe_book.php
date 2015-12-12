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
			} else {
				$result = "Server error";				
			}
			return $result;					
		}
		
		public function updateBookWithId($id, $data) {
			$query = "UPDATE recipe_books SET recipe_book_title=:bookName, recipe_book_author=:bookAuthor WHERE recipe_book_id=:bookID";
			$stmt = $this->connection->prepare($query);
			$stmt->bindValue(":bookName", $data["recipe_book_title"]);	
			$stmt->bindValue(":bookAuthor", $data["recipe_book_author"]);	
			$stmt->bindValue(":bookID", $id);	
			if ($stmt->execute()) {
				$result = $stmt->rowCount();
			} else {
				$result = 0;
			}
			return $result;			
		}
		
		public function insertBook($data) {
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
	}
	
?>
	