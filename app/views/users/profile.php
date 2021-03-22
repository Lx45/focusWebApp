<?php 
require APPROOT . '/views/inc/header.php';

require APPROOT . '/views/inc/navigation.php';


?>

<div class="grid">

    <div class="sidebar">
        <p class="sidebar-active">Your Profil</p>
        <p>Your Membership</p>
    </div>

    <div class="profile-content">
        <div class="profile-div">
            <img src="https://focus-web-app.herokuapp.com/public/img/user.svg" alt="user">
            <div class="profile-div-small" id="first-div">
                <h2>Gender</h2>
                <p>Sir</p>
                <h2>Username</h2>
                <p>John95</p>
            </div>
            <div class="profile-div-small" id="second-div">
                <h2>Name</h2>
                <p>John Doe</p>
                <h2>Birthdate</h2>
                <p>12.11.1995</p>
            </div>
            <button>Edit</button>
        </div>
        <div class="profile-div">
            <img src="https://focus-web-app.herokuapp.com/public/img/mail.svg" alt="mail">
            <div class="profile-div-small" id="email-div">
                <h2>Email</h2>
                <p>JDoe@googlemail.com</p>
            </div>
            <button>Edit</button>
        </div>
        <div class="profile-div">
        <img src="https://focus-web-app.herokuapp.com/public/img/lock.svg" alt="lock">
        <div class="profile-div-small" id="pw-div">
            <h2>Password</h2>
            <p>************</p>
        </div>
        <button>Edit</button>
        </div>
    </div>
</div>


<?php require APPROOT . '/views/inc/footer.php'; ?>