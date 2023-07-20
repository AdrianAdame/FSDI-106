var isImportant = false;
var isVisible = true;

function saveTask(){
    console.log("Saving task!")
}

function toggleImportant(){
    const nonImportantIcon = "fa-solid fa-fire"
    const importantIcon = "fa-solid fa-fire important-icon"

    if(!isImportant){
        $("#iImportant")
        .removeClass(nonImportantIcon)
        .addClass(importantIcon)
    }else{
        $("#iImportant")
        .removeClass(importantIcon)
        .addClass(nonImportantIcon)
    }

    isImportant = !isImportant
}

function toggleVisibility() {
    if(isVisible){
        $("#form").fadeOut("slow")
    }else{
        $("#form").fadeIn("slow")
    }

    isVisible = !isVisible
}

const init = () => {
    //Load data

    //Hook events
    $("#btnSave").on('click', saveTask)
    $("#iImportant").on('click', toggleImportant)
    $("#btnDetails").on('click', toggleVisibility)
}

window.onload = init