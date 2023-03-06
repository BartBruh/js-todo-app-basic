"use strict";

const task_list_ul = document.getElementById("task-list-container");
const main_input = document.getElementById("main-input");

var todos = JSON.parse(localStorage.getItem("todos")) || {};
var input_control_key_pressed = false;

function strike_task(event){
    let task = event.target.parentNode.parentNode;
    let task_text = task.querySelector(".task-text");
    task_text.classList.toggle("strike");
}

function edit_task(event){
    // Getting the task element and old value of the task text
    let task = event.target.parentNode.parentNode.parentNode;
    let task_text = task.querySelector(".task-text");
    let task_text_old_val = task_text.innerText;

    // Creating textarea element for new input
    let task_edit_input = document.createElement("textarea");
    task_edit_input.classList.add("task-edit-input");
    task_edit_input.value = task_text_old_val;
    task_text.innerText = "";
    task_text.appendChild(task_edit_input);
    task_edit_input.focus();
    // setting height of textarea element
    task_edit_input.style.height = task_edit_input.scrollHeight + "px";

    // Adding event listeners to the input element
    task_edit_input.addEventListener("keydown", (event) => {
        input_control_key_pressed = false;
        if(event.key == "Enter"){
            input_control_key_pressed = true;
            task_text.innerText = task_edit_input.value;
        }else if (event.key == "Escape"){
            input_control_key_pressed = true;
            task_text.innerText = task_text_old_val;
        }
    })
    task_edit_input.addEventListener("blur", (event) => {
        if(!input_control_key_pressed){
            task_text.innerText = task_edit_input.value;
        }
    })
    // dynamically changing textarea height with text input
    task_edit_input.addEventListener("input", () => {
        task_edit_input.style.height = task_edit_input.scrollHeight + "px";
    })
}

function delete_task(event){
    let task = event.target.parentNode.parentNode.parentNode;
    task.remove();
}

function add_task(){
    let text = main_input.value;
    if(text.trim() != ""){
        // Create task list item
        let task_list_item = document.createElement("li");
        task_list_item.classList.add("task-item");
        // task_list_ul.prepend(task_list_item);    // adds new task to the top
        task_list_ul.appendChild(task_list_item);
        
        // Create task item main container
        let task_item_main = document.createElement("span");
        task_item_main.classList.add("task-item-main");
        task_list_item.appendChild(task_item_main);

        // Create task text
        let task_text = document.createElement("p");
        task_text.classList.add("task-text");
        task_text.innerText = text;
        task_item_main.appendChild(task_text);
        
        // Create task options container
        let task_options = document.createElement("span");
        task_options.classList.add("task-options");
        task_item_main.appendChild(task_options);
        
        // Create task checkbox
        let task_checkbox = document.createElement("input");
        task_checkbox.type = "checkbox";
        task_checkbox.classList.add("task-checkbox");
        task_checkbox.addEventListener("click", (event) => strike_task(event));
        task_options.appendChild(task_checkbox);
        
        // Create task edit button
        let task_edit = document.createElement("button");
        task_edit.classList.add("task-edit");
        task_edit.addEventListener("click", (event) => edit_task(event));
        task_options.appendChild(task_edit);
        // Create task edit icon
        let pen_mark = document.createElement("i");
        pen_mark.classList.add("fa-solid", "fa-pen");
        task_edit.appendChild(pen_mark);
        
        // Create task delete button
        let task_delete = document.createElement("button");
        task_delete.classList.add("task-delete");
        task_delete.addEventListener("click" ,(event) => delete_task(event));
        task_options.appendChild(task_delete);
        // Create task delete icon
        let x_mark = document.createElement("i");
        x_mark.classList.add("fa-solid", "fa-xmark");
        task_delete.appendChild(x_mark);
        
        // Create hr break
        let hr_break = document.createElement("hr");
        task_list_item.appendChild(hr_break);

        // Scroll to the newly added list item
        task_list_item.scrollIntoView();
    }
    // Clear input
    main_input.value = "";
}

main_input.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        event.preventDefault();
        add_task();
    }
})