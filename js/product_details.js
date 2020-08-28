import addBookForCart2 from "./home.js";

document.addEventListener("DOMContentLoaded", function () {
    setBookDetails();
    getTotal();
});

//show hide paragraph
var button = document.getElementById("show-hide-checkbox");
button.addEventListener("click",function(){
    var div = document.getElementById("new-paragraph");
    div.classList.toggle('hidden-paragraph');
});

///set book cover, title, author and price from local storage (comes from products page)
var bookIdContainer = document.querySelector(".cover-container");
var frontCover = document.getElementById("front-cover");
var detailsTitle = document.getElementById("item-title");
var detailsAuthor = document.getElementById("item-author");
var detailsPrice = document.getElementById("price");
var discount = document.getElementById("discount-amount");


function setBookDetails() {
    console.log(window.location.search.slice(8,11));
    var bookId = window.location.search.slice(-3);
    fetchBooks(bookId).then(response => {
        bookIdContainer.setAttribute("id", response[0].id);
        frontCover.setAttribute("src", response[0].cover);
        detailsTitle.innerHTML = response[0].title;
        detailsAuthor.innerHTML = response[0].author;
        detailsPrice.innerHTML = `${response[0].price} £ `;
        discount.innerHTML = `${response[0].discount}% Discount`;
    })
}


////WISHLIST functionality
var wishlistButton = document.getElementById("add-to-wishlist");
wishlistButton.addEventListener('click', addBookForWishlist);

function addBookForWishlist() {
    const bodyRequest = JSON.stringify({
        id: bookIdContainer.getAttribute("id"),
        img: frontCover.getAttribute("src"),
        title: detailsTitle.innerHTML,
        author: detailsAuthor.innerHTML,
        price: detailsPrice.innerHTML,
    });
    postBookInWishlist(bodyRequest);
}


///ADD TO CART functionality
var addToCartBtn = document.getElementById("add-to-cart");
addToCartBtn.addEventListener('click', addBookForCart);

function addBookForCart() {
    const bodyRequest = JSON.stringify({
        id: bookIdContainer.getAttribute("id"),
        img: frontCover.getAttribute("src"),
        title: detailsTitle.innerHTML,
        author: detailsAuthor.innerHTML,
        price: detailsPrice.innerHTML,
    });

    postBookInCart(bodyRequest)
        .then(fetchBooksForCart)
        .then(getNoOfCartItems)
}

var moreBooksContainer = document.querySelector(".books");
moreBooksContainer.addEventListener('click', addBookForCart2);

////calculate total
var total = document.getElementById("book-details-total");
setTimeout(function getTotal(){
    console.log(parseFloat(detailsPrice.innerHTML.replace(',', '.')));
    console.log(parseFloat(detailsPrice.innerHTML.replace(',', '.'))*(parseFloat((discount.innerHTML.replace(',', '.')))/100));
    total.innerHTML = parseFloat(detailsPrice.innerHTML.replace(',', '.')) - parseFloat(detailsPrice.innerHTML.replace(',', '.'))*(parseFloat((discount.innerHTML.replace(',', '.')))/100);
    total.innerHTML = `${parseFloat(total.innerHTML.replace(',','.')).toFixed(2)} £` ;
    total.style.color = "#ff0072";
},800);

