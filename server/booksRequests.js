//from json
// const abc = require("./products");
// console.log(typeof abc);

//from js
const library = require("./books");
//console.log(library);
const express = require("express");
const productsRouter = express.Router();


productsRouter.get("/books", function (request, response) {
    //console.log(request);

    if (request.query.search !== "undefined") {
        var filteredLibrary = library.filter(book => book.title.concat(book.author).includes(request.query.search));
        //console.log(filteredLibrary);
        response.send(filteredLibrary);
        //response.send(library.filter(book => book.title.concat(book.author).includes(request.query.search)))
    } else {
        response.send(library)
    }
});

///// logic for wishlist
var wishlistedBooks = [];

productsRouter.post("/booksForWishlist", function (request, response) {
    const body = request.body;

    const newBook = {
        id: body.id,
        img: body.img,
        title: body.title,
        author: body.author,
        price: body.price
    };

    wishlistedBooks.push(newBook);
    response.send(newBook);
});

productsRouter.delete("/booksFromWishlist/:bookId", function (request, response) {
    const bookId = request.params.bookId;

    const newArray = wishlistedBooks.filter(item => item.id != bookId);
    wishlistedBooks = newArray;

    response.send(newArray);
});

productsRouter.get("/booksForWishlist", function (request, response) {
    response.send(wishlistedBooks)
});


////logic for cart
var cartBooks = [];

productsRouter.get("/booksForCart", function (request, response) {
    response.send(cartBooks);
});

productsRouter.delete("/booksFromCart/:bookId", function (request, response) {
    const bookId = request.params.bookId;
    //cartBooks = cartBooks.filter(item =>item.id !=bookId);
    const newArray = cartBooks.filter(item => item.id != bookId);
    cartBooks = newArray;
    response.send(newArray);
});
productsRouter.post("/booksForCart", function (request, response) {
    const body = request.body;
    const newBook = {
        id: body.id,
        img: body.img,
        title: body.title,
        author: body.author,
        price: body.price
    };
    ///check if book is already added to cart. If not, push it into cartBooks array
    if (cartBooks.every(book => book.id != newBook.id)) {
        cartBooks.push(newBook);
    }
    response.send(newBook);
});

module.exports = productsRouter;