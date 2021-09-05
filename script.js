const addBookBtn = document.querySelector("#add-book");
const closeBtn = document.querySelector(".fa-xmark");
const addBookModal = document.querySelector("#addBookModal");
const submitFormBtn = document.querySelector("#submit-btn");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const readCheck = document.querySelector("#read-check");

let myLibrary = [];
let book = null;

function Book(name, author, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}
function makeModalInvisible() {
  addBookModal.style.display = "none";
}
function makeModalVisible() {
  addBookModal.style.display = "block";
}
function submitForm() {
  if (bookTitle.value && bookAuthor.value && bookPages.value) {
    book = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      readCheck.checked
    );
    myLibrary.push(book);
    makeModalInvisible();
  }
}

addBookBtn.addEventListener("click", makeModalVisible);
closeBtn.addEventListener("click", makeModalInvisible);
submitFormBtn.addEventListener("click", submitForm);
