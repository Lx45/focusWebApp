<?php
session_start();

class Application {

    private $db;

    public function __construct(){
        $this->db = new Database;
    }

    public function addNewList($data){
        //PDO statement
        $this->db->query('INSERT INTO tasklists (listname, userid) VALUES (:listname, :userid)');

        //Bind Values
        $this->db->bind(':listname', $data['newList']);
        $this->db->bind(':userid', $data['userId']);

        // Execute
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        };
    }

    public function addNewTask($data){
        //PDO statement
        $this->db->query('INSERT INTO tasks (taskname, userid, listid) VALUES (:taskname, :userid, :listid)');

        //Bind Values
        $this->db->bind(':taskname', $data['newTask']);
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':listid', $data['activeLiId']);

        // Execute
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        };
    }

    public function taskListOverview($userId) {
        // PDO statement
        $this->db->query('SELECT * FROM tasklists WHERE status = 1 AND userid = :userid');

        //Bind values
        $this->db->bind(':userid', $userId);

        $results = $this->db->resultSet();

        //return data 
        return $results;
    }

    public function toDoListOverview($data) {
        // PDO statement
        $this->db->query('SELECT * FROM tasks WHERE status != 3 AND userid = :userid AND listid = :listid');

        //Bind values
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':listid', $data['listId']);

        $results = $this->db->resultSet();

        //return data 
        return $results;
    }

    public function deleteList($listId) {
		//PDO statement
		$this->db->query('UPDATE tasklists SET status = :status WHERE listid = :listId');
 		$this->db->bind(':status', 2);
 		$this->db->bind(':listId', $listId);
 		// $this->db->bind(':deletedOn', $timestamp);

 		//Execute
		if ($this->db->execute()) {
			return true;
		} else {
			return false;
		};
 	}

}