// Init variables
let newListInput = $('#new-list-input');
let newListBtn = $('#new-list-btn');
let li = $('li');

let newTaskInput = $('#new-task-input');
let newTaskBtn = $('#new-task-btn');


//Eventhandler
newListBtn.on('click', addNewList);
li.on('click', activeList);

newTaskBtn.on('click', addNewTask);


//Choose active Tasklist
function activeList(event) {

    //Init data
    let activeLi = $(event.target);
    let activeLiId = activeLi[0].dataset.listid

    console.log(activeLiId);

    // Set active class
    activeLi.addClass('active-list');

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
                
                let taskDiv = $('<div class="task"></div>');

                tasks.forEach(function(task){

                    let toDo = `<input type="checkbox" id="task-${task.taskid}">
                    <label for="task-${task.taskid}">
                        <span class="custom-checkbox"></span>
                        ${task.taskname}
                    </label>`

                    taskDiv.append(toDo);
                })

                $('.task').replaceWith(taskDiv);
			},
			422: function(){
                alert('To-Do-list can not be reloaded');
			}
		},
    });
}

// Add new Task to To-Do-List
function addNewTask(e) {

    // Init data
    let newTask = newTaskInput.val();
    let userId = newTaskBtn[0].dataset.userid;

    console.log(userId);

    $.ajax({
        url: '/focusWebApp/Applications/addNewTask',
		type: 'post',
		async: true,
		data: {
            "newTask": newTask,
            "userId": userId
		},
		statusCode: {
			200: function(feedback){
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

// Add new list to TaskLists
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
			},
			422: function(feedback){
                alert('failed');
			}
		},
    });

    // Prevent the default behavior of refreshing the page
    e.preventDefault();
}














// // Add new Task to task list
// function addNewList(e) {
//     // Get Input of new task
//     let newList = newListInput.val();
//     console.log(newList);

//     // Create List-element
//     let taskListUl = $('.task-list');
//     let taskListLi = $(`<li class="list-name">${newList}</li>`);

//     //append List element
//     taskListUl.append(taskListLi);


//     e.preventDefault();
// }