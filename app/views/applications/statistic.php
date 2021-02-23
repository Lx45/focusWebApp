<?php 
require APPROOT . '/views/inc/header.php';

require APPROOT . '/views/inc/navigation.php';
?>

<div class="grid">
<div class="statistic">
    <canvas id="chart" role="img" aria-label="stats"></canvas>
</div>

<div class="information">
    <?php foreach($data['statsOverview'] as $stats) :
        if($stats['calendarWeek'] == $_SESSION['week']){ ?>
    <p class="finished-tasks">You finished <?php echo $stats['tasksWeek'] ?> Tasks this week!</p>
    <?php 
        };
        error_log('hier '.$stats['calendarWeek']);
     endforeach ?>
    <p id="streak"></p>
    <p id="quote"></p>
</div>

</div>

<script type="module" src="<?php echo URLROOT; ?>/js/statistic.js"></script>

<?php require APPROOT . '/views/inc/footer.php'; ?>