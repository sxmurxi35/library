"use strict"

const library = []

function Book(title, author, pages, read) {
    if(!new.target){
        throw Error("Must be a 'new' target!")
    }

    this.title = title
    this.author = author
    this.pages = pages
    if(read == true){
        this.read = 'Read'
    } else {
        this.read = 'Not read'
    }
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)

    library.push(book)
}

function displayLibrary() {
    const main = document.querySelector('#main')

    for(const book of library){
        const bookSection = document.createElement('section')
        bookSection.innerHTML = `
        <h3 id = 'book-title'>${book.title}</h3>
        <p class = 'book-info'>${book.author}</p>
        <p class = 'book-info'>${book.pages}</p>
        <p class = 'book-info'>${book.read}</p>
        `

        main.appendChild(bookSection)
    }
}

displayLibrary()