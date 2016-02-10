<?php

use \Firebase\JWT\JWT;

	class Auth extends Request {

		private $secret = "1EOPI-3-EqLkdErPT-V36oEnKg5vbZwwj7vLpYZ_mxjojRFUw3QhsfyTOPlTE3Dr";
		private $algorithm = "HS512";

		private function _response($valid, $message, $data) {
			return array('isValid'=>$valid, 'message'=>$message, 'data'=>$data);
		}

		private function _generateToken($email) {
				$issuedAt = time();
				$expire = $issuedAt + (30 * 60);
				$data = [
					'iat' => $issuedAt,
					'exp' => $expire,
					'data' => [
						'user' => $email
					]
				];

				$jwt = JWT::encode($data, $this->secret, $this->algorithm);
				$token = ["jwt" => $jwt];

				return json_encode($token);
		}

		private function _userExists($email) {
			$stmt = $this->connection->prepare("SELECT * FROM users WHERE email=?");
			$stmt->execute(array($email));
			if ($stmt->fetchColumn() == 0) {
				return false;
			} else {
				return true;
			}
		}

		private function _getHash($email) {
			$stmt = $this->connection->prepare("SELECT password FROM users WHERE email=:mail");
			$stmt->bindValue(":mail", $email);
			$stmt->execute();
			$hash = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $hash[0]['password'];
		}

		private function _insertUser($email, $password) {
			$passwordEncrypted = create_hash($password);
			$stmt = $this->connection->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
			$stmt->execute(array($email, $passwordEncrypted));
			$id = $this->connection->lastInsertId();
			if ($id > 0) {
				return $this->_response(true, 'User successfully created', array('id'=>$id));
			} else {
				return $this->_response(false, 'Cannot create user', array());
			}
		}

		public function subscribe($email, $password) {
			if (! $this->_userExists($email)) { // User does not exist
				return $this->_insertUser($email, $password);
			} else {
				return $this->_response(false, 'User already exists', array());
			}
		}


		public function login($email, $password) {
			if ($this->_userExists($email)) {
				$hash = $this->_getHash($email);
				$valid = validate_password($password, $hash);
				$token = "";
				if ($valid) {
					$success = True;
					$result = "User is logged in";
					$token = $this->_generateToken($email);
					//return $this->_response(true, 'User is logged in', array());
				} else {
					$success = False;
					$result = "Wrong password";
					//return $this->_response(false, 'Wrong password', array());
				}
			} else {
				$success = False;
				$result = "User does not exist";
				//return $this->_response(false, 'User does not exist', array());
			}
			return Array("success"=>$success, "result"=>$result, "token" =>$token);
		}
	}

	/*try {
		$connection = new Auth($host, $db, $user, $password);
	} catch (PDOException $e) {
		echo 'Error while connecting';
	}
	if ($_GET['f'] == 'subscribe')
		$result = $connection->subscribe($_POST['email'], $_POST['password']);
	else if ($_GET['f'] == 'login')
		$result = $connection->login($_POST['email'], $_POST['password']);

	echo json_encode($result);
	*/

?>
