"use strict"

const library = []

function Book(title, author, pages, read) {
    if(!new.target){
        throw Error("Must be a 'new' target!")
    }

    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)

    library.push(book)
}