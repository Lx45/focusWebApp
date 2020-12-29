<?php 
	//Default controller 
	class Users extends Controller {
		public function __construct(){	
		}

		public function profile(){
			$data = [
				'title' => 'Profile',
			];

			

			$this->view('users/profile', $data);
		}


	} 