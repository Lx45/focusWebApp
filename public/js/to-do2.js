/*!!!Init Variables!!!*/
// let selectedDate = $('.date-button');
let newListInput = $('#new-list-input');
let newListBtn = $('#new-list-btn');
let firstTaskList = $('.task-list .list-name:first');
let lastTaskList = $('.task-list .list-name:last');
let deleteListBtn = $('#delete-btn');
let clearBtn =$('.clear-button');

// const weekBtn = $('.week-button');

let newTaskInput = $('#new-task-input');
let newTaskBtn = $('#new-task-btn');
let checkbox = $('.task-checkbox');
let task = $('#task.div')

let currentWeekDayDates = [];

/*!!!Eventhandler!!!*/
newListBtn.on('click', addNewList);
getActiveList();
    // function get called by default on the first task list of the user
activeList(firstTaskList);
deleteListBtn.on('click', deleteList);
clearBtn.click(clearStuff);


newTaskBtn.on('click', addNewTask);
checkbox.on('click', finishedTask);

function getActiveList() {
    let li = $('li');
    li.on('click',activeList);
}



let selectedDate = $('.date-button');

selectedDate.bind('DOMSubtreeModified', checkForNewDate)
weekBtn.click(weekOverview);



/*!!!Choose active Tasklist!!!*/
function activeList(event) {
    console.log(currentWeekDayDates);
    //Init data
    let activeLi;
    const dayList = $('#to-do-day-view');
    const tasks = $('.tasks')

    // Check if function was called by onclick or by default
        if(event == firstTaskList || event == lastTaskList) {
            activeLi = $(event);
        } else {
            activeLi = $(event.target);
        }

    let activeLiId = activeLi[0].dataset.listid;
    let listname = activeLi.html();
    let listTitle = $('.list-title');

    // console.log(listname);
    // console.log(activeLiId);

    //Set list-title
    listTitle.html(listname);

    //Unset active class
    $('.task-list .list-name').removeClass('active-list');

    // Set active class
    activeLi.addClass('active-list');

    //load the current Tasklist
    if($(dayList).hasClass('hide')){
        console.log('hide')
        loadTasksWeekOverview(activeLiId);
        console.log('activeList loaded');
    } else {
        console.log('shown');
        loadTasks(activeLiId);
        console.log('activeList loaded');
    }

}

/*!!!Add new list!!!*/
function addNewList(e) {

    // Init data
    let newList = newListInput.val();
    let userId = newListBtn[0].dataset.userid;

    console.log(userId);

    $.ajax({
        url: '/focusWebApp/Applications/addNewList',
		type: 'post',
		async: true,
		data: {
            "newList": newList,
            "userId": userId
		},
		statusCode: {
			200: function(feedback){
                alert('success');
                newListInput.val('');
                loadLists(userId);
			},
			422: function(feedback){
                alert('failed');
			}
		},
    });

    // Prevent the default behavior of refreshing the page
    e.preventDefault();
}


/*!!!Add new Task!!!*/
function addNewTask(e) {

    // Init data
    let newTask = newTaskInput.val();
    let userId = newTaskBtn[0].dataset.userid;
    let activeLi = $('.active-list');
    let activeLiId = activeLi[0].dataset.listid;
    let date = $('.date-button').text();
    console.log(date);

    console.log(userId);

    $.ajax({
        url: '/focusWebApp/Applications/addNewTask',
		type: 'post',
		async: true,
		data: {
            "newTask": newTask,
            "userId": userId,
            "activeLiId": activeLiId,
            "date": date
		},
		statusCode: {
			200: function(feedback){
                newTaskInput.val('');
                loadTasks(activeLiId);
				alert('success');
			},
			422: function(feedback){
                alert('failed');
			}
		},
    });

    // Prevent the default behavior of refreshing the page
    e.preventDefault();
}

/*!!!Refresh lists!!!*/
function loadLists(userId){
    //Init data 
    let taskList = $('.all-tasks-list');

    // // // Empty task-list
     taskList.html('');

    $.ajax({
        url: '/focusWebApp/Applications/loadLists',
		type: 'post',
		async: true,
		data: {
            "userId": userId
		},
		statusCode: {
			200: function(lists){
                console.log(lists);
                // Check if there are tasks in the list
                if(lists.length > 0){
                    // Tasks found
                    let listUl = $('<ul class="task-list"></ul>');

                    lists.forEach(function(list){

                        let taskList = `
                        <li class="list-name" data-listid="${list.listid}">${list.listname}</li>
                        `

                        listUl.append(taskList);
                    })
                    console.log('????');
                    $('.all-tasks-list').append(listUl);

                    getActiveList();
                    lastTaskList = $('.task-list .list-name:last');
                    activeList(lastTaskList);
                    
                } else {
                // No Task found
                }
			},
			422: function(){
                alert('To-Do-list can not be reloaded');
			}
		},
    });
}


