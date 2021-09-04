const addBookBtn = document.querySelector("#add-book");

let myLibrary = [];

function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
}
const book1 = new Book("fdk", "fdfdl", 222);
myLibrary.push(book1);
console.log(myLibrary);

let bookTitle = document.querySelector("#book-title input");
function getBookName() {}
