var wishlistedBooks = JSON.parse(localStorage.getItem("booksForWishlist"));
var cartItems = document.getElementById("cartItems");

function loadBooksInCart() {
    // var wishlistedBooks = JSON.parse(localStorage.getItem("booksForWishlist"));
    console.log(wishlistedBooks);
    wishlistedBooks.forEach(book => {

        var div = document.createElement('div');
        var frontCover = document.createElement("img");
        var detailsTitle = document.createElement("p");
        var detailsAuthor = document.createElement("p");
        var detailsPrice = document.createElement("p");
        var span = document.createElement("span");

        span.className = 'remove-item';
        detailsPrice.className = 'price';

        frontCover.setAttribute("src", book.bookImage);
        detailsTitle.innerHTML = book.title;
        detailsAuthor.innerHTML = book.author.slice(15, -4);
        detailsPrice.innerHTML = book.price;

        cartItems.appendChild(div);
        div.appendChild(frontCover);
        div.appendChild(detailsTitle);
        div.appendChild(detailsAuthor);
        div.appendChild(detailsPrice);

        div.appendChild(span);
    })
}

window.onload = loadBooksInCart();