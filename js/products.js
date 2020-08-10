
document.addEventListener("DOMContentLoaded", function () {
    fetchBooks();
    fetchBooksForCart().then(getNoOfCartItems);
});

var booksContainer = document.getElementById("books");

function renderBooks(library) {
    //var booksContainer = document.getElementById("books");
    library.forEach(function (book) {
        //create elements
        var divBookDetails = document.createElement("div");
        var prodDetailsAnchor = document.createElement("a");
        var bookCover = document.createElement("img");
        var title = document.createElement("p");
        var author = document.createElement("p");
        var price = document.createElement("p");
        var addToBasket = document.createElement("button");


        //set attributes and style
        divBookDetails.setAttribute("class", "book-details-container");
        divBookDetails.setAttribute("id", book.id);
        prodDetailsAnchor.setAttribute("href", "#");
        bookCover.setAttribute("src", book.cover);
        bookCover.setAttribute("class", "book-cover");
        title.innerText = book.title;
        title.style.fontWeight = "bold";
        author.innerText = book.author;
        price.innerText = book.price;
        price.setAttribute("class", "price");
        addToBasket.innerHTML = "Add to basket";
        addToBasket.setAttribute("type", "button");
        addToBasket.className = "add-to-basket";

        //append elements
        booksContainer.appendChild(divBookDetails);
        divBookDetails.appendChild(prodDetailsAnchor);
        prodDetailsAnchor.appendChild(bookCover);
        divBookDetails.appendChild(title);
        divBookDetails.appendChild(author);
        divBookDetails.appendChild(price);
        divBookDetails.appendChild(addToBasket);
    });
}


////get book cover,title, author and price from products page onclick
function getBookCover(event) {
    //console.log(event.target);
    //console.log(event.target.tagName);
    //console.log(event.target.tagName.includes("IMG"));
    if (event.target.tagName.includes("IMG")) {
        ///get src value from targeted img
        var bookImage = event.target.getAttribute("src");
        var title = event.target.parentNode.nextSibling.innerHTML;
        var author = event.target.parentNode.parentNode.childNodes[2].innerHTML;
        var price = event.target.parentNode.parentNode.childNodes[3].innerHTML;
        var bookId = event.target.parentNode.nextSibling.parentNode.getAttribute("id");

        ///put the src value into local storage
        // localStorage.clear();
        // console.log(localStorage);
        localStorage.setItem("bookId", bookId);
        localStorage.setItem("bookCover", bookImage);
        localStorage.setItem("bookTitle", title);
        localStorage.setItem("bookAuthor", author);
        localStorage.setItem("bookPrice", price);
        //console.log(localStorage);
        ///go to product details page
        window.location.href = '/product_details.html';
    }
}

booksContainer.addEventListener('click', getBookCover);


/////fetch books from server
function fetchBooks() {
    return fetch("http://localhost:3000/books", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(response => response.json());
}

fetchBooks().then(renderBooks);

/// add to cart functionality
// booksContainer.addEventListener('click', function(event){
//     if(event.target.className == "add-to-basket"){
//         console.log(event.target);
//         fetch ("http://localhost:3000/booksForCart",{
//             method: "POST",
//             headers:{
//                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 id: event.target.parentNode.getAttribute("id"),
//                 img: event.target.parentNode.children[0].children[0].getAttribute("src"),
//                 title: event.target.parentNode.children[1].innerHTML,
//                 author: event.target.parentNode.children[2].innerHTML,
//                 price: event.target.parentNode.children[3].innerHTML,
//             })
//         })
//             .then(fetchBooksForCart)
//             .then(getNoOfCartItems)
//     }
// });

booksContainer.addEventListener('click', function (event) {
    var bodyRequest = JSON.stringify({
        id: event.target.parentNode.getAttribute("id"),
        img: event.target.parentNode.children[0].children[0].getAttribute("src"),
        title: event.target.parentNode.children[1].innerHTML,
        author: event.target.parentNode.children[2].innerHTML,
        price: event.target.parentNode.children[3].innerHTML,
    });
    if (event.target.className == "add-to-basket") {
        //console.log(event.target);
        postBookInCart(bodyRequest)
            .then(fetchBooksForCart)
            .then(getNoOfCartItems)
    }
});

