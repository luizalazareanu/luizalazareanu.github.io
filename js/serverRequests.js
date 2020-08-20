
/*** load no of items that are currently in cart ***/
document.addEventListener("DOMContentLoaded", function () {
    fetchBooksForCart().then(getNoOfCartItems);
});


/***** FETCH BOOKS LIBRARY ******/
function fetchBooks(searchString) {
    return fetch(`http://localhost:3000/books?search=${searchString}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(response => response.json());
}

/************************************* CART REQUESTS ******************/
///// GET cart books from server
function fetchBooksForCart() {
    return fetch("http://localhost:3000/booksForCart", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(response => response.json());
}


/// calculate the number of items that are currently into cart
function getNoOfCartItems(cartBooks) {
    setTimeout(function () {
        var bagTotal = document.getElementById("bagTotal");
        //console.log(bagTotal);
        bagTotal.innerHTML = cartBooks.length;
    }, 100)
}

/// POST cart book on server
function postBookInCart(bodyValue) {
    return fetch("http://localhost:3000/booksForCart", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }, body: bodyValue
    })
}

/************************************* WISHLIST REQUESTS ******************/
///GET wishlisted books from server
function fetchBooksForWishlist() {
    return fetch("http://localhost:3000/booksForWishlist", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(response => response.json());
}


/// POST wishlist book on server
function postBookInWishlist(bodyValue) {
    return fetch("http://localhost:3000/booksForWishlist", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }, body: bodyValue
    })
}