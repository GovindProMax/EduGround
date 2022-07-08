console.log("I am working");
noteCards();

// Working on the add note button
let addBtn = document.getElementById('addBtn');

//Add an event listner
addBtn.addEventListener("click", function (e) {

    //Working on the input text area 
    let addTxt = document.getElementById('addTxt');

    // Check to see the current local storage 
    let currentNotes = localStorage.getItem("currentNotes");

    //Clear the notesObj is nothing inside local storage
    if (currentNotes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(currentNotes);
    }

    //Add the value inside text area to the notesObj array
    notesObj.push(addTxt.value);
    //Update the local storage
    localStorage.setItem("currentNotes", JSON.stringify(notesObj));
    //Reset the value of the text area
    addTxt.value = "";

    noteCards();

})

function noteCards() {
    let currentNotes = localStorage.getItem("currentNotes");
    //Clear the notesObj is nothing inside local storage
    if (currentNotes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(currentNotes);
    }
    let myHTML = ""

    notesObj.forEach(function (element, index) {
        myHTML += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1} </h5>
                    <p class="card-text">${element}</p>
                    <button id= "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
                </div>
            </div>`;
    });

    let notesElements = document.getElementById('notes');

    //Set innerHTML according to logic
    if (notesObj.length != 0) {
        notesElements.innerHTML = myHTML;
    }
    else {
        notesElements.innerHTML = `
        <div class="container-fluid">
        <div class="row">
            <h3 class="mx-auto">No Notes Present</h3>
        </div>
        <div class="row">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-emoji-frown mx-auto" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </svg>
        </div>
    </div>`

    }
}

// function to delete a note

function deleteNote(index) {
    let currentNotes = localStorage.getItem("currentNotes");

    //Clear the notesObj is nothing inside local storage
    if (currentNotes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(currentNotes);
    }

    //Delete the object at index
    notesObj.splice(index,1)
    
    //Update the local storage
    localStorage.setItem("currentNotes", JSON.stringify(notesObj));
    noteCards();

}