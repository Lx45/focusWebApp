<?php 
require APPROOT . '/views/inc/header.php';
require APPROOT . '/views/inc/navigation.php';
?>

<div class="grid animate-grid">

<div class="sign-in-card">
        <div class="card-header">
            <h1>Login</h1>
            <hr>
        </div>
        <div class="card-body">

            <div class="inputfield">
                <label for="email">E-Mail</label>
                <div>
                    <input type="email" name="email" class="input input1" id="email-si">
                    <p class="error alert1"></p>
                </div>
            </div>


            <div class="inputfield">
                <label for="password">Password</label>
                <div>
                    <input type="password" name="password" class="input input2" id="password-si">
                    <p class="error alert2"></p>
                </div>
            </div>

        </div>

        <div class="card-footer">
            <a href="<?php echo URLROOT; ?>/users/register">Not registered yet? Sign Up!</a>
        </div>
    </div>
    <button id="btn-si">Login</button>

</div>

<script defer type="text/javascript" src="<?php echo URLROOT; ?>/js/users.js"></script>

<?php require APPROOT . '/views/inc/footer.php'; ?>