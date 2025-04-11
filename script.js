document.addEventListener("DOMContentLoaded", () => {
    plusBtn = document.getElementById("plus-btn");
    popup = document.getElementById("popup");
    noteContainer = document.getElementById("note-container");
    newTitle = document.getElementById("title-add");
    newDescription = document.getElementById("description-add");
    noteAddBtn = document.getElementById("note-add")
    noteCancelBtn = document.getElementById("note-cancel");

    let selectedColor = "";

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

    document.querySelectorAll(".color-circle").forEach((circle) => {
        circle.addEventListener("click", () => {

            document.querySelectorAll(".color-circle").forEach(c => c.classList.remove("select"));

            circle.classList.add("select");
            selectedColor = circle.getAttribute("data-color");

        });
    });

    noteAddBtn.addEventListener("click", () => {
        if (!newTitle.value.trim() || !newDescription.value.trim()) return;


        const note = document.createElement("div");
        note.classList.add("note");
        note.style.backgroundColor = selectedColor || "white";

        const title = document.createElement("span");
        title.classList.add("note-title");
        title.textContent = newTitle.value;

        const description = document.createElement("span");
        description.classList.add("note-description");
        description.textContent = newDescription.value;

        const lightTextColors = ['#4336f4', '#ff007f'];
        if (lightTextColors.includes(selectedColor)) {
            spanTitle.style.color ="white"
            spanDescription.color ="white"
        }

        note.appendChild(title);
        note.appendChild(description);
        noteContainer.appendChild(note);
        popup.style.display = "none"

        noteContainer.classList.remove("blur");
        newTitle.value = "";
        newDescription.value = "";
        saveNotes();
    })


    noteCancelBtn.addEventListener("click", () => {
        popup.style.display = "none";
        newTitle.value = "";
        newDescription.value = "";
        noteContainer.classList.remove("blur");

    });

    const saveNotes = () => {
        // Criando array notes
        const notes = [];
        // Pega todos os elementos que estão dentro do #id-container e que tenham a classe .note, depois faça um forEach(ou seja, percorra um por um) e pra cada um desses elementos execute essa função onde item representa o elemento atual.
        document.querySelectorAll("#note-container .note").forEach((item) => {

            const spanTitle = item.querySelector(".note-title");
            const spanDescription = item.querySelector(".note-description");
            notes.push({
                title: spanTitle.textContent,
                description: spanDescription.textContent,
                color: item.style.backgroundColor
            });
        });
        localStorage.setItem("notes", JSON.stringify(notes));
    }
})