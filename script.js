document.addEventListener("DOMContentLoaded", () => {
    const plusBtn = document.getElementById("plus-btn");
    const popup = document.getElementById("popup");
    const noteContainer = document.getElementById("note-container");
    const newTitle = document.getElementById("title-add");
    const newDescription = document.getElementById("description-add");
    const noteAddBtn = document.getElementById("note-add")
    const noteCancelBtn = document.getElementById("note-cancel");

    let selectedColor = "";

    plusBtn.addEventListener("click", () => {
        document.querySelectorAll(".color-circle").forEach(c => c.classList.remove("select"));
        selectedColor = "";
        popup.style.display = "flex";
        noteContainer.classList.add("blur");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === 'Escape' && popup.style.display === "flex") {
            popup.style.display = "none";
            newTitle.value = "";
            newDescription.value = "";
            noteContainer.classList.remove("blur");
        }
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

    // Adicionando evento de clique nas cores
    document.querySelectorAll(".color-circle").forEach((circle) => {
        circle.addEventListener("click", () => {

            document.querySelectorAll(".color-circle").forEach(c => c.classList.remove("select"));

            circle.classList.add("select");
            selectedColor = circle.getAttribute("data-color");

        });
    });

    // Adicionando evento de clique no botão de adicionar nota
    noteAddBtn.addEventListener("click", () => {
        if (!newTitle.value.trim() || !newDescription.value.trim()) return;

        const note = createTasks(newTitle.value, newDescription.value, selectedColor);
        noteContainer.appendChild(note);
        popup.style.display = "none"
        noteContainer.classList.remove("blur");
        newTitle.value = "";
        newDescription.value = "";
        saveNotes();
    })

    // Função que cria notas 
    const createTasks = (newTitle, newDescription, color) => {
        const note = document.createElement("div");
        note.classList.add("note");
        note.style.backgroundColor = color || "white";

        const title = document.createElement("span");
        title.classList.add("note-title");
        title.textContent = newTitle;

        const description = document.createElement("span");
        description.classList.add("note-description");
        description.textContent = newDescription;


        const deleteDiv = document.createElement("div");
        deleteDiv.classList.add("delete-div");
        note.appendChild(deleteDiv);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "./imgs/trash.png";
        deleteIcon.classList.add("trash-icon");

        deleteBtn.appendChild(deleteIcon);
        deleteBtn.addEventListener("click", () => {
            note.remove();
            saveNotes();
        })

        deleteDiv.appendChild(deleteBtn)


        const lightTextColors = ['#', '#'];
        if (lightTextColors.includes(color)) {
            title.style.color = "white"
            description.style.color = "white"
            title.style.borderBottom = "1px solid white"
        }

        note.appendChild(title);
        note.appendChild(description);
        note.appendChild(deleteDiv);

        return note;
    }

    // Adicionando evento de clique no botão de cancelar
    noteCancelBtn.addEventListener("click", () => {
        popup.style.display = "none";
        newTitle.value = "";
        newDescription.value = "";
        noteContainer.classList.remove("blur");
    });

    // Função que salva as notas no localStorage
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

    // Função que carrega as notas do localStorage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem("notes"));
        if (!notes) return; // Se não houver nada no localStorage, retorna.
        notes.forEach((noteData) => {

            const note = createTasks(noteData.title, noteData.description, noteData.color);
            noteContainer.appendChild(note);
        })
    }
    loadNotes();
})