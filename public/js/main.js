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

function redirect(rootpath) {
    window.location.href = "/focusWebApp/app/views/" + rootpath + ".php";

}

$('#arrow-down').click(function() {
    $("html, body").animate({ scrollTop: $(document).height() });
    return false;
  });

  $(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:true,
        center: true,
        // margin:10,
        items: 1,
        // nav: true,
        // responsive:{
        //     1000:{
        //         items:1
        //     }
        // }    
    });
  });

  