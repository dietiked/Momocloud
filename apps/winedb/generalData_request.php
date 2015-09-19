<?php
	require_once("../_php/config.php");
	
	$db = new PDO("mysql:host=".$host.";dbname=".$db, $user, $password, array(PDO::ATTR_PERSISTENT => true));
	
	if ($_GET["f"] == "winetypes") {
		$stmt = $db->prepare("SELECT * FROM wine_types");			
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);					
		echo json_encode($result);
	} else if ($_GET["f"] == "ratings") {
		$stmt = $db->prepare("SELECT * FROM ratings");			
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);					
		echo json_encode($result);		
	} else if ($_GET["f"] == "years") {
		$stmt = $db->prepare("SELECT * FROM years");			
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);					
		echo json_encode($result);		
	} else if ($_GET["f"] == "countries") {
		$stmt = $db->prepare("SELECT * FROM countries");			
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($result);		
	}
	
?>