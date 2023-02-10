const Book = require('../models/bookModel')

const { getPostData } = require('../utils')

// @desc    Gets All Books
// @route   GET /books
async function getBooks(req, res) {
    try {
        const books = await Book.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(books))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Book
// @route   GET /book/:id
async function getBook(req, res, id) {
    try {
        const book = await Book.findById(id)

        if(!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Book Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(book))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Book
// @route   POST /books
async function createBook(req, res) {
    try {
        const body = await getPostData(req)

        const { name, info, src } = JSON.parse(body)

        const book = {
            name,
            info,
            src
        }

        const newBook = await Book.create(book)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newBook))  

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a Book
// @route   PUT /books/:id
async function updateBook(req, res, id) {
    try {
        const book = await Book.findById(id)

        if(!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Book Not Found' }))
        } else {
            const body = await getPostData(req)

            const { name, info, src } = JSON.parse(body)

            const bookData = {
                name: name || book.name,
                info: info || book.info,
                src: src || book.src
            }

            const updBook = await Book.update(id, bookData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updBook)) 
        }
 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Book
// @route   DELETE /book/:id
async function deleteBook(req, res, id) {
    try {
        const book = await Book.findById(id)

        if(!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Book Not Found' }))
        } else {
            await Book.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Book ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}