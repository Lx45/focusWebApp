//Init var
let newListInput = $('#new-list-input'),
    newListBtn = $('#new-list-btn'),
    firstTaskList = $('.task-list .list-name:first'),
    lastTaskList = $('.task-list .list-name:last'),
    deleteListBtn = $('#delete-btn'),
    taskList = $('.all-tasks'),
    newTaskInput = $('.new-task-input'),
    newTaskBtn = $('.new-task-btn'),
    checkbox = $('.task-checkbox'),
    task = $('#task.div'),
    selectedDate = $('.date-button'),
    calendarBtn = $('.day'),
    lists = $('.all-tasks'),
    btnWeekView = $('.week-button');

let currentWeekDayDates = [];

/*!!!Eventhandler!!!*/
newListInput.keydown(function(e){
    if (e.keyCode == 13){
        addNewList(e);
    }
})
newListBtn.click(addNewList);
getActiveList();
activeList(firstTaskList);
deleteListBtn.on('click', deleteList);
newTaskBtn.on('click', addNewTask);
countFinishedTasks();
$(document).on('click', '.new-task-btn-week', addNewTaskWeekView);



function getActiveList() {
    let li = $('li');
    li.on('click',activeList);
}

calendarBtn.click(checkForNewDate);
weekBtn.click(weekOverview);

animateGrid();
calendarBtn.click(animateDayView);
btnWeekView.click(animateWeekView);

/*!!!Choose active Tasklist!!!*/
function activeList(event) {
    //Init data
    let activeLi;
    const dayList = $('#to-do-day-view');
    const tasks = $('.tasks');
    let activeLiId;

    // Check if function was called by onclick or by default
    if(event == firstTaskList || event == lastTaskList) {
        activeLi = $(event);
    } else {
        activeLi = $(event.target);
    }

    
    //Check if a list is choosen
    if (activeLi[0] == undefined){
        //No list is choosen, set an empty var and create the error message
        activeLiId = '';
    } else {
        // List is found, bind the task to the active list
        activeLiId = activeLi[0].dataset.listid;
    }

    
    let listname = activeLi.html();
    let listTitle = $('.list-title');

    //Set list-title
    listTitle.html(listname);

    //Unset active class
    $('.task-list .list-name').removeClass('active-list');

    // Set active class
    activeLi.addClass('active-list');
    console.log(dayList);
    //load the current Tasklist
    if($(dayList).hasClass('hide')){
        //Call function
        console.log('right');
        loadTasksWeekOverview(activeLiId);
    } else {
        //Call function
        console.log('wrong');
        loadTasks(activeLiId); 
    }

}

