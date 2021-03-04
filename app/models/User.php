<?php
session_start();

class User {

    private $db;

    public function __construct(){
        $this->db = new Database;
    }

    public function user_add($data){
        // PDO statement
        $this->db->query('INSERT INTO users (gender, firstname, lastname, username, birthdate, email, password) VALUES (:gender, :firstname, :lastname, :username, :birthdate, :email, :password)');

        //Bind values
        $this->db->bind(':gender', $data['gender']);
        $this->db->bind(':firstname', $data['name']);
        $this->db->bind(':lastname', $data['lastname']);
        $this->db->bind(':username', $data['username']);
        $this->db->bind(':birthdate', $data['birthdate']);
        $this->db->bind(':email', $data['email']);
        $this->db->bind(':password', $data['password']);

        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        };
    }

    public function login($email, $password) {
         		//PDO statement
 		$this->db->query('SELECT * FROM users WHERE email = :email');
 		
 		//Bind values
 		$this->db->bind(':email', $email);
 		$row = $this->db->single();

 		//Push password from database into variable
 		$hashed_password = $row['password'];

 		//Check if password is correct
 		if (password_verify($password, $hashed_password)) {
 			//Return data
 			return $row;
 		} else {
 			return false;
 		}
    }

    public function findUserByEmail($email){
        //PDO Statement
        $this->db->query('SELECT * FROM users WHERE email = :email');

        // Bind values
        $this->db->bind(':email', $email);
        $this->db->single();
        $row = $this->db->single();

        // Check row
        if ($this->db->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }
}