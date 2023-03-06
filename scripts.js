"use strict";

const task_list_pane = document.getElementById("task-list-pane");
const task_list_ul = document.getElementById("task-list-container");
const main_input = document.getElementById("main-input");

var input_control_key_pressed = false;

var add_new_todos_to_top = false;

function strike_task(event) {
    let task = event.target.parentNode.parentNode;
    let task_text = task.querySelector(".task-text");
    task_text.classList.toggle("strike");
}

function edit_task(event) {
    // getting the task element and old value of the task text
    let task = event.target.parentNode.parentNode.parentNode;
    let task_text = task.querySelector(".task-text");
    let task_text_old_val = task_text.innerText;

    // creating textarea element for new input
    let task_edit_input = document.createElement("textarea");
    task_edit_input.classList.add("task-edit-input");
    task_edit_input.rows = 1;
    task_edit_input.value = task_text_old_val;
    task_text.innerText = "";
    task_text.appendChild(task_edit_input);
    task_edit_input.focus();
    // setting height of task edit textarea element
    task_edit_input.style.height = task_edit_input.scrollHeight + "px";
    scroll_to_task(task);

    // adding event listeners to the input element
    task_edit_input.addEventListener("keydown", (keydown_event) => {
        input_control_key_pressed = false;
        if (keydown_event.key == "Enter") {
            if (task_edit_input.value.trim() == "") delete_task(event);
            else{
                input_control_key_pressed = true;
                task_text.innerText = task_edit_input.value.trim();
            }
        } else if (keydown_event.key == "Escape") {
            input_control_key_pressed = true;
            task_text.innerText = task_text_old_val;
        }
    })
    task_edit_input.addEventListener("blur", () => {
        if (!input_control_key_pressed) {
            if (task_edit_input.value.trim() == "") delete_task(event);
            else {
                task_text.innerText = task_edit_input.value.trim();
            }
        }
    })
    // dynamically changing textarea height with text input
    task_edit_input.addEventListener("keyup", () => {
        task_edit_input.style.height = "auto";
        task_edit_input.style.height = task_edit_input.scrollHeight + "px";
        scroll_to_task(task);
    })
}

function delete_task(event) {
    let task = event.target.parentNode.parentNode.parentNode.parentNode;
    task.remove();
}

function add_task() {
    let text = main_input.value;
    if (text.trim() != "") {
        // create task list item
        let task_list_item = document.createElement("li");
        task_list_item.classList.add("task-item");
        if (add_new_todos_to_top) task_list_ul.prepend(task_list_item);
        else task_list_ul.appendChild(task_list_item);

        // create task item main container
        let task_item_main = document.createElement("span");
        task_item_main.classList.add("task-item-main");
        task_list_item.appendChild(task_item_main);

        // create task text
        let task_text = document.createElement("p");
        task_text.classList.add("task-text");
        task_text.innerText = text;
        task_item_main.appendChild(task_text);

        // create task options container
        let task_options = document.createElement("span");
        task_options.classList.add("task-options");
        task_item_main.appendChild(task_options);

        // create task checkbox
        let task_checkbox = document.createElement("input");
        task_checkbox.type = "checkbox";
        task_checkbox.classList.add("task-checkbox");
        task_checkbox.addEventListener("click", (event) => strike_task(event));
        task_options.appendChild(task_checkbox);

        // create task edit button
        let task_edit = document.createElement("button");
        task_edit.classList.add("task-edit");
        task_edit.addEventListener("click", (event) => edit_task(event));
        task_options.appendChild(task_edit);
        // create task edit icon
        let pen_mark = document.createElement("i");
        pen_mark.classList.add("fa-solid", "fa-pen");
        task_edit.appendChild(pen_mark);

        // create task delete button
        let task_delete = document.createElement("button");
        task_delete.classList.add("task-delete");
        task_delete.addEventListener("click", (event) => delete_task(event));
        task_options.appendChild(task_delete);
        // create task delete icon
        let x_mark = document.createElement("i");
        x_mark.classList.add("fa-solid", "fa-xmark");
        task_delete.appendChild(x_mark);

        // create hr break
        let hr_break = document.createElement("hr");
        task_list_item.appendChild(hr_break);

        // scroll to the newly added list item
        task_list_item.scrollIntoView();
    }
    // clear input
    main_input.value = "";
}

function scroll_to_task(task) {
    // scroll top of task into view if it is above visible area of task list pane
    if (task_list_pane.scrollTop > task.offsetTop) {
        task.scrollIntoView();
    }
    // scroll bottom of task into view if it is under visible area of task list pane
    if (task_list_pane.scrollTop + task_list_pane.clientHeight < task.offsetTop + task.scrollHeight) {
        task.scrollIntoView(false);
    }
}

main_input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        add_task();
    }
})