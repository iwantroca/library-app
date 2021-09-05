const addBookBtn = document.querySelector("#add-book");
const closeBtn = document.querySelector(".fa-xmark");
const addBookModal = document.querySelector("#addBookModal");
const submitFormBtn = document.querySelector("#submit-btn");
const readCheck = document.querySelector("#read-check");
const bookInputs = document.querySelectorAll(".book-detail");
const bookContainer = document.querySelector("#books-container");

let myLibrary = [];

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
  if ([...bookInputs].every((field) => field.value)) {
    let book = new Book(
      bookInputs[0].value,
      bookInputs[1].value,
      bookInputs[2].value,
      readCheck.checked
    );
    myLibrary.push(book);
    makeModalInvisible();
  }
  clearField();
}
function clearField() {
  [...bookInputs].forEach((x) => (x.value = ""));
}
function displayBooks() {
  myLibrary.forEach((x) => {
    let div = document.createElement("div");
    div.classList.add("book");
    bookContainer.appendChild(div);
  });
}
function clearBookContainer() {
  while (bookContainer.childElementCount) {
    bookContainer.firstElementChild.remove();
  }
}

addBookBtn.addEventListener("click", makeModalVisible);
closeBtn.addEventListener("click", makeModalInvisible);
submitFormBtn.addEventListener("click", () => {
  submitForm();
  clearBookContainer();
  displayBooks();
});
