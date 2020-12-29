<?php 
	//Default controller 
	class Application extends Controller {
		public function __construct(){
			
		}

		public function to_do(){
			$data = [
				'title' => 'To-Do-List',
			];

		
			$this->view('application/to_do', $data);
		}

		public function statistic(){
			$data = [
				'title' => 'Statistic',
			];

		
			$this->view('application/statistic', $data);
		}

	} 