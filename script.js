const addBookBtn = document.querySelector("#add-book");
const clearBooksBtn = document.querySelectorAll("#clear-books");
const closeBtn = document.querySelector(".fa-xmark");
const addBookModal = document.querySelector("#addBookModal");
const submitFormBtn = document.querySelector("#submit-btn");
const readCheck = document.querySelector("#read-check");
const bookInputs = document.querySelectorAll(".book-detail");
const bookContainer = document.querySelector("#books-container");
const bookCounter = document.querySelector("#status");
const required = document.querySelectorAll(".required");

let myLibrary = [];
let bookDelBtn = null;
let statusToggleBtn = null;
let readBooks = [];
let unreadBooks = [];

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
    [...required].forEach((x) => (x.style.display = "none"));
    clearField();
  } else {
    [...required].forEach((x) => (x.style.display = "inline"));
  }
  // clearField();
}
function clearField() {
  [...bookInputs].forEach((x) => (x.value = ""));
}
function displayBooks() {
  myLibrary.forEach((book, bookIndex) => {
    console.log(book);
    console.log(bookIndex);
    let bookCard = document.createElement("div");
    let bookHead = document.createElement("div");
    bookHead.classList.add("book-head");
    bookCard.classList.add("book");
    bookCard.setAttribute("data-index", `${bookIndex}`);
    let bookPara = document.createElement("p");
    bookPara.textContent = "by ";
    let h2 = document.createElement("h2");
    let trashIcon = document.createElement("div");
    let separatorLine = document.createElement("div");
    separatorLine.classList.add("separator");
    trashIcon.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    h2.textContent = `${book.name}`;
    bookHead.appendChild(h2);
    bookHead.appendChild(trashIcon);
    bookCard.appendChild(bookHead);
    bookCard.appendChild(separatorLine);
    bookContainer.appendChild(bookCard);
    bookCard.insertBefore(bookPara, separatorLine);

    let authorSpan = document.createElement("span");
    authorSpan.textContent = `${book.author}`;
    bookPara.appendChild(authorSpan);

    // book Length
    let bookLength = document.createElement("p");
    bookLength.textContent = "Length : ";
    bookLength.classList.add("book-stat");
    let bookLengthSpan = document.createElement("span");
    bookLengthSpan.textContent = `${book.pages} pages`;
    bookLength.appendChild(bookLengthSpan);
    bookCard.appendChild(bookLength);

    // book status
    let bookStatus = document.createElement("p");
    bookStatus.setAttribute("id", "book-status");
    bookStatus.textContent = "Status : ";
    bookStatus.classList.add("book-stat");
    let bookStatusSpan = document.createElement("span");
    bookStatusSpan.textContent = book.readStatus ? "Done" : "In Progress";
    bookStatus.appendChild(bookStatusSpan);
    bookCard.append(bookStatus);
    let syncIcon = document.createElement("div");
    syncIcon.innerHTML = '<i class="fas fa-sync"></i>';
    bookStatus.appendChild(syncIcon);

    updateDeleteButton();
    getReadBooks();
    updateBookCount();
  });
}
function clearBookContainer() {
  while (bookContainer.childElementCount) {
    bookContainer.firstElementChild.remove();
  }
}
function deleteBook(arr, index) {
  myLibrary.splice(index, 1);
  return myLibrary;
}
function getBookIndex(e) {
  let bookCardIndex =
    e.target.parentElement.parentElement.parentElement.dataset.index;
  return bookCardIndex;
}

addBookBtn.addEventListener("click", makeModalVisible);
closeBtn.addEventListener("click", () => {
  makeModalInvisible();
  clearField();
});
submitFormBtn.addEventListener("click", () => {
  submitForm();
  // makeModalInvisible();
  clearBookContainer();
  displayBooks();
});

function updateDeleteButton() {
  bookDelBtn = [...document.querySelectorAll(".book-head i")];
  return bookDelBtn;
}
function updateToggleButton() {
  statusToggleBtn = [...document.querySelector(".fa-sync")];
  return statusToggleBtn;
}
function getReadBooks() {
  readBooks = myLibrary.filter((book) => book.readStatus === true);
  return readBooks;
}
function updateBookCount() {
  bookCounter.children[0].lastElementChild.textContent = readBooks.length;
  bookCounter.children[1].lastElementChild.textContent =
    myLibrary.length - readBooks.length;
  bookCounter.children[2].lastElementChild.textContent = myLibrary.length;
}
// deleting All books
function deleteAllBooks() {
  myLibrary = [];
  clearBookContainer();
  bookCounter.children[0].lastElementChild.textContent = 0;
  bookCounter.children[1].lastElementChild.textContent = 0;
  bookCounter.children[2].lastElementChild.textContent = 0;
}
[...clearBooksBtn][0].addEventListener("click", deleteAllBooks);
//

document.addEventListener("click", (e) => {
  if (e.target.classList[1] === "fa-trash") {
    let bookCardIndex = getBookIndex(e);
    myLibrary.splice(bookCardIndex, 1);
    clearBookContainer();
    displayBooks();
  }
});

// Todo
//~~ 1. add required filled when left incomplete~~
// 2. add modal to confirm delete all books
// 3. refactor the code
// 4. add local storage
document.addEventListener("click", (e) => {
  if (e.target.classList[1] === "fa-sync") {
    let bookCardIndex = getBookIndex(e);
    switch (myLibrary[bookCardIndex].readStatus) {
      case true:
        myLibrary[bookCardIndex].readStatus = false;
        break;
      case false:
        myLibrary[bookCardIndex].readStatus = true;
        break;
    }
    clearBookContainer();
    displayBooks();
  }
});
