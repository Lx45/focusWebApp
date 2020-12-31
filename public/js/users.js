$('#btn-su').on('click', userAdd);
$('#btn-si').on('click', userLogin);
$('#logout').on('click', logout);

function userAdd() {
    // Init data
    let name = $('#name-su').val(),
        lastname = $('#lastname-su').val(),
        username = $('#username-su').val(),
        birthdate = $('#birthdate-su').val(),
        email = $('#email-su').val(),
        password = $('#password-su').val(),
        passwordConf = $('#passwordconf-su').val();

    $.ajax({
        url: '/focusWebApp/Users/register',
        type: 'post',
        async: true,
        data: {
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
                alert('success');
                redirect('users/login');
            },
            422: function(errors) {
                //userAdd failed
                failedValidation(errors);
                alert('fail');
            }
        }
    });
}


function userLogin() {
    // Init data
    let email = $('#email-si').val(),
        password = $('#password-si').val();

    $.ajax({
        url: '/focusWebApp/Users/login',
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
                redirect('pages/index');

            },
            422: function(errors) {
                //userLogin failed
                failedValidation(errors);
            }
        }
    });
}

function logout() {

    $.ajax({
        url: '/focusWebApp/Users/logout',
        type: 'post',
        async: true,
        statusCode: {
            200: function() {
                //userLogin success

            },
            422: function(errors) {
                //userLogin failed
                // failedValidation(errors);
            }
        }
    });
}
