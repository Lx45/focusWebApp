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
        <ul class="task-list" data-lists>
            <li class="list-name active-list">Youtube</li>
            <li class="list-name">Work</li>
            <li class="list-name">Grocery</li>
        </ul>

        <form action="" data-new-list-form>
            <input type="text" class="new list" data-new-list-input placeholder="new list name"
                aria-label="new list name">
            <button class="btn create" aria-label="create new list">+</button>
        </form>
    </div>


    <div class="todo-list">
        <div class="todo-header">
            <h2 class="list-title">YouTube</h2>
            <p class="task-count">3 tasks remaining</p>
        </div>

        <div class="todo-body">
            <div class="tasks">
                <div class="task">
                    <input type="checkbox" id="task-1">
                    <label for="task-1">
                        <span class="custom-checkbox"></span>
                        record todo list video
                    </label>
                </div>
                <!-- /task-1 -->

                <div class="task">
                    <input type="checkbox" id="task-2">
                    <label for="task-2">
                        <span class="custom-checkbox"></span>
                        another task
                    </label>
                </div>
                <!-- /task-2 -->

                <div class="task">
                    <input type="checkbox" id="task-3">
                    <label for="task-3">
                        <span class="custom-checkbox"></span>
                        a third task
                    </label>
                </div>
                <!-- /task-3 -->
            </div>

            <div class="new-task-creator">
                <form action="">
                    <input type="text" class="new list" data-new-list-input placeholder="new list name"
                        aria-label="new list name">
                    <button class="btn create" aria-label="create new list">+</button>
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