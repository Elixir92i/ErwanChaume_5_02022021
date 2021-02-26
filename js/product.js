async function main() {
    try {
        // Récupère l'id dans l'URL de la page
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');

        // Récupération des informations présentes dans l'API en fonction de l'URL de la page (?id=)
        const cameraRaw = await fetch(`http://localhost:3000/api/cameras/${myParam}`).then(r => r.json());
        const camera = new Camera(cameraRaw)

        // Titre de la page dynamique en fonction de l'objet consulté
        document.title = camera.name + ' | Achat appareils photo vintage !';

        // Affichage des informations du produit consulté
        document.getElementById("camera_name").innerText = camera.name;
        document.getElementById("camera_image").setAttribute("src", camera.imageUrl)
        document.getElementById("camera_description").innerHTML = '<span>Description du produit: </span><br />' + camera.description;
        document.getElementById("camera_price").innerHTML = '<span>Prix: </span>' + camera.price / 100 + '€';
        camera.lenses.forEach((produit) => {
            let optionProduit = document.createElement("option");
            document.getElementById("camera_lenses").appendChild(optionProduit).innerHTML = produit;
        });
    }
    catch (error) {

    }
};
main();
