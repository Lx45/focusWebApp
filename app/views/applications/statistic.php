<?php 
require APPROOT . '/views/inc/header.php';

require APPROOT . '/views/inc/navigation.php';
?>

<div class="grid">
<div class="statistic">
    <canvas id="chart" role="img" aria-label="stats"></canvas>
</div>

<div class="information">
    <?php foreach($data['statsOverview'] as $stats) :?>
    <p class="finished-tasks">You finished <?php echo $stats['tasksWeek'] ?> Tasks this week!</p>
    <?php endforeach ?>
    <p>Current Streak: 15 Days!🔥</p>
    <p>Latest Quote: The successful warrior is the 
        Average man, with laser-like focus.  - Bruce Lee</p>
</div>

</div>

<script type="module" src="<?php echo URLROOT; ?>/js/statistic.js"></script>

<?php require APPROOT . '/views/inc/footer.php'; ?>