const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        console.log(myParam)

async function main() {
    try {
        const camerasRaw = await fetch('http://localhost:3000/api/cameras').then(r => r.json());
        const cameras = camerasRaw.map(value => new Camera(value))
        console.log(cameras)

    }
    catch (error) {

    }
};

main();