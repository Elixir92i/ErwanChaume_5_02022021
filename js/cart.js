let userCart = JSON.parse(localStorage.getItem("userCart"));

displayForm = () => {
    // Permet de ne pas afficher le formulaire si le localStorage n'existe pas
    if (!localStorage.getItem("userCart")) {
        document.getElementById("totalPrice").style.display = "none";
    }
}

// Création de la fonction d'ajout au panier
addCart = () => {

    // Obligation de choisir un objectif d'appareil photo pour ajouter au panier
    const $form = document.getElementById('form');
    $form.addEventListener('submit', (e) => {
        e.preventDefault();

        const datas = formToJson($form);
        let hasError = false;

        document.getElementById('errors_type').innerText = '';
        if (!datas.type) {
            document.getElementById('errors_type').innerText = "Selectionner un objectif";
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // Création de l'objet dans le localStorage (Quantité + Id)
        const urlParams = new URLSearchParams(window.location.search)
        const productId = urlParams.get('id')
        let selectQuantity = document.getElementById("productQuantity");
        let selectedQuantity = selectQuantity.options[selectQuantity.selectedIndex].value;
        let selectLense = document.getElementById("camera_lenses");
        let selectedLense = selectLense.options[selectLense.selectedIndex].value;
        const item = {
            "id": productId,
            "quantity": selectedQuantity,
            "lense": selectedLense
        };

        if (!localStorage.getItem("userCart")) {
            let cartInit = [];
            localStorage.setItem("userCart", JSON.stringify(cartInit));
        }

        let userCart = JSON.parse(localStorage.getItem("userCart"));

        // Vérifie si l'objet est déjà dans le pannier, si c'est le cas impossible de l'ajouter une nouvelle fois
        var isInUserCart = false;
        userCart.forEach(element => {
            if ((selectedLense == element.lense) && (productId == element.id)) {
                isInUserCart = true;
            }
        });

        if (!isInUserCart) {
            userCart.push(item);
            localStorage.setItem("userCart", JSON.stringify(userCart));
            window.location.reload();
        }

        // Permet d'actualiser la quantité lorsque le produit à déjà été ajouté au panier depuis la page produit
        userCart.forEach(element => {
            if ((selectedLense == element.lense) && (productId == element.id)) {
                element.quantity = selectedQuantity;
                localStorage.setItem("userCart", JSON.stringify(userCart));
                window.location.reload();
            }
        });
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

// Création de la pastille avec le nombre d'ojbet dans le pannier sur le header
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

// Création du panier
addition = () => {
    // Ne pas afficher le pannier si il est vide
    if (JSON.parse(localStorage.getItem("userCart")).length <= 0) {
        document.getElementById("totalPrice").style.display = "none";
    }

    // Ne pas afficher le commentaire "panier vide" si il contient un objet
    if (JSON.parse(localStorage.getItem("userCart")).length > 0) {
        document.getElementById("basket-resume").remove();

        // Création du prix total
        let createTotal = document.createElement("div");
        createTotal.setAttribute("id", "totalCart");
        document.getElementById("totalPrice").appendChild(createTotal);

        var products = localStorage.key("userCart");
        var listOfProducts = JSON.parse(localStorage.getItem(products));

        // Récupération des donnés de l'API
        const promises = listOfProducts.map(item => {
            return fetch(`http://localhost:3000/api/cameras/` + item.id).then(response => {
                return response.json()
            });
        });

        // Affichage des différents objets présent dans le localStorage (userCart)
        Promise.all(promises).then(data => {

            const $cameras = document.getElementById('camerasCart')
            const $templateCamera = document.getElementById('cameras_template').content;
            let i = 0;
            // Mise en place de la template pour chaque objet
            for (element in data) {
                const $newTemplateCamera = $templateCamera.cloneNode(true);
                $newTemplateCamera.querySelector('.camera_image').src = data[element].imageUrl
                $newTemplateCamera.querySelector('.camera_name').innerHTML = data[element].name
                $newTemplateCamera.querySelector('.camera_lense').innerHTML = '<span>Objectif: </span> ' + listOfProducts[element].lense
                $newTemplateCamera.querySelector('.camera_price').innerHTML = '<span>Prix: </span> ' + " " + data[element].price * listOfProducts[element].quantity / 100 + "€"
                $newTemplateCamera.getElementById('remove_product').innerHTML = '<button class="cancelProduct"><i class="fas fa-trash-alt"></i> <span class="delete-btn">Supprimer</span></button>'
                $newTemplateCamera.querySelector('.quantityCheck').innerHTML = '<div data-id="' + data[element]._id + '" data-lense="' + listOfProducts[element].lense + '" class="more">+</div><span>Quantité: </span>' + listOfProducts[element].quantity + '<div data-id="' + data[element]._id + '"data-lense="' + listOfProducts[element].lense + '" class="less">-</div>';

                $cameras.append($newTemplateCamera);

                // Création du bouton supprimer sur chaque objets afin de les retirer du localStorage (userCart)
                let removeProduct = document.getElementById('remove_product');
                removeProduct.setAttribute("id", "remove" + i);

                const index = i
                removeProduct.addEventListener('click', () => {
                    cancelProduct(index)
                });
                i++;

                // Calcul  du total du panier (prix unitaire * quantité) + affichage
                let totalPrice = 0
                for (element in data) {
                    totalPrice += data[element].price * listOfProducts[element].quantity / 100;
                };
                document.getElementById("totalCart").innerHTML = '<span>Total du panier: </span>' + totalPrice + '€'
            };

            // Possibilité de réduire la quantité d'un produit via le panier
            document.addEventListener('click', e => {
                if (!e.target.classList.contains("less")) {
                    return;
                }
                for (element in listOfProducts) {
                    if (listOfProducts[element].lense == e.target.dataset.lense && listOfProducts[element].id == e.target.dataset.id && listOfProducts[element].quantity > 1) {
                        listOfProducts[element].quantity--;
                        window.location.reload();
                    }
                }
                localStorage.setItem("userCart", JSON.stringify(listOfProducts));
            });
            // Possibilité d'augmenter la quantité d'un produit via le panier
            document.addEventListener("click", e => {
                if (!e.target.classList.contains("more")) {
                    return;
                }
                for (element in listOfProducts) {
                    if (listOfProducts[element].lense == e.target.dataset.lense && listOfProducts[element].id == e.target.dataset.id && listOfProducts[element].quantity < 5) {
                        listOfProducts[element].quantity++;
                        window.location.reload();
                    }
                }
                localStorage.setItem("userCart", JSON.stringify(listOfProducts));
            });
        });
    };
}

// Fonction pour supprimer un produit du localStorage (userCart)
cancelProduct = (i) => {
    userCart.splice(i, 1);
    localStorage.setItem('userCart', JSON.stringify(userCart));
    window.location.reload();
}