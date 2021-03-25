<?php  
	/**
	 * PDO Database Class
	 * Connect to database
	 * Create prepared statements
	 * Bind values
	 * Return rows and results
	 */

	class Database {
		// private $host = DB_HOST;
		// private $user = DB_USER;
		// private $pass = DB_PASS;
		// private $dbname = DB_NAME;
		//Get Heroku ClearDB connection information
	    private $cleardb_url;
		private $cleardb_server;
		private $cleardb_username;
		private $cleardb_password;
		private $cleardb_db; 

		private $active_group = 'default';
		private $query_builder = TRUE;

		private $dbh;
		private $stmt;
		private $error;

		public function __construct(){
			//Set DSN
			$this->cleardb_url = parse_url(getenv("CLEARDB_DATABASE_URL"));
			$this->cleardb_server = $cleardb_url["host"];
			$this->cleardb_username = $cleardb_url["user"];
			$this->cleardb_password = $cleardb_url["pass"];
			$this->cleardb_db = substr($cleardb_url["path"],1);

			
			$dsn = 'mysql:host=' . $this->$cleardb_server . ';dbname=' . $this->cleardb_db;
			$options = array(
				PDO::ATTR_PERSISTENT => true,
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
			);


			// Create PDO instance
			try {
				$this->dbh = new PDO($dsn, $this->cleardb_username, $this->cleardb_password, $options);
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




