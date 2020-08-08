//var wishlistedBooks = JSON.parse(localStorage.getItem("booksForWishlist"));
var cartItems = document.getElementById("cartItems");

window.onload = fetchBooks();

function renderBooksInCart(cartBooks) {
    // var wishlistedBooks = JSON.parse(localStorage.getItem("booksForWishlist"));
    console.log(cartBooks);
    cartItems.innerHTML = "";
    cartBooks.forEach(book => {

        var div = document.createElement('div');
        var frontCover = document.createElement("img");
        var detailsTitle = document.createElement("p");
        var detailsAuthor = document.createElement("p");
        var detailsPrice = document.createElement("p");
        var span = document.createElement("span");

        span.className = 'remove-item';
        detailsPrice.className = 'price';

        div.setAttribute("id",book.id)
        frontCover.setAttribute("src", book.img);
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

cartItems.addEventListener('click', removeFromCart);


/////fetch cart books from server
function fetchBooks() {
    return fetch("http://localhost:3000/booksForCart", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(response => response.json());
}

fetchBooks().then(renderBooksInCart);

////remove books on server then render them
function removeFromCart(event) {
    var bookId = event.target.parentNode.getAttribute("id");
    console.log(bookId);
    if (event.target.className.includes("remove-item")) {
        fetch(`http://localhost:3000/booksFromCart/${bookId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
            .then(fetchBooks)
            .then(renderBooksInCart)
    }
}