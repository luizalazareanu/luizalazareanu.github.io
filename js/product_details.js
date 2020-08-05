//show hide paragraph
function showhide() {
    var div = document.getElementById("new-paragraph");
    div.classList.toggle('hidden-paragraph');
}

//fly to cart functionality on click
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
    detailsAuthor.innerHTML = `By (author) <b>${localStorage.getItem('bookAuthor')}</b>`;
    detailsPrice.innerHTML = localStorage.getItem('bookPrice');
}

window.onload = setFrontCover();


////WISHLIST functionality
var wishlistButton = document.getElementById("add-to-wishlist");

/////add book details into array of objects and parse it into local storage
function addBookForWishlist() {
    var wishlistItems = [];
    ///get book details from targeted book
    var book = {
        bookImage: frontCover.getAttribute("src"),
        title: detailsTitle.innerHTML,
        author: detailsAuthor.innerHTML,
        price: detailsPrice.innerHTML,
    };
    if (localStorage.getItem("booksForWishlist") === null) {
        wishlistItems.push(book);
        localStorage.setItem("booksForWishlist", JSON.stringify(wishlistItems));
    } else {
        wishlistItems = JSON.parse(localStorage.getItem("booksForWishlist"));
        wishlistItems.push(book);
        localStorage.setItem("booksForWishlist", JSON.stringify(wishlistItems));
    }

    console.log(wishlistItems);
    // localStorage.clear();
}

wishlistButton.addEventListener('click', addBookForWishlist);

///ADD TO CART functionality
var addToCartBtn = document.getElementById("add-to-cart");
addToCartBtn.addEventListener('click', addBookForWishlist);