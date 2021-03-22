//Init var
let genderDiv = $('.gender-div-body-small'),
     card = $('.register-card'),
     signUpBtn =$('#btn-su'),
     signInBtn =$('#btn-si');


//Call functions
genderDiv.click(changeColor);
genderDiv.click(chooseGender);
card.click(activateCircle);
signUpBtn.click(userAdd);
signInBtn.click(userLogin);
animateGrid();

//Change color of gender Img
function changeColor(e){
    let currentDiv = e.target;
    let genderImg = $('.gender-img')

    $(genderImg).removeClass('active-img');
    $(currentDiv).addClass('active-img');
}

// Set value for gender
function chooseGender(e){
    var val = $(this).attr('data-value');
    $(this).parent().find('input').val(val);  
}

//Set circle to active
function activateCircle(){
    if($(this).hasClass('gender-card')){
        $('#circle-gender').addClass('circle-active');
    } else if($(this).hasClass('personal-info-card')){
        $('#circle-info').addClass('circle-active');
    } else if ($(this).hasClass('contact-card')){
        $('#circle-passwort').addClass('circle-active'); 
    }
}




function userAdd() {
    // Init data
    let genderVal = $('#gender').val(),
        name = $('#name-su').val(),
        lastname = $('#lastname-su').val(),
        username = $('#username-su').val(),
        birthdate = $('#birthdate-su').val(),
        email = $('#email-su').val(),
        password = $('#password-su').val(),
        passwordConf = $('#passwordconf-su').val();

    $.ajax({
        url: 'https://focus-web-app.herokuapp.com/Users/register',
        type: 'post',
        async: true,
        data: {
            gender: genderVal,
            name: name,
            lastname: lastname,
            username: username,
            birthdate: birthdate,
            email: email,
            password: password,
            passwordConf: passwordConf
        },
        statusCode: {
            200: function() {
                //userAdd success
                successValidation();
                redirect('users/login');
            },
            422: function(errors) {
                //userAdd failed
                failedValidation(errors);
            }
        }
    });
}


function userLogin() {
    // Init data
    let email = $('#email-si').val(),
        password = $('#password-si').val();

    $.ajax({
        url: 'https://focus-web-app.herokuapp.com/Users/login',
        type: 'post',
        async: true,
        data: {
            email: email,
            password: password
        },
        statusCode: {
            200: function() {
                //userLogin success
                successValidation();
                redirect('applications/to_do');

            },
            422: function(errors) {
                //userLogin failed
                failedValidation(errors);
            }
        }
    });
}
