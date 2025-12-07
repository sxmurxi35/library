"use strict";

const library = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Must be a 'new' target!");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read == true) {
    this.read = "Read";
  } else {
    this.read = "Not read";
  }
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

  library.push(book);

  displayLibrary();
}

const main = document.querySelector("main");
function displayLibrary() {
  main.innerHTML = "";

  if (library.length > 0) {
    for (const book of library) {
      const bookSection = document.createElement("section");

      let pages;
      if (book.pages == 1) {
        pages = book.pages + " page";
      } else {
        pages = book.pages + " pages";
      }

      bookSection.innerHTML = `
        <h3 id = 'book-title'>${book.title}</h3>
        <h4 id = 'book-author'>${book.author}</h4>
        <p class = 'book-info'>${pages}</p>
        <button id = 'status-btn'>${book.read}</button>
        <button id = 'del-btn'>Delete</button>
        `;
      bookSection.classList.add("book-sect");
      bookSection.dataset.id = book.id;

      main.appendChild(bookSection);
    }
  } else {
    main.innerHTML =
      "<h2 id='lib-empty'>Library is empty! You have to add a book!<h2>";
  }
}

// example books
addBookToLibrary("How to Build a Car", "Adrian Newey", 438, false);
addBookToLibrary("The Last Wish", "Andrzej Sapkowski", 286, true);

main.addEventListener("click", (e) => {
  // Deleting book from library
  if (e.target.id == "del-btn") {
    const bookID = e.target.closest("section").dataset.id;
    const bookIndex = library.map((book) => book.id).indexOf(bookID);

    library.splice(bookIndex, 1);
    displayLibrary();
  }

  // Changing status of book
  if (e.target.id == "status-btn") {
    const bookID = e.target.closest("section").dataset.id;
    const bookIndex = library.map((book) => book.id).indexOf(bookID);

    let statusOfBook = library[bookIndex].read;
    if (statusOfBook == "Not read") {
      library[bookIndex].read = "Read";
    } else library[bookIndex].read = "Not read";

    displayLibrary();
  }
});

const newBtn = document.querySelector("#new-btn");
const dialog = document.querySelector("dialog");

newBtn.addEventListener("click", (e) => {
  e.preventDefault();

  dialog.showModal();
});

dialog.addEventListener("click", (e) => {
  const formBookTitle = document.querySelector("#book-title-form");
  const formBookAuthor = document.querySelector("#book-author-form");
  const formBookPages = document.querySelector("#book-pages-form");
  const formBookStatus = document.querySelector("#book-status-form");

  if (e.target.id == "confirm-btn") {
    e.preventDefault();

    let bookRead;
    if (formBookStatus.checked) {
      bookRead = true;
    } else bookRead = false;

    const bookTitle = formBookTitle.value;
    const bookAuthor = formBookAuthor.value;
    const bookPages = formBookPages.value;

    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    dialog.close();
  }

  if (e.target.id == "cancel-btn") {
    e.preventDefault();

    formBookAuthor.value = "";
    formBookPages.value = "";
    formBookTitle.value = "";
    formBookStatus.checked = false;

    dialog.close();
  }
});
