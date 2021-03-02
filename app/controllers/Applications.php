<?php 

	//Default controller 
	class Applications extends Controller {
		public function __construct(){
			//Load model through model function, created in Controller.php
			$this->applicationModel = $this->model('Application');
		}

		public function to_do(){
			//Init var
			$userId = $_SESSION['user_id'];

			//call model function
			$taskListOverview = $this->applicationModel->taskListOverview($userId);

			$data = [
				'title' => 'To-Do-List',
				'taskListOverview' => $taskListOverview,
			];

			// send data
			$this->view('applications/to_do', $data);
		}

		public function loadTasks(){
			// Init var
			$data = [
				'userId' => $_SESSION['user_id'],
				'listId' => trim(htmlspecialchars($_POST['activeLiId'])), 
				'date' => trim(htmlspecialchars($_POST['date'])) 
			];

			//call model function
			$toDoListOverview = $this->applicationModel->toDoListOverview($data);

			// send data
			if(isAjaxCall()){
				$this->json($toDoListOverview);
			}
		}

		public function loadTasksWeek(){
			//Init var
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
			
			//call model function
			 $toDoListOverview = $this->applicationModel->toDoListOverviewWeek($data, $mon, $tue, $wed, $thu, $fri, $sat, $sun);

			//send data
			if(isAjaxCall()){
				$this->json($toDoListOverview);
			}
		}

		public function loadLists(){
			//Init var
			$userId = $_SESSION['user_id'];

			//call model function
			$taskListOverview = $this->applicationModel->taskListOverview($userId);

			// send data
			if(isAjaxCall()){
				$this->json($taskListOverview);
			}
		}

		
		public function statistic(){
			// Init var
			$userId = $_SESSION['user_id'];

			//call model function
			$stats = $this->applicationModel->statsOverview($userId);

			$data = [
				'title' => 'Statistic',
				'statsOverview' => $stats
			];

			//send data
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
				if (empty($data['newList'])) {
					$tmp_list = array(1, "*Please enter your list");
					array_push($errorsArray, $tmp_list);
				}

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
				if (empty($data['newTask'])) {
					$tmp_task = array(2, "*Please enter your task");
					array_push($errorsArray, $tmp_task);
				}


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

				//call model function
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
		
				//call model function
    			if ($this->applicationModel->finishedTask($taskId, $done)) {
    				//Product succsefully deleted
    				http_response_code(200);
    			} else {
    				//failed 
   					http_response_code(422);
   				}
			}
		}

		public function countFinishedTasks(){
			//init data
			$data = [
				'userId' => $_SESSION['user_id'], 
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
			
			//call model function
			 $finishedTasks = $this->applicationModel->countFinishedTasks($data, $mon, $tue, $wed, $thu, $fri, $sat, $sun);

			 //send data
			if(isAjaxCall()){
				$this->json($finishedTasks);
			}
		}


		public function setFinishedTasks(){
			//init var
			$data = [
				'userId' => $_SESSION['user_id'], 
				'tasks' => htmlspecialchars($_POST['tasks']),
				'weekNumber' => htmlspecialchars($_POST['weekNumber']),
				'dayTasks' => json_decode(stripslashes($_POST['dayTasks'])) 
			];
			// Set Session id for the current week
			$_SESSION['week'] = $data['weekNumber'];

			//Set var for each day
			$mon = $data['dayTasks'][0];
			$tue = $data['dayTasks'][1];
			$wed = $data['dayTasks'][2];
			$thu = $data['dayTasks'][3];
			$fri = $data['dayTasks'][4];
			$sat = $data['dayTasks'][5];
			$sun = $data['dayTasks'][6];

			
			//call model function
			 $setTasks = $this->applicationModel->setFinishedTasks($data, $mon, $tue, $wed, $thu, $fri, $sat, $sun);

			//send data
			if(isAjaxCall()){
				$this->json($setTasks);
			}
		}

		public function getChartValue(){
			//Init data
			$data = [
				'userId' => $_SESSION['user_id'], 
				'weekNumber' => $_SESSION['week'],
			];
			
			//call model function
			 $getValue = $this->applicationModel->getChartValue($data);

			if ($getValue) {
				//Chartvalue succsefully fetched
				http_response_code(200);
				$this->json($getValue);
			} else {
				//failed 
				http_response_code(422);
			}

		}

		public function checkForFinishedTasks(){
			//Init data
			$data = [
				'userId' => $_SESSION['user_id'], 
				'date' => htmlspecialchars($_POST['date']),
			];

			//call model function
			 $getFinishedTasks = $this->applicationModel->checkForFinishedTasks($data);

			 if ($getFinishedTasks) {
				//FinishedTasks succsefully fetched
				http_response_code(200);
				$this->json($getFinishedTasks);
			} else {
				//failed 
				http_response_code(422);
			}
		}

		public function setQuote(){
			//Init data
			$data = [
				'userId' => $_SESSION['user_id'], 
				'date' => htmlspecialchars($_POST['date']),
				'quote' => htmlspecialchars($_POST['quote']),
				'author' => htmlspecialchars($_POST['author']),
			];
	
			//call model function
			$quote = $this->applicationModel->setQuote($data);

			if ($quote) {
				//FetchedQuote succsefully set
				http_response_code(200);
				$this->json($quote);
			} else {
				//failed 
				http_response_code(422);
			}
		}

		public function displayQuote(){
			// Init data
			$data = [
				'userId' => $_SESSION['user_id'], 
				'date' => htmlspecialchars($_POST['date']),
			];

			
			//call model function
			 $quote = $this->applicationModel->displayQuote($data);

			 if ($quote) {
				//Succsefully fetched quote from database
				http_response_code(200);
				$this->json($quote);
			} else {
				//failed 
				http_response_code(422);
			}
		}

		public function checkForStreak(){
			//Init data
			$data = [
				'userId' => $_SESSION['user_id'], 
				'today' => htmlspecialchars($_POST['today']),
				'yesterday' => htmlspecialchars($_POST['yesterday']),
			];

			
			//call model function
			 $streak = $this->applicationModel->checkForStreak($data);

			 if(isAjaxCall()){
				$this->json($streak);
			}
		}

		public function displayAllQuotes() {

			if (isAjaxCall()) {
				//Init var
				$userId = $_SESSION['user_id'];
				
				//call model function
				$allQuotes = $this->applicationModel->displayAllQuotes($userId);


    			if ($allQuotes) {
    				//succesfully fetched all quotes
					http_response_code(200);
					$this->json($allQuotes);
    			} else {
    				//failed 
   					http_response_code(422);
   				}
			}
		}


		public function quoteSearch() {
			//Init var
			$output = '';
			$search = $_POST['query'];

			//Call model function
			$searchData = $this->applicationModel->searchQuoteData($search);

			$data = [
				'searchData' => $searchData
			];

			// If data found display
			if ($searchData) {
				//Create table elment
				$output = "
				<table class='table-quotes' id='table-data>
					<tr class='tr-quotes'>
						<th class='th-quotes'>Quote</th>
						<th class='th-quotes'>Author</th>
						<th class='th-quotes'>Date</th>
					</tr>";
				
				//Insert data
        		foreach($data['searchData'] as $overview) : 

				$output .= "
				<tr class='tr-quotes'>
					<td class='td-quotes'> $overview[quote] </td>
					<td class='td-quotes'> $overview[author] </td>
					<td class='td-quotes'> $overview[date]</td>
				</tr>";

  				endforeach;

				$output .= '  
				</table>';
				
				//dsiplay data
				echo $output;

			} else {
				echo "No quote found";
			}
		}

	} 