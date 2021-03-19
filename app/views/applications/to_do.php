<?php 
require APPROOT . '/views/inc/header.php';
?>

<?php
require APPROOT . '/views/inc/navigation.php';
?>

<div class="grid animate-grid">

    <div class="buttons">
        <button class="calendar-buttons date-button"></button>
        <button class="calendar-buttons week-button"></button>
    </div>

    
    <div class="all-tasks" id="all-tasks-day-view">
        <div class="test-divv">
        <div class="line-through"></div>
        <h2 class="task-list-title">List</h2>
        </div>
        <div class="all-tasks-list">
            <ul class="task-list">
                <?php foreach($data['taskListOverview'] as $taskOverview) : ?>
                <li class="list-name" data-listid="<?php echo $taskOverview['listid'] ?>"><?php echo $taskOverview['listname']?></li>
                <?php endforeach; ?>
            </ul>
        </div>

        <form action="">
            <input id="new-list-input" type="text" class="new list input input1" placeholder="New list name" aria-label="new list name">
            <button id="new-list-btn" class="btn create" data-userid="<?php echo $_SESSION['user_id']?>" aria-label="create new list">+</button>
        </form>
        <p class="error alert1"></p>
    </div>


    <div class="todo-list" id="to-do-day-view">
        <div class="todo-header">
            <h2 class="list-title"></h2>
            <p class="task-count"></p>
        </div>

        <div class="todo-body">
            <div class="to-do-list-tasks">
            </div>

            <div class="new-task-creator">
                <form action="">
                    <input type="text" class="new task new-task-input input input2" placeholder="New task name" aria-label="new task name">
                    <button class="btn create new-task-btn" data-userid="<?php echo $_SESSION['user_id']?>" aria-label="create new task">+</button>
                </form>
                <p class="error alert2"></p>
            </div>
            <div class="delete-stuff">
                <!-- <button class="btn delete">Clear completed tasks</button> -->
                <button id="delete-btn" class="btn delete">Delete List</button>
            </div>
        </div>
    </div>


</div>

<div class="modal-bg">

    <div class="modal">
        <div class="modal-head">
            <i class="far fa-times-circle fa-2x modal-close-btn"></i>
        </div>
        <div class="modal-body">
        <div id="container">
        <div id="header">
            <div id="monthDisplay"></div>
            <div>
                <button id="backButton">Back</button>
                <button id="nextButton">Next</button>
            </div>
        </div>
        <div id="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
        </div>

        <div id="calendar"></div>
    </div>
        </div>
        <div class="modal-footer">

        </div>
    </div>
</div>



<script defer type="text/javascript" src="<?php echo URLROOT; ?>/js/calendar-week.js"></script>
<script defer type="text/javascript" src="<?php echo URLROOT; ?>/js/calendar.js"></script>
<script defer type="text/javascript" src="<?php echo URLROOT; ?>/js/to-do.js"></script>

<?php require APPROOT . '/views/inc/footer.php'; ?>