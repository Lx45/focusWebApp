<?php  
	/**
	 * PDO Database Class
	 * Connect to database
	 * Create prepared statements
	 * Bind values
	 * Return rows and results
	 */

	class Database {
		private $host = "eu-cdbr-west-01.cleardb.com";
		private $user = "b57bd5586f6ac0";
		private $pass = "685da7de";
		private $dbname = "heroku_37b8f8cc55d2256";

		private $dbh;
		private $stmt;
		private $error;

		public function __construct(){
			//Set DSN
			$dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
			$options = array(
				PDO::ATTR_PERSISTENT => true,
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
			);


			// Create PDO instance
			try {
				$this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
			} catch (PDOException $e) {
				$this->error = $e->getMessage();
				echo $this->error;
			}
		}


		// Prepare statement with query
		public function query($sql){
			$this->stmt = $this->dbh->prepare($sql);
		}


		// Bind values
		public function bind($param, $value, $type = null){
			if(is_null($type)){
				switch (true) {
					case is_int($value):
						$type = PDO::PARAM_INT;
						break;
					case is_bool($value):
						$type = PDO::PARAM_BOOL;
						break;
					case is_null($value):
						$type = PDO::PARAM_NULL;
						break;
					default:
						$type = PDO::PARAM_STR;
				}
			}

			$this->stmt->bindValue($param, $value, $type);
		}


		//Execute the prepared statement
		public function execute(){
			return $this->stmt->execute();
		}

		// Get result set as array of objects
		public function resultSet(){
			$this->execute();
			return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
		}


		// Get single record as object
		public function single(){
			$this->execute();
			return $this->stmt->fetch(PDO::FETCH_ASSOC);
		}


		// Get row count
		public function rowCount(){
			return $this->stmt->rowCount();
		}
	}




