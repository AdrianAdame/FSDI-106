var isImportant = false;
var isVisible = true;

/**
 * Clears task function from previous data
 */
function clearTaskForm(){
    $("#inputTitle").val('')
    $("#inputDate").val('')
    $("#inputDescription").val('')
    $("#inputColor").val('#0000')
    $("#inputStatus").val('none')
    $("#inputBudget").val('')
}

/**
 * Re-renders new task in pending tasks division
 * @param {Task} task 
 */
function displayTask(task) {
    const pendingTasks = $(".pending-tasks");

    let taskImportance = "";
    let labelSelection = "";

    if (task.important) {
        taskImportance = `
        <div class="flex-row flex-start">
            <span class="badge rounded-pill bg-warning text-dark"><i class="fa-solid fa-fire"></i> Important Task</span>
        </div>`;
    }

    if (task.status === "New") {
        labelSelection = `<span class="badge rounded-pill bg-primary">${task.status}</span>`;
    } else if (task.status === "In Progress") {
        labelSelection = `<span class="badge rounded-pill bg-info text-dark">${task.status}</span>`;
    } else if (task.status === "Completed") {
        labelSelection = `<span class="badge rounded-pill bg-success">${task.status}</span>`;
    } else if (task.status === "Cancelled") {
        labelSelection = `<span class="badge rounded-pill bg-danger">${task.status}</span>`;
    } else {
        labelSelection = `<span class="badge rounded-pill bg-danger">Not valid</span>`;
    }

    let card = `
        <div class="task-card" style="border: solid ${
            task.color
        };border-width: 1px 1px 1px 8px;" id="${task._id}">
            <div class="flex-col space-evenly" style="flex:2;">
                <h5>${task.title}</h5>
                <p class="description">${task.description}</p>
                ${taskImportance}
            </div>
            <label style="flex:1;">
                ${labelSelection}
            </label>
            <div>
                <h5>${new Date(
                    task.date || task.startDate || task.dueDate
                ).toLocaleDateString()}</h5>
                <p><b>Budget: </b>$ ${task.budget}</p>
                <a id="delete-btn"><i class="fa-solid fa-trash" style="color: #cd381d;"></i></a>
            </div>
        </div>
    `;

    pendingTasks.append(card);
}

/**
 * Fetch all task and filter by name, then renders all task into DOM
 */
function displayAllTasks() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: (res) => {
            let tasks = JSON.parse(res);

            //tasks = tasks.filter(task => task.title === "Market")
            tasks = tasks.filter((task) => task.user === "AdrianA");

            if (tasks.length > 0) {
                tasks.map((task) => {
                    displayTask(task);
                });
            } else {
                alert("No data available!");
            }
        },
        error: (err) => {
            console.log(err);
        },
    });
}

/**
 * Validate task form texts input before creating the task object and prevent sending invalid data
 *
 * @param {String} title
 * @param {Date} date
 * @param {String} description
 * @param {String} color
 * @param {String} status
 * @param {Number} budget
 */
function isTaskValidate(title, date, description, color, status, budget) {
    let isValid = true;

    if (title == "") {
        isValid = false;
    }

    if (date == "") {
        isValid = false;
    }

    if (description == " ") {
        isValid = false;
    }

    if (color == "") {
        isValid = false;
    }

    if (status == "none") {
        isValid = false;
    }

    if (budget < 0) {
        isValid = false;
    }

    $("#error-alert").addClass("show")

    return isValid;
}

/**
 *  1.- Takes inputs from the task in html
 *  2.- Create a task object to be sended to server via POST
 *  3.- Refreshes current pending tasks
 */
function saveTask() {
    //Get the values
    const title = $("#inputTitle").val();
    const date = $("#inputDate").val();
    const description = $("#inputDescription").val();
    const color = $("#inputColor").val();
    const status = $("#inputStatus").val();
    const budget = $("#inputBudget").val();

    if (isTaskValidate(title, date, description, color, status, budget)) {
        //Build an object
        const newTask = new Task(
            title,
            date,
            description,
            color,
            status,
            budget,
            isImportant
        );

        //Save to server
        $.ajax({
            type: "POST",
            url: "http://fsdiapi.azurewebsites.net/api/tasks/",
            data: JSON.stringify(newTask),
            contentType: "application/json",
            success: (res) => {
                //Display the task
                displayTask(newTask);

                //Clear task form
                clearTaskForm();

                $(".pending-tasks").animate(
                    { scrollTop: $(".pending-tasks").prop("scrollHeight") },
                    1000
                );
            },
            error: (err) => {
                alert("Task not saved in server");
            },
        });
    } else {
        alert("The task could not be saved in DB");
    }
}

/**
 * Deletes a task from the server using API endopoint and task id to delete
 * @param {String} id
 * @param {JQueryElement} elem
 */
function deleteTask(id, elem) {
    $.ajax({
        type: "DELETE",
        url: `http://fsdiapi.azurewebsites.net/api/tasks/${id}`,
        success: (res) => {
            console.log(res);
            alert("Task deleted succesfully!");

            elem.remove();
        },
        error: (err) => {
            alert("Task not deleted from server");
        },
    });
}

/**
 * Delete all task from DOM but not from BD
 */
function deleteAllTasks() {
    alert(`All task will be "Deleted:)"`);

    $(".pending-tasks").empty();
    alert(`All task "deleted:)"`);
}

/**
 * Toogle functionality for important flag task
 */
function toggleImportant() {
    const nonImportantIcon = "fa-solid fa-fire";
    const importantIcon = "fa-solid fa-fire important-icon";

    if (!isImportant) {
        $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon);
    } else {
        $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon);
    }

    isImportant = !isImportant;
}

/**
 * Toggle functionality for show/hide tasks creator inputs
 */
function toggleVisibility() {
    if (isVisible) {
        $("#form").fadeOut("slow");
    } else {
        $("#form").fadeIn("slow");
    }

    isVisible = !isVisible;
}

/**
 * Initialization function that loads data if there's any and hook events to object in DOM
 */
const init = () => {
    //Load data
    displayAllTasks();

    //Hook events
    $("#btnSave").on("click", saveTask);
    $("#iImportant").on("click", toggleImportant);
    $("#btnDetails").on("click", toggleVisibility);
    $("#btnDeleteAll").on("click", deleteAllTasks);

    $(".pending-tasks").on("click", "a#delete-btn", (e) => {
        let id = $(e.target).parent().parent().parent().prop("id");
        deleteTask(id, $(e.target).parent().parent().parent());
    });
};

window.onload = init