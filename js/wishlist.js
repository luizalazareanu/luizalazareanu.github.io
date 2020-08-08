//var wishlistedBooks = JSON.parse(localStorage.getItem("booksForWishlist"));
var existingDiv = document.getElementById("showItems");

function renderBooks(wishlistedBooks) {
    //console.log(wishlistedBooks);
    existingDiv.innerHTML ="";
    wishlistedBooks.forEach(book => {

        var div = document.createElement('div');
        var frontCover = document.createElement("img");
        var detailsTitle = document.createElement("p");
        var detailsAuthor = document.createElement("p");
        var detailsPrice = document.createElement("p");
        var span = document.createElement("span");
        var btn = document.createElement("button");
        btn.className = 'add-to-cart';
        btn.textContent = 'Add to cart';
        span.className = 'remove-item';
        detailsPrice.className = 'price';

        div.setAttribute("id",book.id)
        frontCover.setAttribute("src", book.img);
        detailsTitle.innerHTML = book.title;
        detailsAuthor.innerHTML = book.author.slice(15, -4);
        detailsPrice.innerHTML = book.price;

        existingDiv.appendChild(div);
        div.appendChild(frontCover);
        div.appendChild(detailsTitle);
        div.appendChild(detailsAuthor);
        div.appendChild(detailsPrice);
        div.appendChild(btn);
        div.appendChild(span);
    })
}

window.onload = fetchBooks();

existingDiv.addEventListener('click', removeFromWishlist);


/////fetch wishlisted books from server
function fetchBooks(){
    return fetch("http://localhost:3000/booksForWishlist",{
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }).then(response =>response.json());
}

fetchBooks().then(renderBooks);

////remove books on server then render them
function removeFromWishlist(event) {
    var bookId = event.target.parentNode.getAttribute("id");
    console.log(bookId);
    if (event.target.className.includes("remove-item")) {
        fetch(`http://localhost:3000/booksFromWishlist/${bookId}`,{
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
            .then(fetchBooks)
            .then(renderBooks)
    }
}