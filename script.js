document.addEventListener("DOMContentLoaded", () => {
    plusBtn = document.getElementById("plus-btn");
    popup = document.getElementById("popup");
    noteContainer = document.getElementById("note-container");
    newTitle = document.getElementById("title-add");
    newDescription = document.getElementById("description-add");

    plusBtn.addEventListener("click", () => {
        popup.style.display = "flex";

    });

    newTitle.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    });

    newDescription.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    });




})