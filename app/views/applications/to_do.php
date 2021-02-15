<?php 
require APPROOT . '/views/inc/header.php';
?>

<?php
require APPROOT . '/views/inc/navigation.php';
?>

<div class="grid">

    <div class="buttons">
        <button class="calendar-buttons date-button"></button>
        <button class="calendar-buttons week-button"></button>
        <!--<button class="calendar-buttons">Month</button>
        <button class="calendar-buttons">Year</button> -->
    </div>


    <div class="all-tasks" id="all-tasks-day-view">
        <h2 class="task-list-title">My lists</h2>
        <div class="all-tasks-list">
            <ul class="task-list">
                <?php foreach($data['taskListOverview'] as $taskOverview) : ?>
                <li class="list-name" data-listid="<?php echo $taskOverview['listid'] ?>"><?php echo $taskOverview['listname']?></li>
                <?php endforeach; ?>
            </ul>
        </div>

        <form action="">
            <input id="new-list-input" type="text" class="new list" placeholder="new list name"
                aria-label="new list name">
            <button id="new-list-btn" class="btn create" data-userid="<?php echo $_SESSION['user_id']?>" aria-label="create new list">+</button>
        </form>
    </div>


    <div class="todo-list" id="to-do-day-view">
        <div class="todo-header">
            <h2 class="list-title"></h2>
            <p class="task-count"></p>
        </div>

        <div class="todo-body">
            <div class="to-do-list-tasks">
                <div class="tasks">
                    <?php foreach($data['toDoListOverview'] as $toDoOverview) : ?>
                    <div class="task" id="task-div">
                        <input type="checkbox" class="task-checkbox" id="task-1">
                        <label for="task-1">
                            <span class="custom-checkbox"></span>
                            <?php echo $toDoOverview['taskname']?>
                        </label>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="new-task-creator">
                <form action="">
                    <input id="new-task-input" type="text" class="new task" placeholder="new task name"
                        aria-label="new task name">
                    <button id="new-task-btn" class="btn create " data-userid="<?php echo $_SESSION['user_id']?>" aria-label="create new task">+</button>
                </form>
            </div>
            <div class="delete-stuff">
                <button class="btn delete">Clear completed tasks</button>
                <button id="delete-btn" class="btn delete">Delete List</button>
            </div>
        </div>
    </div>


</div>

<div class="modal-bg">

    <div class="modal">
        <div class="modal-head">
            <i class="modal-close-btn">X</i>
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





<?php require APPROOT . '/views/inc/footer.php'; ?>