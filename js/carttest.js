let userCart = JSON.parse(localStorage.getItem("userCart"));

addCart = () => {
    const $form = document.getElementById('form');

    /*let inputBuy = document.getElementById("ajouterProduitPanier");
    inputBuy.addEventListener("click", async function () {*/
    $form.addEventListener('submit', (e) => {
        e.preventDefault();

        const datas = formToJson($form);
        let hasError = false;

        document.getElementById('errors_type').innerText = '';
        document.getElementById('success_type').innerText = '';
        if (!datas.type) {
            document.getElementById('errors_type').innerText = "Selectionner un objectif";
            hasError = true;
        }

        if (hasError) {
            return ;
        }

        const urlParams = new URLSearchParams(window.location.search)
        const productId = urlParams.get('id')
        const item = {
            "id": productId,
        };

        if (!localStorage.getItem("userCart")) {
            let cartInit = [];
            localStorage.setItem("userCart", JSON.stringify(cartInit));
        }

        let userCart = JSON.parse(localStorage.getItem("userCart"));

        if (!userCart.includes(item)) {
            userCart.push(item);
            localStorage.setItem("userCart", JSON.stringify(userCart));
            document.getElementById('success_type').innerText = "Produit ajouté au panier !"
        }
    });
    function formToJson($form) {
        const result = {};
        const formData = new FormData($form);
    
        Array.from(formData.keys()).forEach((key) => {
          result[key] = formData.get(key);
      })
      
      return result;
    }
};

addition = () => {

    if (JSON.parse(localStorage.getItem("userCart")).length > 0) {
        document.getElementById("basket-resume").remove();

        var products = localStorage.key("userCart");
        var listOfProducts = JSON.parse(localStorage.getItem(products));

        const promises = listOfProducts.map(item => {
            return fetch(`http://localhost:3000/api/cameras/` + item.id).then(response => {
                return response.json()
            });
        });

        Promise.all(promises).then(data => {

            const $cameras = document.getElementById('camerasCart')
            const $templateCamera = document.getElementById('cameras_template').content;

            let i = 0;

            for (element in data) {
                const $newTemplateCamera = $templateCamera.cloneNode(true);
                $newTemplateCamera.querySelector('.camera_image').src = data[element].imageUrl
                $newTemplateCamera.querySelector('.camera_name').innerHTML = data[element].name
                $newTemplateCamera.querySelector('.camera_lense').innerHTML = data[element].lenses[0]
                $newTemplateCamera.querySelector('.camera_price').innerHTML = data[element].price / 100 + "€"
                $newTemplateCamera.getElementById('remove_product').innerHTML = '<button class="cancelProduct">Supprimer<i class="fas fa-trash-alt"></i></button>'

                $cameras.append($newTemplateCamera);

                let removeProduct = document.getElementById('remove_product');
                removeProduct.setAttribute("id", "remove" + i);

                const index = i

                removeProduct.addEventListener('click', () => {
                    cancelProduct(index)
                });
                i++;

                /*let deleteProduct = document.getElementById("camerasCart");
                deleteProduct.appendChild(removeProduct);

                let ligneProduct = document.querySelector('.camera_name')
                ligneProduct.setAttribute("id", "product" + i);*/
            };
        });
    };
}

cancelProduct = (i) => {
    console.log("Enlever le Product à l'index" + i);

    userCart.splice(i, 1);
    console.log(userCart);

    localStorage.clear();
    console.log("localStorage vidé");

    localStorage.setItem('userCart', JSON.stringify(userCart));
    console.log("localStorage mis à jour");

    window.location.reload();

}