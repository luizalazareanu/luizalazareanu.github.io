document.addEventListener("DOMContentLoaded", function () {
    fetchBooksForWishlist().then(renderBooks);
});

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


existingDiv.addEventListener('click', removeFromWishlist);

////remove books on server then render them
function removeFromWishlist(event) {
    var bookId = event.target.parentNode.getAttribute("id");
    //console.log(bookId);
    if (event.target.className.includes("remove-item")) {
        fetch(`http://localhost:3000/booksFromWishlist/${bookId}`,{
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
            .then(fetchBooksForWishlist)
            .then(renderBooks)
    }
}

////add to cart from wishlist
existingDiv.addEventListener('click', function (event) {
    var bodyRequest = JSON.stringify({
        id: event.target.parentNode.getAttribute("id"),
        img: event.target.parentNode.children[0].getAttribute("src"),
        title: event.target.parentNode.children[1].innerHTML,
        author: event.target.parentNode.children[2].innerHTML,
        price: event.target.parentNode.children[3].innerHTML,
    });
    if (event.target.className == "add-to-cart") {
        //console.log(event.target);
        postBookInCart(bodyRequest)
            .then(fetchBooksForCart)
            .then(getNoOfCartItems)
    }
});