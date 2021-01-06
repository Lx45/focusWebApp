/*!!!Init Variables!!!*/
let newListInput = $('#new-list-input');
let newListBtn = $('#new-list-btn');
let firstTaskList = $('.task-list .list-name:first');
let lastTaskList = $('.task-list .list-name:last');
let deleteListBtn = $('#delete-btn');


let newTaskInput = $('#new-task-input');
let newTaskBtn = $('#new-task-btn');
let checkbox = $('.task-checkbox');
let task = $('#task.div')


/*!!!Eventhandler!!!*/
newListBtn.on('click', addNewList);
getActiveList();
    // function get called by default on the first task list of the user
activeList(firstTaskList);
deleteListBtn.on('click', deleteList);

newTaskBtn.on('click', addNewTask);
checkbox.on('click', finishedTask);

function getActiveList() {
    let li = $('li');
    li.on('click',activeList);
}
/*!!!Choose active Tasklist!!!*/
function activeList(event) {
    //Init data
    let activeLi;

    // Check if function was called by onclick or by default
        if(event == firstTaskList || event == lastTaskList) {
            activeLi = $(event);
        } else {
            activeLi = $(event.target);
        }

    let activeLiId = activeLi[0].dataset.listid;
    let listname = activeLi.html();
    let listTitle = $('.list-title');

    console.log(listname);
    console.log(activeLiId);

    //Set list-title
    listTitle.html(listname);

    //Unset active class
    $('.task-list .list-name').removeClass('active-list');

    // Set active class
    activeLi.addClass('active-list');

    //load the current Tasklist
    loadTasks(activeLiId);
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

    console.log(userId);

    $.ajax({
        url: '/focusWebApp/Applications/addNewTask',
		type: 'post',
		async: true,
		data: {
            "newTask": newTask,
            "userId": userId,
            "activeLiId": activeLiId
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

    // Empty To-Do-List 
    toDoList.html('');

    $.ajax({
        url: '/focusWebApp/Applications/loadTasks',
		type: 'post',
		async: true,
		data: {
            "activeLiId": activeLiId,
            // "userId": userId
		},
		statusCode: {
			200: function(tasks){
                console.log(tasks);
                console.log(tasks.status);
                let tasksRemaining = tasks.length;
                console.log(tasksRemaining);
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
                        console.log(task.status);
                        let status = task.status;
                        console.log(status);
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