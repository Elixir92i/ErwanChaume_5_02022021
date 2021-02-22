addCart = () => {
    let inputBuy = document.getElementById("addProductCart");
    inputBuy.addEventListener("click", async function () {
        const urlParams = new URLSearchParams(window.location.search)
        const productId = urlParams.get('id')
        if (!localStorage.getItem("userCart")) {
            let cartInit = [];
            localStorage.setItem("userCart", JSON.stringify(cartInit));
        }
        let userCart = JSON.parse(localStorage.getItem("userCart"));
        if (!userCart.includes(productId)) {
            userCart.push(productId);
            localStorage.setItem("userCart", JSON.stringify(userCart));
        }
    });
};

for (var i = 0; i < localStorage.length; i++) {
    var products = localStorage.key("productId");
    var userCart = JSON.parse(localStorage.getItem(products));
};

document.addEventListener("click", event => {
    if (!event.target.classList.contains("removeProduct")) {
        return;
    }
    for (productId in userCart) {
        if (userCart[productId].id === event.target.dataset.id) {
            userCart.splice(productId, 1);
            window.location.reload();
        }
    }
    localStorage.setItem("userCart", JSON.stringify(userCart));
});