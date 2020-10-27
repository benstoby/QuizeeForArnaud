document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByClassName('notdisplay');
    for (let element of elements) {
        element.checked = false; 
    }
});