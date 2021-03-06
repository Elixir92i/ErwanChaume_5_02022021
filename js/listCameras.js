async function main() {
    try {
        // Récupération des informations présentes dans l'API
        const camerasRaw = await fetch('http://localhost:3000/api/cameras').then(r => r.json());
        const cameras = camerasRaw.map(value => new Camera(value))

        // Affichage des différents éléments
        const $cameras = document.getElementById('cameras')
        const $templateCamera = document.getElementById('cameras_template').content;

        // Mise en place de la template pour chaque produit
        cameras.forEach(camera => {
            const $newTemplateCamera = $templateCamera.cloneNode(true);
            $newTemplateCamera.querySelector('.camera_name').innerText = camera.name
            $newTemplateCamera.querySelector('.camera_lenses').innerHTML = '<span>Objectif: </span>' + camera.lenses[0] + '<span>...</span>'
            $newTemplateCamera.querySelector('.camera_image').src = camera.imageUrl
            $newTemplateCamera.querySelector('.camera_id').innerHTML = '<span>Ref: </span>' + camera.id
            $newTemplateCamera.querySelector('.camera_description').innerText = camera.description
            $newTemplateCamera.querySelector('.camera_price').innerText = camera.price / 100 + ',00€'
            $newTemplateCamera.querySelector('.moreinfo').href = 'product.html?id=' + camera.id;
            $cameras.append($newTemplateCamera);
        });
    } catch (error) {
        alert('Une erreur est survenue !')
    }
}

main();