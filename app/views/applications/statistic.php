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
    <p id="streak" data-tooltip="You can start and maintain a streak by finishing 5 Tasks a day."></p>
    <p id="quote" data-tooltip="If you finishe 5 Task a day you get a new inspirational Quote"></p>
</div>

</div>

<div class="modal-bg">

    <div class="modal">
        <div class="modal-head">
        <input type="search" class="modal-search" id="search-quote" placeholder="Search: Quote, author...">
            <i class="far fa-times-circle fa-2x modal-close-btn"></i>
        </div>
        <div class="modal-body">
    </div>
    <div class="modal-footer">

</div>
</div>

<script type="module" src="<?php echo URLROOT; ?>/js/statistic.js"></script>

<?php require APPROOT . '/views/inc/footer.php'; ?>