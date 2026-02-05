const myLibrary = [];

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

// addBookToLibrary("abc", "def", 265, true);
// console.log(myLibrary);