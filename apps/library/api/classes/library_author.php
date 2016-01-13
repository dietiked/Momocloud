<?php
	
class LibraryAuthor extends Request {
	
	function getAuthors() {
		$query = "SELECT authors, COUNT(*) FROM library_books GROUP BY authors";
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
	
	function getBooksForAuthor($authorDescr) {
		$query = "SELECT * FROM library_books WHERE authors=:authors";
		$stmt = $this->connection->prepare($query);
		$stmt->bindValue(":authors", $authorDescr);	
		if ($stmt->execute()) {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);			
			$success = True;
		} else {
			$success = False;
			$result = -1;
		}
		return Array("success"=>$success, "result"=>$result);				
	}
}

?>