<?php 
	//Default controller 
	class Pages extends Controller {
		public function __construct(){
			
		}

		public function index(){
			$data = [
				'title' => 'Homepage',
			];

			

			$this->view('pages/index', $data);
		}

	} 