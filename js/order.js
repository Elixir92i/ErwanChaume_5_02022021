// Récupération de la date actuelle + 10 jours pour estimer la livraison
var targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 10);

var dd = targetDate.getDate();
var mm = targetDate.getMonth() + 1;
var yyyy = targetDate.getFullYear();

var dateString = dd + "/" + mm + "/" + yyyy;

// Récupération des informations de confirmation dans le sessionStorage
let orderDetails = JSON.parse(sessionStorage.getItem("orderSum"));

// Affichage des différents éléments sur la page order.html
document.getElementById("orderId").innerHTML = '<h3>Votre numéro de commande: </h3>' + orderDetails.orderId;
document.getElementById("confirmOrder").innerHTML = `Merci pour votre commande chez Orinoco, nous espérons que vos produits vous satisferont ! Un e-mail de confirmation de commande vous a été envoyé à l'adresse mail suivante: ` + '<span>' + orderDetails.contact.email + '</span>' + ` contenant la facture d'achat.`
document.getElementById("orderFName").innerHTML = orderDetails.contact.firstName;
document.getElementById("orderLName").innerHTML = orderDetails.contact.lastName;
document.getElementById("orderEmail").innerHTML = orderDetails.contact.email;
document.getElementById("orderCity").innerHTML = orderDetails.contact.city;
document.getElementById("orderAddress").innerHTML = orderDetails.contact.address;
document.getElementById("deliveryDate").innerHTML = '<h3>Date de livraison estimée: </h3>' + dateString;

// Supprime les données stockées dans le sessionStorage lors du clique sur le bouton de retour à l'acceuil
function clearStorage() {
    sessionStorage.clear();
}
