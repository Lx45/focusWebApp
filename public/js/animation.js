$(document).ready(function(){
     // Activate gsap plugin
    gsap.registerPlugin(ScrollTrigger);

    //Init var
    const arrow = $('#arrow-down'),
    btn = $('.homepage-btn');
    

    //call function
    animateHomeScreen();
    scrollAnimationHomeScreen();
    

    //animate on pageload
    function animateHomeScreen() {
        
        //Init var
        const navigation = $('nav'), 
        quote = $('.homepage-quote'),
        timeline1 = gsap.timeline();

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


    }

    function scrollAnimationHomeScreen(){
        
        //Init var 
        const text = $('.homepage-p'),
        carousel = $('.owl-carousel'),
        timeline2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.background-homepage',
                start:'bottom top',
            }
        });

        timeline2
        .from(carousel, {
            opacity: '0',
            duration: .5,
        })
        .from(text, {
            x: '-20%',
            opacity: '0',
            duration: 1.5,
        })
        .from(btn, {
            y: '70%',
            opacity: '0',
            duration: 1.5,
            ease: 'bounce.out',
        })
    }

    //Hover effect
    arrow.hover(function(){
        gsap.to(arrow, {opacity: 1, duration: .2})
    },function(){
        gsap.to(arrow, {opacity: .2, duration: .2})
    })

    btn.hover(function(){
        gsap.to(btn, {scale: 1.2, duration: .5})
        gsap.to(btn, {border: 'solid 3px white', duration: .5})
        gsap.to(btn, {fontSize: 50, duration: .5})
    },function(){
        gsap.to(btn, {scale: 1, duration: .5})
        gsap.to(btn, {border: 'solid 3px grey', duration: .5})
        gsap.to(btn, {fontSize: 40, duration: .5})
    })

})