/*!!!Add new list!!!*/
function addNewList(e) {
    console.log('addneeeewww')

    // Init data
    let newList = newListInput.val();
    let userId = newListBtn[0].dataset.userid;

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
                successValidation(newListInput);
                setTimeout(function(){
                //Clear input
                newListInput.val('');
                //call loadlist function
                loadLists(userId);
                $(newListInput).css({ "border-bottom": '1px solid lightgray' });
                }, 1000)

			},
			422: function(errors){
                failedValidation(errors, newListInput);
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
    let activeLiId;

    //Check if a list is choosen
    if (activeLi[0] == undefined){
        //No list is choosen, set an empty var and create the error message
        activeLiId = '';
    } else {
        // List is found, bind the task to the active list
        activeLiId = activeLi[0].dataset.listid;
    }
    let date = $('.date-button').text();


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
                successValidation(newTaskInput);
                setTimeout(function(){
                    //Clear Input
                    newTaskInput.val('');
                    //call loadTasks function
                    loadTasks(activeLiId);
                    // Set border beack to default
                    $(newTaskInput).css({ "border-bottom": '1px solid lightgray' });
                }, 1000)
			},
			422: function(errors){
                failedValidation(errors, newTaskInput);
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

    // Empty task-list
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
                // Check if there are tasks in the list
                if(lists.length > 0){
                    // Tasks found
                    let listUl = $('<ul class="task-list"></ul>');

                    //Insets lists
                    lists.forEach(function(list){

                        let taskList = `
                        <li class="list-name" data-listid="${list.listid}">${list.listname}</li>
                        `
                        //Append list
                        listUl.append(taskList);
                    })
                    
                    //append lists
                    $('.all-tasks-list').append(listUl);

                    // call function
                    getActiveList();
                    // set var
                    lastTaskList = $('.list-name:last');
                    console.log(lastTaskList)
                    //call function
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


    // Empty To-Do-List 
    toDoList.html('');

    $.ajax({
        url: '/focusWebApp/Applications/loadTasks',
		type: 'post',
		async: true,
		data: {
            "activeLiId": activeLiId,
            "date": date
		},
		statusCode: {
			200: function(tasks){
                console.log(tasks)
                // Set remaining task var
                let tasksRemaining = 0;
                
                // Check if there are tasks in the list
                if(tasks.length > 0){
                    // Tasks found

                    //Get HTML element
                    let tasksDiv = $('<div class="tasks"></div>');

                    // Insert tasks
                    tasks.forEach(function(task){

                        if (task.done == 1){
                            //If task is not finish count up
                            tasksRemaining++
                        }

                        let toDo =`
                        <div class="line-through"></div>
                        <div class="task" id="task-div">
                        <input type="checkbox" class="task-checkbox" id="task-${task.taskid}" data-state="${task.done}" data-taskid="${task.taskid}"` 
                        
                        // Check if task is already done
                        if (task.done === '2'){
                            toDo +=`checked`
                        }

                        toDo +=`>
                        <label for="task-${task.taskid}">
                            <span class="custom-checkbox"></span>
                            ${task.taskname}
                        </label>
                        </div>`
                        

                        let status = task.status;

                        //append task
                        tasksDiv.append(toDo);
                    })

                    //Display amount of not finished tasks
                    taskCount.text(tasksRemaining + ' tasks remaining');

                    //append tasks 
                    $('.to-do-list-tasks').append(tasksDiv);

                    //init var
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
                //Clear input
                newTaskInput.val('');
                //Call function
                loadLists(userId);
			},
			422: function(feedback){

			}
		},
    });
}

/*!!!finish task!!!*/
function finishedTask(e) {
    //stop even bubbling
    e.stopImmediatePropagation();

    //Init var
    const dayList = $('#to-do-day-view');
    let activeLi = $('.active-list'),
        activeLiId = activeLi[0].dataset.listid,
        task = e.target,
        taskId = task.dataset.taskid,
        state = task.dataset.state,
        done;
    
    // Check state
    if(state === '1'){
        //Checked
        done = "2"

    } else {
        //Unchecked
        done = "1"
    }
    
    task;
     
        $.ajax({
            url: '/focusWebApp/Applications/finishedTask',
            type: 'post',
            async: true,
            data: {
                "taskId": taskId,
                "done": done
            },
            statusCode: {
                200: function(feedback){
                    //Check wich overview should be loaded
                    // if($(dayList).hasClass('hide')){
                    //     //Call function
                    //     loadTasksWeekOverview(activeLiId);
                    // } else {
                    //     //Call function
                    //     loadTasks(activeLiId);
                    // }
                    //Call function
                    countFinishedTasks();
                },
                422: function(feedback){
                    
                }
            },
        });
}

function countFinishedTasks() {
        //Call function to get current weekdays
        getCurrentWeekdays();

        //Init var
        let jsonDate = JSON.stringify(currentWeekDayDates),
            countedDayTasks = [],
            mon = [],
            tue = [],
            wed = [],
            thu = [],
            fri = [],
            sat = [],
            sun = [];


        $.ajax({
            url: '/focusWebApp/Applications/countFinishedTasks',
            type: 'post',
            async: true,
            data: {
                "jsonDate": jsonDate,
                
            },
            statusCode: {
                200: function(tasks){
                    
                    let countedTasks = tasks.length;
                    // Set how may tasks have been done for each day
                    tasks.forEach(function(task){
                        
                        if (currentWeekDayDates[0] == task.date){
                            mon.push(task.date);
                        } else if (currentWeekDayDates[1] == task.date){
                            tue.push(task.date);
                        } else if (currentWeekDayDates[2] == task.date){
                            wed.push(task.date);
                        } else if (currentWeekDayDates[3] == task.date){
                            thu.push(task.date);
                        } else if (currentWeekDayDates[4] == task.date){
                            fri.push(task.date);
                        } else if (currentWeekDayDates[5] == task.date){
                            sat.push(task.date);
                        } else if (currentWeekDayDates[6] == task.date){
                            sun.push(task.date);
                        }
                    })
                    
                    // Get the length
                    countMon = mon.length;
                    countTue = tue.length;
                    countWed = wed.length;
                    countThu = thu.length;
                    countFri = fri.length;
                    countSat = sat.length;
                    countSun = sun.length;

                    //all days kumulated
                    countedDayTasks.push(countMon, countTue, countWed, countThu, countFri, countSat, countSun);

                    //Call function with parameters
                    setFinishedTasks(countedTasks, countedDayTasks);
                },
                422: function(){

                }
            },
        })
}

function setFinishedTasks(tasks, dayTasks) {
    //Init var
    // Get Num of current week
    let week = $('.week-button').html()
    let split = week.split(' ');
    let weekNumber = split[1];
    // Strigify array
    let jsonDayTasks = JSON.stringify(dayTasks);
    
    $.ajax({
        url: '/focusWebApp/Applications/setFinishedTasks',
        type: 'post',
        async: true,
        data: {
            "tasks": tasks,
            "weekNumber": weekNumber,
            "dayTasks": jsonDayTasks
        },
        statusCode: {
            200: function(){
                //database updated
       
            },
            422: function(){
                //failed
            }
        },
    })

}


/*!!! If date changed reload content!!!*/
function checkForNewDate(){
    console.log('youiaesufbiwcqas');
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
    // taskListDayView.css({'grid-column': '1/3', 'margin-top': '30px'});
    // Create WeekOverview
    createWeekLists();
    // set active List
    activeList(firstTaskList);
}


function getCurrentWeekdays() {
        //Clear array if function has already been called
        currentWeekDayDates = [];
        // Change the display of the dates
        for(let i = 0; i< currentWeekDays.length; i++){
            let changedDays = currentWeekDays[i].toLocaleString('en-us', {
                          month: 'numeric',
                     day: 'numeric',
                    year: 'numeric',
        })
    
         // Change the '/' with '.'
        changedDays = changedDays.replace("/", ".");
        changedDays = changedDays.replace("/", ".");
        // push dates in array
        currentWeekDayDates.push(changedDays);
    }
}

function createWeekLists() {
    //Init var
    const originalToDoList = $('#to-do-day-view');
    let weekView = $('.week-view')
    let DomDay = [];
    getCurrentWeekdays();

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
                <input type="text" class="new task new-task-input input input2" placeholder="New task name" aria-label="new task name">
                <button  class="btn create new-task-btn-week" data-userid=" aria-label="create new task">+</button>
            </form>
            <p class="error alert2"></p>
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

    // Set the ID's and dayname
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
    
}

function loadTasksWeekOverview(activeLiId){
    //Get the current days
    getCurrentWeekdays();

    //Convert to JSON
    let jsonDate = JSON.stringify(currentWeekDayDates);

    // Remove Task if they already have been loaded
     $('.tasks').html('');
    
    $.ajax({
        url: '/focusWebApp/Applications/loadTasksWeek',
		type: 'post',
		async: true,
		data: {
            "activeLiId": activeLiId,
            "jsonDate": jsonDate
        },
        statusCode: {
            200: function(tasks){
                //Check for tasks
                if(tasks.length > 0){
                    // Tasks found
                    let listsArray = []
                    let lists = $('.week-view');

                    //Get every to-do-list-elment and push into array
                    for(let i = 0; i< lists.length; i++){
                        listsArray.push(lists[i]);
                    }
                    
                    //display task according to their day
                    listsArray.forEach(function(list){
                        let date = $(list).find('.to-do-day').text();
                        let tasksDiv = $(list).find('.tasks')
                        let toDoListTasks = $(list).find('.to-do-list-tasks');
                   
                        tasks.forEach(function(task){
                            
                            if(date === task.date) {

                                let toDo =`
                                <div class="task" id="task-div">
                                <input type="checkbox" class="task-checkbox" id="task-${task.taskid}" data-state="${task.done}" data-taskid="${task.taskid}"` 
                                
                                // Check if task is already done
                                if (task.done === '2'){
                                    toDo +=`checked`
                                }
        
                                toDo +=`>
                                <label for="task-${task.taskid}">
                                    <span class="custom-checkbox"></span>
                                    ${task.taskname}
                                </label>
                                </div>`
                        
                            let status = task.status;
                            
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
}

function addNewTaskWeekView(e) {
    //Init data
    e.stopImmediatePropagation();
    let btn = e.target;
    let newTaskField = $(btn).prev();
    let errorText = $(btn).parent().next();
    let newTask = $(btn).prev().val();
    let activeLi = $('.active-list');
    let activeLiId;
    
    //Check if a list is choosen
    if (activeLi[0] == undefined){
        //No list is choosen, set an empty var and create the error message
        activeLiId = '';
    } else {
        // List is found, bind the task to the active list
        activeLiId = activeLi[0].dataset.listid;
    }

    let userId = newTaskBtn[0].dataset.userid;
    let date = $(btn).parents('.week-view').children('.header-weekview').children('.weekday-long').children('.to-do-day').text();
    console.log(activeLiId)

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
                successValidation(newTaskField);
                setTimeout(function(){
                    $(btn).prev().val('');
                    loadTasksWeekOverview(activeLiId);
                    $(newTaskField).css({ "border-bottom": '1px solid lightgray' });
            }, 1000)
			},
			422: function(errors){
                failedValidationWeekView(errors, newTaskField, errorText);
                // alert('you cant add a empty task');
			}
		},
    });
    
    //Prevent default behavior
    e.preventDefault();
}

// Animation of to-do-list
function animateWeekView(){
    //Init var
    const weekView = $('.week-view');

    console.log(weekView);

    //Animate
    gsap.from(weekView, {opacity:0, duration: 3.5, delay: 1, stagger: .5})
    gsap.to(lists, {x:-350, duration: 1, delay: .5})
}

function animateDayView(){
    //Init var
    const dayView = $('.todo-list');

    //Animate
    gsap.from(dayView, {opacity:0, duration: 1, delay: 1})
    gsap.to(lists, {x:0, duration: 1, delay: .5})

}




