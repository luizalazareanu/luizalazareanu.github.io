//var wishlistedBooks = JSON.parse(localStorage.getItem("booksForWishlist"));
var cartItems = document.getElementById("cartItems");

document.addEventListener("DOMContentLoaded", function () {
    fetchBooksForCart().then(renderBooksInCart);
    fetchBooksForCart().then(getNoOfCartItems);
    fetchBooksForCart().then(getSubtotal);
    getTotal();
});

function renderBooksInCart(cartBooks) {
    // var wishlistedBooks = JSON.parse(localStorage.getItem("booksForWishlist"));
    //console.log(cartBooks);
    cartItems.innerHTML = "";
    if(cartBooks == ""){
        document.getElementById("left-pane-summary").style.visibility = "hidden";
    }

    cartBooks.forEach(book => {

        var div = document.createElement('div');
        var frontCover = document.createElement("img");
        var detailsTitle = document.createElement("p");
        var detailsAuthor = document.createElement("p");
        var detailsPrice = document.createElement("p");
        var span = document.createElement("span");

        span.className = 'remove-item';
        detailsPrice.className = 'price';

        div.setAttribute("id", book.id)
        frontCover.setAttribute("src", book.img);
        detailsTitle.innerHTML = book.title;
        detailsTitle.style.fontWeight = "bold";
        detailsAuthor.innerHTML = book.author;
        //detailsAuthor.innerHTML = book.author.slice(15, -4);
        detailsPrice.innerHTML = book.price;
        // var priceToInteger = parseFloat(book.price.replace(',', '.'));
        // console.log(book.discount);
        // detailsPrice.innerHTML = priceToInteger - priceToInteger*(parseFloat(book.discount))/100;

        cartItems.appendChild(div);
        div.appendChild(frontCover);
        div.appendChild(detailsTitle);
        div.appendChild(detailsAuthor);
        div.appendChild(detailsPrice);

        div.appendChild(span);
    })
}

cartItems.addEventListener('click', removeFromCart);


////remove books on server then render them
function removeFromCart(event) {
    var bookId = event.target.parentNode.getAttribute("id");
    //console.log(bookId);
    if (event.target.className.includes("remove-item")) {
        fetch(`http://localhost:3000/booksFromCart/${bookId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
            .then(fetchBooksForCart)
            .then(renderBooksInCart)
            .then(fetchBooksForCart)
            .then(getSubtotal)
            .then(fetchBooksForCart)
            .then(getNoOfCartItems);
        //getTotal();
    }
}

/// calculate subtotal
var subtotal = document.getElementById("subtotal");

function getSubtotal(cartBooks) {
    //console.log(cartBooks);
    //var subtotal = document.getElementById("subtotal");
    subtotal.innerHTML = cartBooks.reduce((accumulator, currentObj) => {
        //console.log( parseFloat(currentObj.price.replace(',','.').replace(' ','')));
        return Math.round((accumulator + parseFloat(currentObj.price.replace(',', '.').replace(' ', ''))) * 100) / 100;
    }, 0);
}

///calculate total
function getTotal() {
    var shippingOptions = document.querySelectorAll(".shipping-option");
    var shippingArray = Object.values(shippingOptions);
    setTimeout(function () {
        var total = document.getElementById("total");
        const checkedItem = shippingArray.find(item => item.children[0].checked);
        if (checkedItem) {
            const shippingCost = checkedItem.children[0].value;
            total.textContent = `${parseFloat(subtotal.innerHTML) + parseInt(shippingCost)}£`;
        } else {
            total.innerText = `${subtotal.innerHTML}£`;
        }
    }, 500);
}

document.addEventListener("click", function (event) {
    if (event.target.name = "shipping") {
        getTotal();
    }
});