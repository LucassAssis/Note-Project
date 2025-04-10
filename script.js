document.addEventListener("DOMContentLoaded", () => {
    plusBtn = document.getElementById("plus-btn");
    popup = document.getElementById("popup");
    noteContainer = document.getElementById("note-container");
    newTitle = document.getElementById("title-add");
    newDescription = document.getElementById("description-add");
    noteCancelBtn = document.getElementById("note-cancel");

    plusBtn.addEventListener("click", () => {
        popup.style.display = "flex";
        noteContainer.classList.add("blur");
        popup.addEventListener("keydown", (e) => {
            if (e.key === 'Escape') {
                popup.style.display = "none";
                newTitle.value = "";
                newDescription.value = "";
                noteContainer.classList.remove("blur");
            }
        });
        plusBtn.addEventListener("keydown", (e) => {
            if (e.key === 'Escape') {
                popup.style.display = "none";
                newTitle.value = "";
                newDescription.value = "";
                noteContainer.classList.remove("blur");
            }
        })
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

    noteCancelBtn.addEventListener("click", () => {
        popup.style.display = "none";
        newTitle.value = "";
        newDescription.value = "";
        noteContainer.classList.remove("blur");
    });
})