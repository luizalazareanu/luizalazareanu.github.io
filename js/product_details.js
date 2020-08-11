import addBookForCart2 from "./home.js";
//show hide paragraph
function showhide() {
    var div = document.getElementById("new-paragraph");
    div.classList.toggle('hidden-paragraph');
}

//fly to cart functionality on click
function getCartPosition() {
    setTimeout(function () {
        var cartIcon = document.getElementById("cart-icon");
        var yPosition = window.scrollY + cartIcon.getBoundingClientRect().top;
        var xPosition = window.scrollX + cartIcon.getBoundingClientRect().left;
        //console.log(xPosition);
        //console.log(yPosition);
        document.getElementById("add-to-cart").animate([
            // keyframes
            { transform: `translateX(${xPosition}px)` },
            { transform: `translateY(${yPosition}px)` }
        ], {
            // timing options
            //duration: 1000,
            //iterations: Infinity
        });
    }, 1000)
}

// var yPosition = window.scrollY + cartIcon.getBoundingClientRect().top;
// var xPosition = window.scrollX + cartIcon.getBoundingClientRect().left;
// console.log(yPosition);
// console.log(xPosition);
getCartPosition();

document.getElementById('add-to-cart').addEventListener("click", function (e) {
    e.preventDefault;
    // -> removing the class
    document.getElementById('add-to-cart').classList.remove("animate-add-to-cart");
    // -> triggering reflow
    void document.getElementById('add-to-cart').offsetWidth;
    // ->re-adding the class
    document.getElementById('add-to-cart').classList.add("animate-add-to-cart");
}, false);
// add to wishlist functionality on click
document.getElementById('add-to-wishlist').addEventListener("click", function (e) {
    e.preventDefault;
    // -> removing the class
    document.getElementById('add-to-wishlist').classList.remove("animate-add-to-wishlist");
    // -> triggering reflow
    void document.getElementById('add-to-wishlist').offsetWidth;
    // ->re-adding the class
    document.getElementById('add-to-wishlist').classList.add("animate-add-to-wishlist");
}, false);


///set book cover, title, author and price from local storage (comes from products page)
var frontCover = document.getElementById("front-cover");
var detailsTitle = document.getElementById("item-title");
var detailsAuthor = document.getElementById("item-author");
var detailsPrice = document.getElementById("price");

function setFrontCover() {
    frontCover.setAttribute("src", localStorage.getItem('bookCover'));
    detailsTitle.innerHTML = localStorage.getItem('bookTitle');
    detailsAuthor.innerHTML = `<span>By (author)</span> <b>${localStorage.getItem('bookAuthor')}</b>`;
    detailsPrice.innerHTML = localStorage.getItem('bookPrice');
}

//window.onload = setFrontCover();
document.addEventListener("DOMContentLoaded", function () {
    setFrontCover();
});


////WISHLIST functionality
var wishlistButton = document.getElementById("add-to-wishlist");
wishlistButton.addEventListener('click', addBookForWishlist);

function addBookForWishlist() {
    const bodyRequest = JSON.stringify({
        id: localStorage.getItem("bookId"),
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

// function addBookForCart(){
//     fetch ("http://localhost:3000/booksForCart",{
//         method: "POST",
//         headers:{
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             id: localStorage.getItem("bookId"),
//             img: frontCover.getAttribute("src"),
//             title: detailsTitle.innerHTML,
//             author: detailsAuthor.innerHTML,
//             price: detailsPrice.innerHTML,
//         })
//     })
// }
function addBookForCart() {
    const bodyRequest = JSON.stringify({
        id: localStorage.getItem("bookId"),
        img: localStorage.getItem("bookCover"),
        title: localStorage.getItem("bookTitle"),
        author: localStorage.getItem("bookAuthor"),
        price: localStorage.getItem("bookPrice"),
    });

    postBookInCart(bodyRequest)
        .then(fetchBooksForCart)
        .then(getNoOfCartItems)
}
var moreBooksContainer = document.querySelector(".books");
moreBooksContainer.addEventListener('click', addBookForCart2);

