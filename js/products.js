document.addEventListener("DOMContentLoaded", function () {
    fetchBooks().then(renderBooks);
    getFilters();
});

var booksContainer = document.getElementById("books");

function renderBooks(library) {
    //var booksContainer = document.getElementById("books");
    booksContainer.innerHTML = "";
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
function fetchBooks(searchString) {
    return fetch(`http://localhost:3000/books?search=${searchString}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(response => response.json());
}

/// ADD TO CART
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
/****************************** SEARCH *******************/
setTimeout(function () {
    var findBooksBtn = document.getElementById("search-btn");
    findBooksBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var searchBar = document.getElementById("search-bar");
        fetchBooks(searchBar.value).then(renderBooks);
    });
}, 500);

// function searchBook(library, value) {
//     return library.filter(book => book.title.concat(book.author).contains(value))
// }


/****************************** FILTERS *******************/
var filteredLibrary;
var activeFilters = [
    // {discount: 10},
    // {category: "religion"},
    // {discount: 20}
];

var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//console.log( checkboxes);
var cheboxesArray = Object.values(checkboxes);
//console.log(cheboxesArray);

function getFilters() {
    activeFilters = [];
    cheboxesArray.forEach(checkbox => {
        //console.log(checkbox.checked);
        if (checkbox.checked) {
            //console.log(checkbox.getAttribute("id"));
            //console.log(checkbox.getAttribute("value"));
            var prop = checkbox.parentNode.parentNode.className;
            var value = checkbox.getAttribute("id");
            var newObject = {prop, value};
            activeFilters.push(newObject);
            //console.log(activeFilters);
        }
    })
}
//getFilters();

document.addEventListener("click", function (event) {
    //console.log(event.target);
    if (event.target.getAttribute("type") == "checkbox") {
        getFilters();
        fetchBooks().then(filterBooks).then(renderBooks);
    }
});

var library=[];
fetchBooks().then(getArrayOfBooks);
function getArrayOfBooks(response){
    //console.log(response);
    library = response;
    //console.log(asd);
return library;
}

function filterBooks() {
    //console.log(library);
    const result = activeFilters.forEach(activeFilter => library.filter(book => activeFilter.prop == book[`${activeFilter.prop}`] ));
    //console.log(result);
    activeFilters.forEach(activeFilter => console.log(activeFilter.prop));
    library.forEach(item => console.log(item.category));
    return activeFilters.forEach(activeFilter => library.filter(book => activeFilter.prop == book[`${activeFilter.prop}`] ));
}