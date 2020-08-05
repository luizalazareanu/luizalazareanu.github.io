function loadProductsFromJson() {
    //const requestURL = './../web/json/products.json';
    const requestURL = './../json/products.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.onload = function () {
        var library = JSON.parse(request.responseText);
        createContentFromJson(library);
    };
    request.send();
}

document.addEventListener("DOMContentLoaded", function () {
    loadProductsFromJson();
});

var booksContainer = document.getElementById("books");
function createContentFromJson(library) {
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
        price.setAttribute("class","price");
        addToBasket.innerHTML = "Add to basket";
        addToBasket.setAttribute("type","button");

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
function getBookCover(event){
    console.log(event.target);
    //console.log(event.target.tagName);
    //console.log(event.target.tagName.includes("IMG"));
    if(event.target.tagName.includes("IMG")) {
        ///get src value from targeted img
        var bookImage = event.target.getAttribute("src");
        var title = event.target.parentNode.nextSibling.innerHTML;
        var author = event.target.parentNode.parentNode.childNodes[2].innerHTML;
        var price = event.target.parentNode.parentNode.childNodes[3].innerHTML;

        ///put the src value into local storage
        // localStorage.clear();
        // console.log(localStorage);
        localStorage.setItem("bookCover", bookImage);
        localStorage.setItem("bookTitle", title);
        localStorage.setItem("bookAuthor", author);
        localStorage.setItem("bookPrice", price);
        //console.log(localStorage);
        ///go to product details page
        window.location.href = 'http://localhost:8080/test/web/product_details.html';
    }
}

booksContainer.addEventListener('click', getBookCover);
