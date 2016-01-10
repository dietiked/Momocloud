<?php
	
class LibraryBook extends Request {
	
	function getBooks() {
		$query = "SELECT * FROM library_books";
		$stmt = $this->connection->prepare($query);
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			$success = True;
		} else {
			$success = False;
			$result = -1;
		}
		return Array("success"=>$success, "result"=>$result);		
	}

	function addBookToLibrary($book) {
		if (! isset($book["title"])) { $book["title"] = "";}
		if (! isset($book["authors"])) { $book["authors"] = "";}
		if (! isset($book["categories"])) { $book["categories"] = "";}
		if (! isset($book["language"])) { $book["language"] = "";}
		if (! isset($book["ISBN10"])) { $book["ISBN10"] = "";}
		if (! isset($book["ISBN13"])) { $book["ISBN13"] = "";}
		if (! isset($book["publisher"])) { $book["publisher"] = "";}
		if (! isset($book["publisher_data"])) { $book["publisher_data"] = "";}
		if (! isset($book["thumbnail"])) { $book["thumbnail"] = "";}
		if (! isset($book["source_name"])) { $book["source_name"] = "";}
		if (! isset($book["source_id"])) { $book["source_id"] = "";}
		$query = "INSERT INTO library_books "
		. "(title, authors, categories, language, ISBN10, ISBN13, publisher, published_data, thumbnail, source_name, source_id) "
		. "VALUES (:title, :authors, :categories, :language, :ISBN10, :ISBN13, :publisher, :publisher_data, :thumbnail, :source_name, :source_id)";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":title", $book["title"]);	
		$stmt->bindValue(":authors", $book["authors"]);	
		$stmt->bindValue(":categories", $book["categories"]);	
		$stmt->bindValue(":language", $book["language"]);	
		$stmt->bindValue(":ISBN10", $book["ISBN10"]);	
		$stmt->bindValue(":ISBN13", $book["ISBN13"]);	
		$stmt->bindValue(":publisher", $book["publisher"]);	
		$stmt->bindValue(":publisher_data", $book["publisher_data"]);	
		$stmt->bindValue(":thumbnail", $book["thumbnail"]);	
		$stmt->bindValue(":source_name", $book["source_name"]);	
		$stmt->bindValue(":source_id", $book["source_id"]);	
		if ($stmt->execute()) {
			$result = $this->connection->lastInsertId();
			if ($result > 0) {
				$success = True;
			} else {
				$success = False;
			}
		} else {
			$success = False;
			$result = -1;
		}
		return Array("success"=>$success, "result"=>$result);		
	}
}

?>