<?php

	class Request {
		public $host;
		public $database;
		public $user;
		public $password;
		protected $connection;
		
		public function __construct($host, $database, $user, $password) {
			$this->host = $host;
			$this->database = $database;
			$this->user = $user;
			$this->password = $password;
			$this->connection = new PDO("mysql:host=".$this->host.";dbname=".$this->database, $this->user, $this->password, array(PDO::ATTR_PERSISTENT => true));
		}
	}

	
?>