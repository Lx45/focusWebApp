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
        $this->db->query('INSERT INTO tasks (taskname, userid, listid, date) VALUES (:taskname, :userid, :listid, :date)');

        //Bind Values
        $this->db->bind(':taskname', $data['newTask']);
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':listid', $data['activeLiId']);
        $this->db->bind(':date', $data['date']);

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


    public function toDoListOverviewWeek($data, $mon, $tue, $wed, $thu, $fri, $sat, $sun) {
        // PDO statement
        $this->db->query('SELECT * FROM tasks WHERE status != 3 AND userid = :userid AND date = :mon OR date= :tue OR date= :wed OR date= :thu OR date= :fri OR date= :sat OR date= :sun' );

        //Bind values
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':mon', $mon);
        $this->db->bind(':tue', $tue);
        $this->db->bind(':wed', $wed);
        $this->db->bind(':thu', $thu);
        $this->db->bind(':fri', $fri);
        $this->db->bind(':sat', $sat);
        $this->db->bind(':sun', $sun);

        $results = $this->db->resultSet();

        //return data 
        return $results;
    }

    public function toDoListOverview($data) {
        // PDO statement
        $this->db->query('SELECT * FROM tasks WHERE status != 3 AND userid = :userid AND listid = :listid AND date = :date' );

        //Bind values
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':listid', $data['listId']);
        $this->db->bind(':date', $data['date']);

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