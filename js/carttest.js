let userCart = JSON.parse(localStorage.getItem("userCart"));

addCart = () => {
    const $form = document.getElementById('form');

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
            return;
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

        var isInUserCart = false;
        userCart.forEach (element => {
            if (productId == element.id) {
                isInUserCart = true;
            }
        });
        if (!isInUserCart) {
            userCart.push(item);
            localStorage.setItem("userCart", JSON.stringify(userCart));
            window.location.reload();
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

cartInfo = () => {
    var x = 0
    if (JSON.parse(localStorage.getItem("userCart")).length > 0) {
        let infoCart = document.createElement("div")
        infoCart.setAttribute("id", "pastille")
        document.getElementById("info-cart").appendChild(infoCart)
    };
    for (i = 0; i < userCart.length; i++) {
        x = userCart.length
        document.getElementById("pastille").innerHTML = x;
    }

}

addition = () => {
    if (JSON.parse(localStorage.getItem("userCart")).length <= 0) {
        document.getElementById("totalPrice").style.display = "none";
    }
    if (JSON.parse(localStorage.getItem("userCart")).length > 0) {
        document.getElementById("basket-resume").remove();

        let createTotal = document.createElement("div");
        createTotal.setAttribute("id", "totalCart");
        document.getElementById("totalPrice").appendChild(createTotal);

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
                $newTemplateCamera.querySelector('.camera_lense').innerHTML = '<span>Objectif: </span> ' + data[element].lenses[0]
                $newTemplateCamera.querySelector('.camera_price').innerHTML = '<span>Prix: </span> ' + " " + data[element].price / 100 + "€"
                $newTemplateCamera.getElementById('remove_product').innerHTML = '<button class="cancelProduct"><i class="fas fa-trash-alt"></i> <span class="delete-btn">Supprimer</span></button>'

                $cameras.append($newTemplateCamera);

                let removeProduct = document.getElementById('remove_product');
                removeProduct.setAttribute("id", "remove" + i);

                const index = i

                removeProduct.addEventListener('click', () => {
                    cancelProduct(index)
                });
                i++;

                let totalPrice = 0
                for (element in data) {
                    totalPrice += data[element].price / 100;
                };
                console.log(totalPrice)
                document.getElementById("totalCart").innerHTML = '<span>Total du panier: </span>' + totalPrice + '€'
            };
        });
    };
}

cancelProduct = (i) => {
    userCart.splice(i, 1);
    localStorage.setItem('userCart', JSON.stringify(userCart));
    window.location.reload();
}