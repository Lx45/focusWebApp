<?php  
/**
 *
 * Base Controller
 *Loads the models and views
 */

class Controller {
	// Load model
	public function model($model){
		// Require model file
		require_once '../app/models/' . $model . '.php';

		// Instantiate model
		return new $model();
	}

	// Load view, we need to be able to pass data in.
	public function view($view, $data = []){
		// Check for view file 
		if (file_exists('../app/views/' . $view . '.php')) {
			require_once '../app/views/' . $view . '.php';
		} else {
			//View does not exist
			die('View does not exist');
		}
	}

		// Function to encode json and set status code
		public function json($data = [], $statuscode = 200) {
			http_response_code($statuscode);
			header('Content-Type: application/json');
			die(json_encode($data));
		}
}
