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

function displayLibrary() {
  const main = document.querySelector("main");
  main.innerHTML = "";

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
}

// example books
addBookToLibrary("How to Build a Car", "Adrian Newey", 438, false);
addBookToLibrary("The Last Wish", "Andrzej Sapkowski", 286, true);


