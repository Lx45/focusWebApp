$(document).ready(function(){
     // Activate gsap plugin
    gsap.registerPlugin(ScrollTrigger);

    //Init var
    const navigation = $('nav'), 
    quote = $('.homepage-quote'),
    arrow = $('#arrow-down'),
    text = $('.homepage-p'),
    btn = $('.homepage-a'),
    timeline1 = gsap.timeline(),
    timeline2 = gsap.timeline({
        scrollTrigger: {
            trigger: '.background-homepage',
            start:'bottom top',
        }
    });

    //call function
    animateHomeScreen();
    // scrollAnimationHomeScreen();
    // arrow.hover(hoverArrow);
    

    //animate on pageload
    function animateHomeScreen() {


        //Animate timeline1
        timeline1
            .from(quote, {
                y: '30%',
                opacity: '0',
                duration:1.5,
                delay: 1,
            })
            .from(navigation, {
                opacity: '0',
                duration:1.5
            },'<')
            .from(arrow, {
                opacity: '0',
                duration: 1,
            }, 1);


        //Hover effect
        arrow.hover(function(){
            gsap.to(arrow, {opacity: 1, duration: .2})
        }, function(){
            gsap.to(arrow, {opacity: .2, duration: .2})
        })


        timeline2
            .from(text, {
                x: '-20%',
                opacity: '0',
                duration: 1.5,
            })
            .from(btn, {
                y: '40%',
                opacity: '0',
                duration: 1.5,
            })

    }


})

