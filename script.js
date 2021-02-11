fetch("http://localhost:3000/api/cameras").then(promise => {
    promise.json().then(data => {

        productName = '';
        data.forEach(function (camera) { console.log(camera.name);
        //    productName = productName + '<div>' + camera.name + '</div>';
        });

     //document.getElementById("listing").innerHtml = productName;
    });
})