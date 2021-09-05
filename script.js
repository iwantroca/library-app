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
  }
  clearField();
}
function clearField() {
  [...bookInputs].forEach((x) => (x.value = ""));
}
function displayBooks() {
  myLibrary.forEach((x) => {
    console.log(x);
    let bookCard = document.createElement("div");
    let bookHead = document.createElement("div");
    bookHead.classList.add("book-head");
    bookCard.classList.add("book");
    let bookPara = document.createElement("p");
    bookPara.textContent = "by ";
    let h2 = document.createElement("h2");
    let trashIcon = document.createElement("div");
    let separatorLine = document.createElement("div");
    separatorLine.classList.add("separator");
    trashIcon.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    h2.textContent = `${x.name}`;
    bookHead.appendChild(h2);
    bookHead.appendChild(trashIcon);
    bookCard.appendChild(bookHead);
    bookCard.appendChild(separatorLine);
    bookContainer.appendChild(bookCard);
    bookCard.insertBefore(bookPara, separatorLine);
    let authorSpan = document.createElement("span");
    authorSpan.textContent = `${x.author}`;
    bookPara.appendChild(authorSpan);
    // book Length
    let bookLength = document.createElement("p");
    bookLength.textContent = "Length : ";
    bookLength.classList.add("book-stat");
    let bookLengthSpan = document.createElement("span");
    bookLengthSpan.textContent = `${x.pages} pages`;
    bookLength.appendChild(bookLengthSpan);
    bookCard.appendChild(bookLength);
    // book status
    let bookStatus = document.createElement("p");
    bookStatus.setAttribute("id", "book-status");
    bookStatus.textContent = "Status : ";
    bookStatus.classList.add("book-stat");
    let bookStatusSpan = document.createElement("span");
    bookStatusSpan.textContent = x.readStatus ? "Done" : "In Progress";
    bookStatus.appendChild(bookStatusSpan);
    bookCard.append(bookStatus);
    let syncIcon = document.createElement("div");
    syncIcon.innerHTML = '<i class="fas fa-sync"></i>';
    bookStatus.appendChild(syncIcon);
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
  makeModalInvisible();
  clearBookContainer();
  displayBooks();
});
