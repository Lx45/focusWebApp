<nav>
    <ul>
    <li ><a href="<?php echo URLROOT; ?>/pages/index">Home</a></li>
    <li><a class="disabled" href="<?php echo URLROOT; ?>/application/to_do">To-Do</a></li>
    <li><a class="disabled" href="<?php echo URLROOT; ?>/application/statistic">Statistic</a></li>
    <li><a class="disabled" href="<?php echo URLROOT; ?>/users/profile">Profil</a></li>
    <?php if (isset($_SESSION['user_id'])) { ?>
    <li><a id="btn-lo" class="active" href="<?php echo URLROOT; ?>/pages/index">Logout</a></li>
    <?php } else { ?>
    <li><a href="<?php echo URLROOT; ?>/users/login">Login</a></li>
    <?php } ?>
    </ul>
</nav>