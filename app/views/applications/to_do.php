<?php 
require APPROOT . '/views/inc/header.php';

require APPROOT . '/views/inc/navigation.php';
?>

<div class="grid">

    <div class="buttons">
        <button>Day</button>
        <button>Week</button>
        <button>Month</button>
        <button>Year</button>
    </div>


    <div class="all-tasks">
        <h2 class="task-list-title">My lists</h2>
        <ul class="task-list">
            <?php foreach($data['taskListOverview'] as $taskOverview) : ?>
            <li class="list-name" data-listid="<?php echo $taskOverview['listid'] ?>"><?php echo $taskOverview['listname']?></li>
            <?php endforeach; ?>
            <!-- <li class="list-name">Work</li>
            <li class="list-name">Grocery</li> -->
        </ul>

        <form action="">
            <input id="new-list-input" type="text" class="new list" placeholder="new list name"
                aria-label="new list name">
            <button id="new-list-btn" class="btn create" data-userid="<?php echo $_SESSION['user_id']?>" aria-label="create new list">+</button>
        </form>
    </div>


    <div class="todo-list">
        <div class="todo-header">
            <h2 class="list-title">YouTube</h2>
            <p class="task-count">3 tasks remaining</p>
        </div>

        <div class="todo-body">
            <div class="to-do-list-tasks">
                <div class="tasks">
                    <?php foreach($data['toDoListOverview'] as $toDoOverview) : ?>
                    <div class="task">
                        <input type="checkbox" id="task-1">
                        <label for="task-1">
                            <span class="custom-checkbox"></span>
                            <?php echo $toDoOverview['taskname']?>
                        </label>
                    </div>
                    <?php endforeach; ?>
                    <!-- /task-1 -->

                    <!-- <div class="task">
                        <input type="checkbox" id="task-2">
                        <label for="task-2">
                            <span class="custom-checkbox"></span>
                            another task
                        </label>
                    </div>  -->
                    <!-- /task-2 -->

                    <!-- <div class="task">
                        <input type="checkbox" id="task-3">
                        <label for="task-3">
                            <span class="custom-checkbox"></span>
                            a third task
                        </label>
                    </div>  -->
                    <!-- /task-3 -->
                </div>
            </div>

            <div class="new-task-creator">
                <form action="">
                    <input id="new-task-input" type="text" class="new task" placeholder="new task name"
                        aria-label="new task name">
                    <button id="new-task-btn" class="btn create" data-userid="<?php echo $_SESSION['user_id']?>" aria-label="create new task">+</button>
                </form>
            </div>
            <div class="delete-stuff">
                <button class="btn delete">Cleat completed tasks</button>
                <button class="btn delete">Delete List</button>
            </div>
        </div>
    </div>


</div>


<?php require APPROOT . '/views/inc/footer.php'; ?>