/*!!!Refresh Tasks!!!*/
function loadTasks(activeLiId) {
    // Init data 
    let toDoList = $('.tasks');
    let taskCount = $('.task-count');
    let date = $('.date-button').text();
    // console.log(date);
    // console.log('fix this')
    console.log(activeLiId);
    // Empty To-Do-List 
    toDoList.html('');

    $.ajax({
        url: '/focusWebApp/Applications/loadTasks',
		type: 'post',
		async: true,
		data: {
            "activeLiId": activeLiId,
            "date": date
            // "userId": userId
		},
		statusCode: {
			200: function(tasks){
                // console.log(tasks);
                // console.log(tasks.status);
                let tasksRemaining = tasks.length;
                // console.log(tasksRemaining);
                taskCount.text(tasksRemaining + ' tasks remaining');
                // Check if there are tasks in the list
                if(tasks.length > 0){
                    // Tasks found
                    let tasksDiv = $('<div class="tasks"></div>');

                    tasks.forEach(function(task){

                        let toDo = `
                        <div class="task" id="task-div">
                        <input type="checkbox" class="task-checkbox" id="task-${task.taskid}">
                        <label for="task-${task.taskid}">
                            <span class="custom-checkbox"></span>
                            ${task.taskname}
                        </label>
                        </div>`
                        // console.log(task.status);
                        let status = task.status;
                        // console.log(status);
                        tasksDiv.append(toDo);
                    })

                    $('.to-do-list-tasks').append(tasksDiv);
                    checkbox = $('.task-checkbox');
                    task = $('#task.div')
                    checkbox.on('click', finishedTask);
                } else {
                // No Task found
                }
			},
			422: function(){
                alert('To-Do-list can not be reloaded');
			}
		},
    });
    console.log('loadtasks loaded');
}

/*!!!Delete list!!!*/
function deleteList() {

    //Init data
    let activeLi = $('.active-list');
    let activeLiId = activeLi[0].dataset.listid;
    let userId = newListBtn[0].dataset.userid;

    $.ajax({
        url: '/focusWebApp/Applications/deleteList',
		type: 'post',
		async: true,
		data: {
            "activeLiId": activeLiId
		},
		statusCode: {
			200: function(feedback){
                newTaskInput.val('');
                loadLists(userId);
				alert('success');
			},
			422: function(feedback){
                alert('failed');
			}
		},
    });
}

/*!!!finish task!!!*/
function finishedTask() {

    console.log('heyho');
    if(checkbox.prop('checked')){
        console.log('checked');
    } else {
        console.log('unchecked');
    }
}




/*!!! If date changed reload content!!!*/
function checkForNewDate(){
    //Init Var
    const toDoDayView = $('#to-do-day-view');
    const taskListDayView = $('#all-tasks-day-view');
    let weekView = $('.week-view')

    // Set back to initial location
    taskListDayView.css({'grid-column': '5/8', 'margin-top': '30px'});
    // Display dayview
    toDoDayView.show();
    toDoDayView.removeClass('hide');
    // remove weekview
    weekView.remove();
    //refresh list
    activeList(firstTaskList);
}


/*!!! Week overview !!!*/
function weekOverview(e){
    e.preventDefault();
    // Init var
    const toDoDayView = $('#to-do-day-view');
    const taskListDayView = $('#all-tasks-day-view');
    // hide dayview
    toDoDayView.hide();
    toDoDayView.addClass('hide');
    // move tasklist
    taskListDayView.css({'grid-column': '1/3', 'margin-top': '30px'});
    
    //Get Current weekdays
    // getCurrentWeekdays();
    // Create WeekOverview
    createWeekLists();
    // set active List
     activeList(firstTaskList);
    // refresh tasks
    //  loadTasksWeekOverview()

    // Clear arrays
    // currentWeekDays= [];
    // currentWeekDayDates = [];

    // console.log($('.tasks'));
    // $('.tasks').empty();
    console.log('weekOverview loaded');
}



function getCurrentWeekdays() {
        currentWeekDayDates = [];
        // Change the display of the dates
        for(let i = 0; i< currentWeekDays.length; i++){
            let changedDays = currentWeekDays[i].toLocaleString('en-us', {
                          month: 'numeric',
                     day: 'numeric',
                // weekday: 'long',
                    year: 'numeric',
        })
    
         
        changedDays = changedDays.replace("/", ".");
        changedDays = changedDays.replace("/", ".");
        currentWeekDayDates.push(changedDays);
    }
}

