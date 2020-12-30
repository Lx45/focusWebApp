$('#btn-su').on('click', userAdd);
// $('#btn-si').on('click', userLogin);

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
            },
            422: function(errors) {
                //userAdd failed
                failedValidation(errors);
                alert('fail');
            }
        }
    });
}