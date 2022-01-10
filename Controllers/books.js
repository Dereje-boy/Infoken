const books = require("../Databases/books");

function addBook(newbook) {
	books.addBook(newbook);
}
async function allBooks() {
	return await books.allBooks();
}
async function updateBook(newBook) {
	return await books.updateBook(newBook);
}
async function deleteBook(book) {
	return await books.deleteBook(book);
}

function searchBook(book) {
	return books.searchBook(book);
}

module.exports.addBook = addBook;
module.exports.allBooks = allBooks;
module.exports.updateBook = updateBook;
module.exports.deleteBook = deleteBook;
module.exports.searchBook = searchBook;