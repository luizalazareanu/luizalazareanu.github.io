
document.addEventListener('click', addBookForCart2);

export default function addBookForCart2(event){
    var bodyRequest = JSON.stringify({
        id: event.target.parentNode.getAttribute("id"),
        img: event.target.parentNode.children[0].children[0].getAttribute("src"),
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
}