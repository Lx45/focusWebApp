<?php 
require APPROOT . '/views/inc/header.php';
?>
<div class="background-homepage">
<?php
require APPROOT . '/views/inc/navigation.php';
print_r($_SESSION);
?>

    <div class="grid">
        <div class="homepage-quote">
            <p>Our focus is our future and what we focus on <br><span>will multiply in our life</span><span>  - David DeNotaris</span></p>
            
        </div>

        <i id="arrow-down" class="fas fa-arrow-down fa-4x"></i>
        

        <p class="homepage-p">Focus is an application, wich will boost your productivity and wich will help you to maintain mental clarity. Within this app you have the option to create short-term and also longterm To-Dos. Through absolving To-dos you will build a streak and unlock motivational quotes to boost your motivation.</p>

        <a class="homepage-a" href="<?php echo URLROOT; ?>/users/register">
            <button class="homepage-btn">Start Now!</button>
        </a>
    </div>
</div>

<div class="slider-background">
    <div class="owl-carousel owl-theme">
        <div data-featherlight="#img1" class="item"> 
            <p class="p-item">Create lists and add tasks</p>
            <img id="img1" class="img-item" src="<?php echo URLROOT; ?>/img/owl-carousel/Day-overview.png" alt="">
        </div>
        <div data-featherlight="#img2" class="item">
            <p class="p-item">View and check off your tasks</p>
            <img id="img2" class="img-item" src="<?php echo URLROOT; ?>/img/owl-carousel/Week-overview.png" alt="">
        </div>
        <div data-featherlight="#img3" class="item">
            <p class="p-item">Check how productive you have been</p>
            <img id="img3" class="img-item" src="<?php echo URLROOT; ?>/img/owl-carousel/Statistics.png" alt="">
        </div>
        <div data-featherlight="#img4" class="item">
            <p class="p-item">Earn quotes and overview all of them</p>
            <img id="img4" class="img-item" src="<?php echo URLROOT; ?>/img/owl-carousel/Quote-overview.png" alt="">
        </div>
    </div>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>