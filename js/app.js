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
                    <a href="#" class="btn btn-primary">Delete Note</a>
                </div>
            </div>`;
    });

    let notesElements = document.getElementById('notes');

    if (notesElements.length != 0) {
        notesElements.innerHTML = myHTML;
    }


}