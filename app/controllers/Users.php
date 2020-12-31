<?php
//Default controller
class Users extends Controller
{
    public function __construct()
    {
		//Load model through model function, created in Controller.php
		$this->userModel = $this->model('User');
    }

    public function register()
    {
        if (isAjaxCall()) {
            // Init data
            $data = [
                'name' => trim(htmlspecialchars($_POST['name'])),
                'lastname' => trim(htmlspecialchars($_POST['lastname'])),
                'username' => trim(htmlspecialchars($_POST['username'])),
                'birthdate' => trim(htmlspecialchars($_POST['birthdate'])),
                'email' => filter_var($_POST['email'], FILTER_VALIDATE_EMAIL),
                'password' => trim(htmlspecialchars($_POST['password'])),
                'passwordConf' => trim(htmlspecialchars($_POST['passwordConf'])),
            ];
            $errorsArray = array();

            // Validate data
            if (empty($data['name'])) {
                $tmp_name = array(1, "*Please enter your name");
                array_push($errorsArray, $tmp_name);
            }

            if (empty($data['lastname'])) {
                $tmp_lastname = array(2, "*Please enter your lastname");
                array_push($errorsArray, $tmp_lastname);
            }

            if (empty($data['username'])) {
                $tmp_username = array(3, "*Please enter yourusername");
                array_push($errorsArray, $tmp_username);
            }

            if (empty($data['birthdate'])) {
                $tmp_birthdate = array(4, "*Please enter yourbirthdate");
                array_push($errorsArray, $tmp_birthdate);
            }

            if (empty($data['email'])) {
                $tmp_email = array(5, "*Please enter your email");
                array_push($errorsArray, $tmp_email);
                // }elseif ($this->userModel->findUserByEmail($data['email'])) {
                //     // User found
                //     $tmp_email = array(1, "*Email already registered");
                //     array_push($errorsArray, $tmp_email);
                // } else {
                //     // User not found
            }

            if (empty($data['password'])) {
                $tmp_password = array(6, "*Please enter password");
                array_push($errorsArray, $tmp_password);
			}
			
			if (empty($data['passwordConf'])) {
                $tmp_passwordConf = array(7, "*Please enter password");
                array_push($errorsArray, $tmp_passwordConf);
            } elseif ($data['password'] !== $data['passwordConf']) {
				$tmp_passwordConf = array(7, "* The passwords doesn't match");
                array_push($errorsArray, $tmp_passwordConf);
			}

            // Check for errors
            if (count($errorsArray) === 0) {
                // Hash Password
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

                // Call model function
                if ($this->userModel->user_add($data)) {
                    // user add success
                    http_response_code(200);
                } else {
                    // model function failed
                    http_response_code(422);
                }
            } else {
                // data validation failed
                $this->json($errorsArray, 422);
            }
        } else {
            $data = [
                'title' => 'Sign Up',
            ];

            $this->view('users/register', $data);
        }
    }

    public function profile()
    {
		$data = [
			'title' => 'Profile',
		];

		

		$this->view('users/profile', $data);
    }

    public function login()
    {
        if (isAjaxCall()) {

            //Init Data
            $errorsArray = array();
            $data = [
                'email' => filter_var($_POST['email'], FILTER_VALIDATE_EMAIL),
                'password' => trim(htmlspecialchars($_POST['password'])),
            ];

            //Validation
            if (empty($data['email'])) {
                $tmp_email = array(1, "*Please enter email");
                array_push($errorsArray, $tmp_email);
                // }elseif ($this->userModel->findUserByEmail($data['email'])) {
                //     // User found
                // } else {
                //     // User not found
                //     $tmp_email = array(1, "*No user found");
                //     array_push($errorsArray, $tmp_email);
            }

            if (empty($data['password'])) {
                $tmp_password = array(2, "*Please enter password");
                array_push($errorsArray, $tmp_password);
            }

            if (count($errorsArray) === 0) {
                // validation success

                //Call model function
                $loggedInUser = $this->userModel->login($data['email'], $data['password']);

                if ($loggedInUser) {
                    // login successfull
                    // Create session
                    error_log($loggedInUser[email]);
                    $this->createUserSession($loggedInUser);

                    //Stauts code success
                    http_response_code(200);
                } else {
                    //If password is incorrect
                    //Push error into array
                    $tmp_daten = array(2, "*Password incorrect");
                    array_push($errorsArray, $tmp_daten);

                    //send json data back with errors
                    $this->json($errorsArray, 422);
                }
            } else {
                // Validation failed
                // Load View with errors
                $this->json($errorsArray, 422);
            }

        } else {
            $data = [
                'title' => 'Sign In',
            ];

            $this->view('users/login', $data);
        }
    }

    public function createUserSession($user)
    {
        //Push data into Session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
    }

    public function logout() {
        //Destory session
        unset($_SESSION['user_id']);
        unset($_SESSION['user_email']);
        session_destroy();
    }
}
