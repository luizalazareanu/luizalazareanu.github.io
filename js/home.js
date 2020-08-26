document.addEventListener('click', addBookForCart2);

export default function addBookForCart2(event) {
    if (event.target.className == "add-to-cart") {
        var bodyRequest = JSON.stringify({
            id: event.target.parentNode.getAttribute("id"),
            img: event.target.parentNode.children[0].children[0].getAttribute("src"),
            title: event.target.parentNode.children[1].innerHTML,
            author: event.target.parentNode.children[2].innerHTML,
            price: event.target.parentNode.children[3].innerHTML,
        });
        //console.log(event.target);
        postBookInCart(bodyRequest)
            .then(fetchBooksForCart)
            .then(getNoOfCartItems)
    }
}

///story slider
var cards = document.querySelectorAll(".card");
var cardsArray = Object.values(cards);

document.addEventListener("click", function (event) {
    if (event.target.id == "swipe-next" || event.target.id =="swipe-prev") {
        cardsArray.forEach(card =>
            //console.log(card.getComputedStyle.getPropertyValue("z-index"))
            card.style.visibility = "hidden"
        );
        cardsArray[cardsArray.length - 2].style.visibility = "visible";
        //console.log(zindex);
        //card.style.zIndex += 1);
        //cardsArray[cardsArray.length-1].style.zIndex = "1";
        //cardsArray.reverse();
        var lastElement = cardsArray[cardsArray.length - 1];
        cardsArray.pop();
        cardsArray.unshift(lastElement);
        //console.log(cardsArray);
    }
});