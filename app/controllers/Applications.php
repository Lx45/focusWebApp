<?php 

	//Default controller 
	class Applications extends Controller {
		public function __construct(){
			//Load model through model function, created in Controller.php
			$this->applicationModel = $this->model('Application');
		}

		public function to_do(){
			$userId = $_SESSION['user_id'];
			// $data = [
			// 	'userId' => $_SESSION['user_id'],
			// 	// 'listId' => trim(htmlspecialchars($_POST['activeLiId'])) 
			// ];
			// //call model function
			$taskListOverview = $this->applicationModel->taskListOverview($userId);

			// $toDoListOverview = $this->applicationModel->toDoListOverview($data);

			$data = [
				'title' => 'To-Do-List',
				'taskListOverview' => $taskListOverview,
				// 'toDoListOverview' => $toDoListOverview
			];

		
			$this->view('applications/to_do', $data);
		}

		public function loadTasks(){

			$data = [
				'userId' => $_SESSION['user_id'],
				'listId' => trim(htmlspecialchars($_POST['activeLiId'])), 
				'date' => trim(htmlspecialchars($_POST['date'])) 
			];

			
			//call model function
			$toDoListOverview = $this->applicationModel->toDoListOverview($data);

			if(isAjaxCall()){
				$this->json($toDoListOverview);
			}
		}

		public function loadTasksWeek(){

			$data = [
				'userId' => $_SESSION['user_id'],
				'listId' => trim(htmlspecialchars($_POST['activeLiId'])), 
				'date' => json_decode(stripslashes($_POST['jsonDate'])) 
			];

			$mon = $data['date'][0];
			$tue = $data['date'][1];
			$wed = $data['date'][2];
			$thu = $data['date'][3];
			$fri = $data['date'][4];
			$sat = $data['date'][5];
			$sun = $data['date'][6];

			
			error_log('Test'.print_r($data, 1));
			
			// //call model function
			 $toDoListOverview = $this->applicationModel->toDoListOverviewWeek($data, $mon, $tue, $wed, $thu, $fri, $sat, $sun);

			if(isAjaxCall()){
				$this->json($toDoListOverview);
			}
		}

		public function loadLists(){

			$userId = $_SESSION['user_id'];

			//call model function
			$taskListOverview = $this->applicationModel->taskListOverview($userId);

			if(isAjaxCall()){
				$this->json($taskListOverview);
			}
		}

		
		public function statistic(){
			$data = [
				'title' => 'Statistic',
			];

		
			$this->view('applications/statistic', $data);
		}

		public function addNewList() {
			//Check if Ajax Call
			if (isAjaxCall()) {
				//Init data 
				$errorsArray = array();

				$data = [
					'newList' => trim(htmlspecialchars($_POST['newList'])),
					'userId' => trim(htmlspecialchars($_POST['userId'])) 
				];

				// Validate data

				//Check for errors
				if (count($errorsArray) === 0) {
					
					// Call model function
					if($this->applicationModel->addNewList($data)) {
						//success
						http_response_code(200);
					} else {
						//PDO statement failed
						http_response_code(422);
					}
				} else {
					//Data validation failed
					$this->json($errorsArray, 422);
				}
			} else {
				// Load View
				$data = [
					'title' => 'To-Do-List',
				];
	
			
				$this->view('applications/to_do', $data);
			}

		}


		public function addNewTask() {
			//Check if Ajax Call
			if (isAjaxCall()) {
				//Init data 
				$errorsArray = array();

				$data = [
					'newTask' => trim(htmlspecialchars($_POST['newTask'])),
					'userId' => trim(htmlspecialchars($_POST['userId'])),
					'activeLiId' => trim(htmlspecialchars($_POST['activeLiId'])),
					'date' => trim(htmlspecialchars($_POST['date']))
				];

				// Validate data

				//Check for errors
				if (count($errorsArray) === 0) {
					
					// Call model function
					if($this->applicationModel->addNewTask($data)) {
						//success
						http_response_code(200);
					} else {
						//PDO statement failed
						http_response_code(422);
					}
				} else {
					//Data validation failed
					$this->json($errorsArray, 422);
				}
			} else {
				// Load View
				$data = [
					'title' => 'To-Do-List',
				];
	
			
				$this->view('applications/to_do', $data);
			}

		}

		

		public function deleteList() {

			if (isAjaxCall()) {
				//Push current productId into a variable
				$listId = htmlspecialchars($_POST['activeLiId']);

				//save time of delete
    			// $deletedOn = time();

    			if ($this->applicationModel->deleteList($listId)) {
    				//Product succsefully deleted
    				http_response_code(200);
    			} else {
    				//failed 
   					http_response_code(422);
   				}
			}
		}

		public function finishedTask() {

			if (isAjaxCall()) {
				//Push current productId into a variable
				$taskId = htmlspecialchars($_POST['taskId']);
				$done = htmlspecialchars($_POST['done']);
				
				//save time of delete
    			// $deletedOn = time();

    			if ($this->applicationModel->finishedTask($taskId, $done)) {
    				//Product succsefully deleted
    				http_response_code(200);
    			} else {
    				//failed 
   					http_response_code(422);
   				}
			}
		}

	} 