if (localStorage.getItem("userCart")) {
    console.log("User cart exist in localStorage");
} 
else {
    console.log("User cart doesn't exist, it will be created in localStorage");
    
    let cartInit = [];
    localStorage.setItem("userCart", JSON.stringify(cartInit));
};


let contact;
let products = [];


let userCart = JSON.parse(localStorage.getItem("userCart"));


addCart = () => {

    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('id')
    
    let inputBuy = document.getElementById("addProductCart");
    inputBuy.addEventListener("click", async function () {
        const cameraRaw = await fetch(`http://localhost:3000/api/cameras/${myParam}`).then(r => r.json());
        const produits = new Camera(cameraRaw)

        
        userCart.push(produits);
        localStorage.setItem("userCart", JSON.stringify(userCart));
        console.log("Product added to the cart !");
        console.log(localStorage)
    });
};