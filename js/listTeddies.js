async function main() {
    try {
        const teddiesRaw = await fetch('http://localhost:3000/api/teddies').then(r => r.json());
        const teddies = teddiesRaw.map(value => new Teddy(value))

        const $teddies = document.getElementById('teddies')
        const $templateTeddy = document.getElementById('teddies_template').content;

        teddies.forEach(teddy => {
            const $newTemplateTeddy = $templateTeddy.cloneNode(true);
            $newTemplateTeddy.querySelector('.teddy_name').innerText = teddy.name
            $newTemplateTeddy.querySelector('.teddy_image').src = teddy.imageUrl

            $teddies.append($newTemplateTeddy);
        });
        // $teddies.innerHTML = teddies
        //     .map(teddy => teddy.toHtml())
        //     .join('<hr>');
    } catch (error) {

    }
}

main();