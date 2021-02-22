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
        $this->db->query('SELECT * FROM tasks WHERE status != 3 AND userid = :userid AND listid = :listid AND (date = :mon OR date= :tue OR date= :wed OR date= :thu OR date= :fri OR date= :sat OR date= :sun)' );
        error_log($data['listId']);
        //Bind values
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':listid', $data['listId']);
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

     public function finishedTask($taskId, $done) {
		//PDO statement
		$this->db->query('UPDATE tasks SET done = :done WHERE taskid = :taskId');
 		$this->db->bind(':done', $done);
 		$this->db->bind(':taskId', $taskId);
 		// $this->db->bind(':deletedOn', $timestamp);

 		//Execute
		if ($this->db->execute()) {
			return true;
		} else {
			return false;
		};
     }
     
     public function countFinishedTasks($data, $mon, $tue, $wed, $thu, $fri, $sat, $sun) {
        // PDO statement
        $this->db->query('SELECT * FROM tasks WHERE status != 3 AND userid = :userid AND (date = :mon OR date= :tue OR date= :wed OR date= :thu OR date= :fri OR date= :sat OR date= :sun) AND done = :done' );
        
        //Bind values
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':mon', $mon);
        $this->db->bind(':tue', $tue);
        $this->db->bind(':wed', $wed);
        $this->db->bind(':thu', $thu);
        $this->db->bind(':fri', $fri);
        $this->db->bind(':sat', $sat);
        $this->db->bind(':sun', $sun);
        $this->db->bind(':done', 2);

        $results = $this->db->resultSet();

        // $count = count($results);

        // error_log($count);

        //return data 
        return $results;
    }

    public function setFinishedTasks($data, $mon, $tue, $wed, $thu, $fri, $sat, $sun){
         // PDO statement 
         $this->db->query('SELECT * FROM finishedTasks WHERE  userid = :userid AND calendarWeek = :cW');
         
         $weekNumber = $data['weekNumber'];
         error_log('cw '.$weekNumber);
        //  if ($data['weekNumber'] <10){
        //     $data['weekNumber'] = '0' + $data['weekNumber'];
        //  };

         $this->db->bind(':userid', $data['userId']);
         $this->db->bind(':cW', $weekNumber);

         $results = $this->db->resultSet();

        error_log(print_r($results, 1));

        $count = count($results);

        error_log($count);
        
        if($count == 0) {
            error_log('hi');
            //PDO statement
            $this->db->query('INSERT INTO finishedtasks (userid, calendarWeek, tasksWeek, mon, tue, wed, thu, fri, sat, sun) VALUES (:userid, :cW, :tasksWeek, :mon, :tue, :wed, :thu, :fri, :sat, :sun)');

            //Bind Values
            $this->db->bind(':userid', $data['userId']);
            $this->db->bind(':cW', $weekNumber);
            $this->db->bind(':tasksWeek', $data['tasks']);
            $this->db->bind(':mon', $mon);
            $this->db->bind(':tue', $tue);
            $this->db->bind(':wed', $wed);
            $this->db->bind(':thu', $thu);
            $this->db->bind(':fri', $fri);
            $this->db->bind(':sat', $sat);
            $this->db->bind(':sun', $sun);

        } else {
            error_log('hier hallo');
            //PDO statement
            $this->db->query('UPDATE finishedTasks SET tasksWeek = :tasksWeek, mon = :mon, tue = :tue, wed = :wed, thu = :thu, fri = :fri, sat = :sat, sun = :sun WHERE userid = :userid AND calendarWeek = :cW');
            $this->db->bind(':tasksWeek', $data['tasks']);
            $this->db->bind(':mon', $mon);
            $this->db->bind(':tue', $tue);
            $this->db->bind(':wed', $wed);
            $this->db->bind(':thu', $thu);
            $this->db->bind(':fri', $fri);
            $this->db->bind(':sat', $sat);
            $this->db->bind(':sun', $sun);
            $this->db->bind(':userid', $data['userId']);
            $this->db->bind(':cW', $weekNumber);
        }

        // Execute
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        };
    }

    public function statsOverview($userId) {
        // PDO statement
        $this->db->query('SELECT tasksWeek, calendarWeek FROM finishedTasks WHERE userid = :userid');

        //Bind values
        $this->db->bind(':userid', $userId);

        $results = $this->db->resultSet();

        //return data 
        return $results;
    }

    public function getChartValue($data) {
        // PDO statement
        $this->db->query('SELECT mon, tue, wed, thu, fri, sat, sun FROM finishedTasks WHERE userid = :userid AND calendarWeek = :cW');

        //Bind values
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':cW', $data['weekNumber']);

        $results = $this->db->resultSet();

        //return data 
        return $results;
    }

    public function checkForFinishedTasks($data) {
        // If quote has already been set, than die 
        $this->db->query('SELECT * FROM quote WHERE  userid = :userid AND date = :date');

        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':date', $data['date']);

        $check = $this->db->resultSet();

        // error_log(print_r($results, 1));

        $count = count($check);

        if($count == 0) {
        // PDO statement
        $this->db->query('SELECT * FROM tasks WHERE status != 3 AND userid = :userid AND date = :date AND done = :done' );
        
        //Bind values
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':date', $data['date']);
        $this->db->bind(':done', 2);

        $results = $this->db->resultSet();

        // $count = count($results);

        // error_log($count);

        //return data 
        return $results;
        } else {
            $empty = [];
            return $empty;
        }
    }

    public function setQuote($data){


            //PDO statement
            $this->db->query('INSERT INTO quote (userid, date, quote, author) VALUES (:userid, :date, :quote, :author)');

            //Bind Values
            $this->db->bind(':userid', $data['userId']);
            $this->db->bind(':date', $data['date']);
            $this->db->bind(':quote', $data['quote']);
            $this->db->bind(':author', $data['author']);

            // Execute
            if($this->db->execute()) {
                return true;
            } else {
                return false;
            };
        
    }

    public function displayQuote($data) {
        // PDO statement
        $this->db->query('SELECT quote, author FROM quote WHERE userid = :userid AND date = :date');

        //Bind values
        $this->db->bind(':userid', $data['userId']);
        $this->db->bind(':date', $data['date']);

        $results = $this->db->resultSet();

        $count = count($results);

        // If there is no quote for today, display the last quote
        if ($count == 0){
            $this->db->query('SELECT quote, author FROM quote WHERE userid = :userid ORDER BY quote DESC LIMIT 1');

            $this->db->bind(':userid', $data['userId']);

            $result = $this->db->resultSet();

            return $result;
        } else {

        //return data 
        return $results;
        }
    }
}