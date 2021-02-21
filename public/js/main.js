function successValidation() {
    $('.input').css({ border: '3px solid green' });
    $('.error').css({ display: 'none' });
}

function failedValidation(v) {
    console.log(v.responseText);
    let errors = JSON.parse(v.responseText);
    $('.input').css({ "border-bottom": '3px solid green' });
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

function redirect(rootpath) {
    window.location.href = "/focusWebApp/app/views/" + rootpath + ".php";

}

