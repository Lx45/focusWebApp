<?php 
require APPROOT . '/views/inc/header.php';
require APPROOT . '/views/inc/navigation.php';
?>

<div class="grid">

<div class="input-section">
        <div class="gender-card">
            <div class="card-header">
                <h1>Gender</h1>
                <hr>
            </div>
            <div class="card-body">
                <div class="gender-div-body-small" data-value="Mann">
                    <img class="gender-img first" src="../img/male.svg">
                </div>
                <div class="gender-div-body-small" data-value="Frau">
                    <img class="gender-img second" src="../img/female.svg">
                </div>
                <div class="gender-div-body-small" data-value="Trans">
                    <img class="gender-img third" src="../img/trans.svg">
                </div>
                <!-- <input type="text" id="gender" name="radio-value"> -->
            </div>
        </div>
        <div class="personal-info-card">
            <div class="card-header">
                <h1>Personal information</h1>
                <hr>
            </div>
            <div class="card-body">

                <div class="inputfield">
                    <label for="name">Name</label>
                    <div>
                        <input type="text" name="name" class="input input1" id="name-su">
                            <p class="error alert1"></p>
                    </div>
                </div>

                <div class="inputfield">
                    <label for="lastname">Last name</label>
                    <div>
                        <input type="text" name="lastname" class="input input2" id="hurensohn">
                        <p class="error alert2"></p>
                    </div>
                </div>

                <div class="inputfield">
                    <label for="username">Username</label>
                    <div>
                        <input type="text" name="username" class="input input3" id="username-su">
                        <p class="error alert3"></p>
                    </div>
                </div>

                <div class="inputfield">
                    <label for="birthdate">Birthdate</label>
                    <div>
                        <input type="text" name="birthdate" class="input input4" id="birthdate-su">
                        <p class="error alert4"></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="contact-card">
            <div class="card-header">
                <h1>Email / Password</h1>
                <hr>
            </div>
            <div class="card-body">

                <div class="inputfield">
                    <label for="email">E-Mail</label>
                    <div>
                        <input type="email" name="email" class="input input5" id="email-su">
                        <p class="error alert5"></p>
                    </div>
                </div>

                <div class="inputfield">
                    <label for="password">Password</label>
                    <div>
                        <input type="password" name="password" class="input input6" id="password-su">
                        <p class="error alert6"></p>
                    </div>
                </div>

                <div class="inputfield">
                    <label for="passwordconf">Password confirm</label>
                    <div>
                        <input type="password" name="passwordconf" class="input input7" id="passwordconf-su">
                        <p class="error alert7"></p>
                    </div>
                </div>
            </div>
        </div>
        <button id='btn-su'>Sign Up</button>
    </div>


    <div class="info-section">
        <div class="circle-flex" id="circle-gender">
            <div class="circle">
                <p class="circle-p">1</p>
            </div>
            <p class="circle-flex-p">Gender</p>
        </div>

        <div class="circle-flex" id="circle-info">
            <div class="circle">
                <p class="circle-p">2</p>
            </div>
            <p class="circle-flex-p">Info</p>
        </div>


        <div class="circle-flex" id="circle-passwort">
            <div class="circle">
                <p class="circle-p">3</p>
            </div>
            <p class="circle-flex-p">Password</p>
        </div>
    </div>


</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>