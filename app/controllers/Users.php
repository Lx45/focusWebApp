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
        
        public function register(){
			$data = [
				'title' => 'Registration',
			];

			

			$this->view('users/register', $data);
        }

        public function login(){
			$data = [
				'title' => 'Sign In',
			];

			

			$this->view('users/login', $data);
        }


	} 