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
        
        <!-- <div class="slider-background"></div> -->

        <p class="homepage-p">Focus is an application, wich will boost your productivity and wich will help you to maintain mental clarity. Within this app you have the option to create short-term and also longterm To-Dos. Through absolving To-dos you will build a streak and unlock motivational quotes to boost your motivation.</p>

        <a class="homepage-a" href="<?php echo URLROOT; ?>/users/register">
            <button class="homepage-btn">Start Now!</button>
        </a>
    </div>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>