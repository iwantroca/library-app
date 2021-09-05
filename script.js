const addBookBtn = document.querySelector("#add-book");
const closeBtn = document.querySelector(".fa-xmark");
const addBookModal = document.querySelector("#addBookModal");
const submitFormBtn = document.querySelector("#submit-btn");
const bookTitle = document.querySelector("#book-title");

let myLibrary = [];
let book = null;

function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
}
function makeModalInvisible() {
  addBookModal.style.display = "none";
}
function makeModalVisible() {
  addBookModal.style.display = "block";
}

addBookBtn.addEventListener("click", makeModalVisible);
closeBtn.addEventListener("click", makeModalInvisible);
submitFormBtn.addEventListener("click", () => {
  book = new Book(bookTitle.value, 33, 33);
  myLibrary.push(book);
  makeModalInvisible();
});
