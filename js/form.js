checkInput = () => {

    let checkString = /[a-zA-Z]/;
    let checkNumber = /[0-9]/;

    let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;


    let checkMessage = "";


    let formName = document.getElementById("fname").value;
    let formEmail = document.getElementById("email").value;
    let formAdr = document.getElementById("adr").value;
    let formCity = document.getElementById("city").value;
    let formZip = document.getElementById("zip").value;


    if (checkNumber.test(formName) == true || checkSpecialCharacter.test(formName) == true || formName == "") {
        checkMessage = "Vérifier/renseigner votre nom";
    }


    if (checkMail.test(formEmail) == false) {
        checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre email";
    }


    if (checkSpecialCharacter.test(formAdr) == true || formAdr == "") {
        checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre adresse";
    }


    if (checkSpecialCharacter.test(formCity) == true && checkNumber.test(formCity) == true || formCity == "") {
        checkMessage = checkMessage + "\n" + "Vérifier/renseigner votre ville"
    }

    if (checkSpecialCharacter.test(formZip) == true && checkMail.test(formZip) == true && checkString.test(formZip) == true || formZip == "") {


        /*if (checkMessage != "") {
            alert("Il est nécessaire de :" + "\n" + checkMessage);
        }


        else {
            contact = {
                firstName: formName,
                address: formAdr,
                city: formCity,
                zip: formZip,
                email: formEmail
            };
            return contact;
        };*/
    };
}