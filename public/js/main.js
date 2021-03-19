//Init var
let logOutBtn =$('#btn-lo');

// Call functions
logOutBtn.click(logout);
checkSessionState();


//Input validation functions
function successValidation(input = '.input') {
    $(input).css({ 'border-bottom': '3px solid green' });
    $('.error').css({ display: 'none' });
}

function failedValidation(v, input = '.input',) {
    console.log(v.responseText);
    let errors = JSON.parse(v.responseText);
    $(input).css({ "border-bottom": '3px solid green' });
    $('.error').css({ display: 'none' });

    for (var i = 0; i < errors.length; i++) {
        let alert = errors[i][0];
        let text = errors[i][1];
        $('.input' + alert).css({ "border-bottom": '3px solid crimson' });
        $('.alert' + alert)
            .css({ display: 'block' })
            .html(text);
    }
}

function failedValidationWeekView(v, input = '.input', errorElement) {
    console.log(v.responseText);
    let errors = JSON.parse(v.responseText);
    $(input).css({ "border-bottom": '3px solid green' });
    $('.error').css({ display: 'none' });

    for (var i = 0; i < errors.length; i++) {
        let alert = errors[i][0];
        let text = errors[i][1];
        $(input).css({ "border-bottom": '3px solid crimson' });
        $(errorElement)
            .css({ display: 'block' })
            .html(text);
    }
}

//redirect
function redirect(rootpath) {
    window.location.href = "/focusWebApp/" + rootpath ;

}

//Animate Grid
function animateGrid() {
//Init var
const grid = $('.animate-grid');

//Animate
gsap.to(grid, {opacity: 1, duration: 1, delay: 1})
}


// Shows the navigation according to logged out or logged in user
function checkSessionState() {
    let logoutBtn = $('#btn-lo');
    if (logoutBtn.hasClass('active')) {
       $("li a").removeClass('disabled');
    }
}

function logout() {

    $.ajax({
        url: '/focusWebApp/Users/logout',
        type: 'post',
        async: true,
        statusCode: {
            200: function() {
                //logout successfull
                redirect('pages/index');
            },
            422: function(errors) {
                //userLogin failed
                // failedValidation(errors);
            }
        }
    });
}



