<?php
	
	include_once('PasswordHash.php');	
	include_once('../../../config.php');	
	
	class Auth {
		private $dbh;
		private $host;
		private $db;
		private $user;
		private $password;
		
		function __construct($host, $db, $user, $password) {
			$this->host = $host;
			$this->db = $db;
			$this->user = $user;
			$this->password = $password;
			$this->dbh = new PDO('mysql:host='.$host.';dbname='.$db.';charset=utf8', $user, $password, array(PDO::ATTR_PERSISTENT => true));
		}

		function _resetConnection() {
			$this->dbh = null;
			$this->dbh = new PDO('mysql:host='.$this->host.';dbname='.$this->db, $this->user, $this->password);							
		}
		
		function _response($valid, $message, $data) {
			return array('isValid'=>$valid, 'message'=>$message, 'data'=>$data);
		}
		
		function _userExists($email) {
			$stmt = $this->dbh->prepare("SELECT * FROM users WHERE email=?");
			$stmt->execute(array($email));
			if ($stmt->fetchColumn() == 0) {
				return false;
			} else {
				return true;
			}
		}
		
		function _getHash($email) {
			$stmt = $this->dbh->prepare("SELECT password FROM users WHERE email=?");
			$stmt->execute(array($email));
			$hash = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $hash[0]['password'];
		}
		
		function _insertUser($email, $password) {
			$passwordEncrypted = create_hash($password);
			$stmt = $this->dbh->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
			$stmt->execute(array($email, $passwordEncrypted));
			$id = $this->dbh->lastInsertId();
			if ($id > 0) {
				return $this->_response(true, 'User successfully created', array('id'=>$id));
			} else {
				return $this->_response(false, 'Cannot create user', array());
			}			
		}

		function subscribe($email, $password) {
			if (! $this->_userExists($email)) { // User does not exist
				return $this->_insertUser($email, $password);
			} else {
				return $this->_response(false, 'User already exists', array());
			}
		}
		
		
		function login($email, $password) {
			if ($this->_userExists($email)) {
				$hash = $this->_getHash($email);
				$valid = validate_password($password, $hash);
				if ($valid) {
					return $this->_response(true, 'User is logged in', array());				
				} else {
					return $this->_response(false, 'Wrong password', array());									
				}
			} else {
				return $this->_response(false, 'User does not exist', array());
			}
		}
	}

	try {
		$connection = new Auth($host, $db, $user, $password);		
	} catch (PDOException $e) {
		echo 'Error while connecting';
	}
	if ($_GET['f'] == 'subscribe')
		$result = $connection->subscribe($_POST['email'], $_POST['password']);
	else if ($_GET['f'] == 'login')
		$result = $connection->login($_POST['email'], $_POST['password']);
	
	echo json_encode($result);

?>