// Constructor for book
function Book(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
}
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("tableBody").deleteRow(i - 1);
    let display = new Display();
    display.show('success', 'Your book has been deleted.')
}

class Display {
    add(book) {
        console.log("Adding book to the table");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.genre}</td>
                            <td><input type="button" value="Delete" onclick="deleteRow(this)"></td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }


    // Input Validation
    validate(book) {
        if (book.title.length < 2 || book.author.length < 2 || book.author.length > 100 || book.author.length > 100) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else if (type === 'danger') {
            boldText = 'Error!';
        }
        else if (type === 'rowDeleteSuccesfull') {
            boldText = 'Success';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldText}:</strong> ${displayMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
    </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    }
}


// Handle the form
let libraryForm = document.getElementById('libraryForm');

// Add an eventlistner to the form
libraryForm.addEventListener('submit', libraryFormSubmit);

// Control what happens when the form is submitted
function libraryFormSubmit(e) {
    console.log('Form submission successfull');
    let title = document.getElementById('bookTitle').value;
    let author = document.getElementById('author').value;
    let genre;

    // check to see which radio button has been clicked
    var ele = document.getElementsByTagName('input');

    for (i = 0; i < ele.length; i++) {

        if (ele[i].type == "radio") {

            if (ele[i].checked)
                genre = ele[i].value;
        }
    }

    let book = new Book(title, author, genre);
    console.log(book);
    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }
    //Prevent page from refreshing everytime the form is submitted
    e.preventDefault();
}