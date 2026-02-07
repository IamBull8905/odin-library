const myLibrary = [];
const table = document.getElementById("library-table");
const dialog = document.querySelector("dialog");
const openButton = document.getElementById("open-form");
const closeButton = document.getElementById("close-form");
const submitButton = document.getElementById("submit-button");
const form = document.querySelector("form");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read-book");

openButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new operator to call the constructor!");
  };
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
};

function updateCellContents(currentBook, newCell, newCellIndex) {
    if (newCellIndex === 0) {
        newCell.textContent = currentBook.title;
    } else if (newCellIndex === 1) {
        newCell.textContent = currentBook.author;
    } else if (newCellIndex === 2) {
        newCell.textContent = currentBook.pages;
    } else if (newCellIndex === 3) {
        newCell.textContent = currentBook.read;
    } else if (newCellIndex === 4) {
        const deleteButton = document.createElement("button");
        deleteButton.dataset.buttonID = currentBook.id;
        deleteButton.classList.add("delete-button");
        const deleteButtonText = document.createTextNode("Delete Book");
        deleteButton.appendChild(deleteButtonText);
        newCell.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            for (const row of table.rows) {
                if (row.dataset.bookID === deleteButton.dataset.buttonID) {
                    row.remove();
                };
            };
        });
    } else {
        return null;
    };
};

function addBookToTable(currentBook) {
    let newRow = table.insertRow();
    newRow.dataset.bookID = currentBook.id;
    for (let i = 0; i < 5; i++) {
         let newCell = newRow.insertCell(i);
         let newCellIndex = newCell.cellIndex;
         updateCellContents(currentBook, newCell, newCellIndex);
    };
};

// books for testing purposes
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 323, false);
addBookToLibrary("Six of Crows", "Leigh Bardugo", 480, true);
addBookToLibrary("A Good Girl's Guide to Murder", "Holly Jackson", 433, true);

for (const currentBook of myLibrary) {
    addBookToTable(currentBook);
};

submitButton.addEventListener("click", event => {
    event.preventDefault();
    if (!form.checkValidity()) {
        alert("Invalid values entered!");
        return null;
    } else {
        let title = titleInput.value;
        let author = authorInput.value;
        let pages = pagesInput.value;
        let read = readInput.checked;
        addBookToLibrary(title, author, pages, read);
        const newBook = myLibrary.at(-1);
        addBookToTable(newBook);
    };
    dialog.close();
});