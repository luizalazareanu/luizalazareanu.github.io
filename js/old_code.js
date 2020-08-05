//**********************************************WISHLIST.JS************************//

// function loadProductsFromJson() {
//     const requestURL = './../web/json/products.json';
//     const request = new XMLHttpRequest();
//     request.open('GET', requestURL);
//
//     request.onload = function () {
//         var books = JSON.parse(request.responseText);
//         var selectedBook = JSON.parse(localStorage.getItem('bookForWishlist'));
//          localStorage.removeItem('bookForWishlist');
//         books.push(selectedBook);
//         // createContentFromJson(books);
//         //wishlisted(selectedBook);
//     };
//     request.send();
// }
//
// document.addEventListener("DOMContentLoaded", function () {
//     loadProductsFromJson();
// });

// document.getElementById('json-btn').addEventListener('click', function () {
//     loadProductsFromJson();
// });

//
// function createContentFromJson(books) {
//     var output = "<div class='item' id='item'>";
//
//     for (var i in books) {
//         // if (books[i].id === 101) {
//         output += "<div id='item" + i + "'>" + "<p>" + books[i].title + "</p> " + "<p>" + books[i].author + "</p>" + "<p>" + books[i].price + "</p>" + "</div>";
//         // }
//     }
//     output += "</div>";
//     document.getElementById("showItems").innerHTML = output;
//
//     for (var j in books) {
//         var img = document.createElement("img");
//         img.src = books[j].img;
//         // document.getElementById('item').appendChild(img);
//         var abc = 'item' + j;
//         var parent = document.getElementById(abc);
//         parent.insertBefore(img, parent.firstChild);
//     }
//
//     for (var k in books) {
//         var btn = document.createElement("button");
//         btn.className = 'btn_class';
//         btn.textContent = 'Add to cart';
//         var item = 'item' + k;
//         document.getElementById(item).appendChild(btn);
//
//         var span = document.createElement("span");
//         span.className = 'remove_item';
//         var item2 = 'item' + k;
//         document.getElementById(item2).appendChild(span);
//     }
// }

// function addToWishlist(books) {
//     //get book object dynamic not static
//     var wishlistBook = {
//         "id": 103,
//         "cover": "./images/book_covers/boys.jpg",
//         "title": "The Nickel Boys: Pulitzer Prize",
//         "author": "Colson Whitehead",
//         "price": "6,98",
//         "category": "fiction"
//     };
//     localStorage.setItem("bookForWishlist", JSON.stringify(wishlistBook));
//     window.location.href = 'http://localhost:8080/test/web/wishlist.html';
//
//     // var wishlistBook;
//     // for (var z in books) {
//     //     if (books[z].id === 103) {
//     //         selectedBook = books[z];
//     //         console.log(selectedBook);
//     //     }
//     // }
//     // localStorage.setItem("bookForWishlist", JSON.stringify(wishlistBook));
//     // window.location.href = 'http://localhost:8080/test/web/wishlist.html';
// }

// function wishlisted(selectedBook) {
//     var output2 = "<div class='item' id='item'>";
//     output2 += "<div id='item0'>" + "<p>" + selectedBook.title + "</p> " + "<p>" + selectedBook.author + "</p>" + "<p>" + selectedBook.price + "</p>" + "</div>";
//     output2 += "</div>";
//     document.getElementById("showItems").innerHTML = output2;
//
//     var img = document.createElement("img");
//     img.src = selectedBook.cover;
//     var parent = document.getElementById('item0');
//     parent.insertBefore(img, parent.firstChild);
//
//
//     var btn = document.createElement("button");
//     btn.className = 'btn_class';
//     btn.textContent = 'Add to cart';
//     document.getElementById('item0').appendChild(btn);
//
//     var span = document.createElement("span");
//     span.className = 'remove_item';
//     document.getElementById('item0').appendChild(span);
//
// }


// function addToWishlist2(){
//     var existingDiv = document.getElementById("showItems");
//     var div = document.createElement('div');
//     var frontCover = document.createElement("img");
//     var detailsTitle = document.createElement("p");
//     var detailsAuthor = document.createElement("p");
//     var detailsPrice = document.createElement("p");
//     var span = document.createElement("span");
//     var btn = document.createElement("button");
//      btn.className = 'btn_class';
//      btn.textContent = 'Add to cart';
//     span.className = 'remove_item';
//     detailsPrice.className = 'price';
//
//     frontCover.setAttribute("src", localStorage.getItem('bookCover'));
//     detailsTitle.innerHTML = localStorage.getItem('bookTitle');
//     detailsAuthor.innerHTML = `By (author) <b>${localStorage.getItem('bookAuthor')}</b>`;
//     detailsPrice.innerHTML = localStorage.getItem('bookPrice');
//
//     existingDiv.appendChild(div);
//     div.appendChild(frontCover);
//     div.appendChild(detailsTitle);
//     div.appendChild(detailsAuthor);
//     div.appendChild(detailsPrice);
//     div.appendChild(btn);
//     div.appendChild(span);
//     //console.log(localStorage);
//     //console.log(localStorage.Storage.entries[2]);
//     var myStorage = window.localStorage;
//     console.log(myStorage);
// }

//**********************************************WISHLIST.JS************************//