function createWeekLists() {
    //Init var
    const originalToDoList = $('#to-do-day-view');
    let weekView = $('.week-view')
    let DomDay = [];
    getCurrentWeekdays();


    console.log(currentWeekDayDates);
    // Clear view if another week is already displayed
    weekView.remove();

    //Create to-do-list for weekoverview
    let dayProtoTyp = `<div class="todo-list week-view" id="monday">
    <div class="todo-header header-weekview">
        <p class="weekday-long"> <span class="to-do-day"></span></p>
        <p class="task-count"></p>
    </div>

    <div class="todo-body">
        <div class="to-do-list-tasks">
            <div class="tasks">
                
            </div>
        </div>

        <div class="new-task-creator">
            <form action="">
                <input id="new-task-input" type="text" class="new task" placeholder="new task name"
                    aria-label="new task name">
                <button id="new-task-btn" class="btn create" data-userid=" aria-label="create new task">+</button>
            </form>
        </div>
    </div>
</div>`

    
    // Clone the weekdays
    let monday = $(dayProtoTyp).clone();
    let tuesday = $(dayProtoTyp).clone();
    let wednesday = $(dayProtoTyp).clone();
    let thursday = $(dayProtoTyp).clone();
    let friday = $(dayProtoTyp).clone();
    let saturday = $(dayProtoTyp).clone();
    let sunday = $(dayProtoTyp).clone();

    // Set the ID's
    monday.find('.header-weekview').html('<p class="weekday-long">Monday, <span class="to-do-day"></span></p><p class="task-count"></p>');
    tuesday.attr('id', 'tuesday');
    tuesday.find('.header-weekview').html('<p class="weekday-long">Tuesday, <span class="to-do-day"></span></p><p class="task-count"></p>');
    wednesday.attr('id', 'wednesday');
    wednesday.find('.header-weekview').html('<p class="weekday-long">Wednesday, <span class="to-do-day"></span></p><p class="task-count"></p>');
    thursday.attr('id', 'thursday');
    thursday.find('.header-weekview').html('<p class="weekday-long">Thursday, <span class="to-do-day"></span></p><p class="task-count"></p>');
    friday.attr('id', 'friday');
    friday.find('.header-weekview').html('<p class="weekday-long">Friday, <span class="to-do-day"></span></p><p class="task-count"></p>');
    saturday.attr('id', 'saturday');
    saturday.find('.header-weekview').html('<p class="weekday-long">Saturday, <span class="to-do-day"></span></p><p class="task-count"></p>');
    sunday.attr('id', 'sunday');
    sunday.find('.header-weekview').html('<p class="weekday-long">Sunday, <span class="to-do-day"></span></p><p class="task-count"></p>');

    // Insert the elment in the DOM
    originalToDoList.after(monday, tuesday, wednesday, thursday, friday, saturday, sunday);

    // Push to-do-list elements in array
    DomDay.push(monday, tuesday, wednesday, thursday, friday, saturday, sunday)

    // Set the date and day to correct lists
    function setDayText(day, index){
        // $(day).find('.day').text('');
        $(day).find('.to-do-day').text(currentWeekDayDates[index]); 
    }
    DomDay.forEach(setDayText);  

    console.log('createWeekList loaded');
    
}

function loadTasksWeekOverview(activeLiId){

    console.log(activeLiId);
    getCurrentWeekdays();

    console.log(currentWeekDayDates);
    let jsonDate = JSON.stringify(currentWeekDayDates);

    console.log('jetzt sollte es sich leeren');
     $('.tasks').html('');
    // console.log($());
    console.log(activeLiId);
    $.ajax({
        url: '/focusWebApp/Applications/loadTasksWeek',
		type: 'post',
		async: true,
		data: {
            "activeLiId": activeLiId,
            "jsonDate": jsonDate
            // "userId": userId
        },
        statusCode: {
            200: function(tasks){
                 console.log(tasks);

                if(tasks.length > 0){
                    // Tasks found
                    let listsArray = []
                    let lists = $('.week-view');
                    for(let i = 0; i< lists.length; i++){
                        // console.log(lists[i]);
                        listsArray.push(lists[i]);
                    }
                    console.log(listsArray);
                    listsArray.forEach(function(list){
                        // console.log(list);
                        let date = $(list).find('.to-do-day').text();
                        // console.log(date);
                        // console.log(tasks);
                        let tasksDiv = $(list).find('.tasks');
                        let toDoListTasks = $(list).find('.to-do-list-tasks');
                        // console.log(tasksDiv);

                            
                        tasks.forEach(function(task){
                            
                            if(date === task.date) {

                            let toDo = `
                            <div class="task" id="task-div">
                            <input type="checkbox" class="task-checkbox" id="task-${task.taskid}">
                            <label for="task-${task.taskid}">
                                <span class="custom-checkbox"></span>
                                ${task.taskname}
                            </label>
                            </div>`
                            // console.log(task.status);
                            let status = task.status;
                            // console.log(status);
                            tasksDiv.append(toDo);
                            }
                        })
    
                        toDoListTasks.append(tasksDiv);
                        checkbox = $('.task-checkbox');
                        task = $('#task.div')
                        checkbox.on('click', finishedTask);
                    
                    })
                    
                }else {
                    // No Task found
                    }
            },
            422: function(){

            }
        },
    })

    console.log('loadtaskweekoverview loaded');
}

function clearStuff(e){
    console.log('test')
    e.preventDefault();

    let weekView = $('.week-view');
    let tasks = $('.tasks')
    console.log(weekView);
    // weekView.remove()
    tasks.html('');
}