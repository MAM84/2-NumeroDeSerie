const serialNumber = document.getElementById('serialNumber');
const btnValid = document.getElementById('btnValid');
const rslt = document.getElementById('rslt');
const list = document.getElementById('list');
const nbRest = document.getElementById('nbRest')

serialNumber.value = "";

isValid = true;

serialNumber.addEventListener('input', function(){
    if (serialNumber.value.length === 4 && (isNaN(serialNumber.value)) === false){
        serialNumber.value += '-';
    }else if(serialNumber.value.length === 9 && (isNaN(serialNumber.value.split('-').join(''))) === false){
        serialNumber.value += '-';
    }else if(serialNumber.value.length === 14 && (isNaN(serialNumber.value.split('-').join(''))) === false){
        serialNumber.value += '-';
    // == Etape 1 : Vérification du format == //
    }else if (serialNumber.value.length !== 19) {
        btnValid.setAttribute("disabled","");
        console.error("Regle 1 : Mauvaise longueur !");
    } else if (serialNumber.value[4] !== '-' || serialNumber.value[9] !== '-' || serialNumber.value[14] !== '-') {
        btnValid.setAttribute("disabled","");
        console.error("Regle 1 : Mauvais format (tiret) !");
    } else if (isNaN(serialNumber.value.split('-').join(''))) {
        btnValid.setAttribute("disabled","");
        console.error("Regle 1 : Mauvais format (chiffres) !");
    } else if (parseInt(serialNumber.value.split('-').join('')) !== parseFloat(serialNumber.value.split('-').join(''))) {
        btnValid.setAttribute("disabled","");
        console.error("Regle 1 : Mauvais format (y'a un point ou autre) !");
    }else{
        btnValid.removeAttribute("disabled");
    }
})
    
btnValid.addEventListener('click', function(){
    isValid = true
    const groups = serialNumber.value.split('-');
    // == Etape 2 : Groupe 1 & Groupe 3 == //
    if (groups[0] !== groups[2].split('').reverse().join('')) {
            isValid = false;
            console.error("Regle 2 !");
    }
    const group3 = parseInt(groups[2]);
    const group2 = parseInt(groups[1]);
    // == Etape 3 : Groupe 3 & Groupe 2 == //
    if ((group3 * 7) % 10000 !== group2) {
        isValid = false;
        console.error("Regle 3 !");
    }
    const group1 = parseInt(groups[0]);
    const group4 = parseInt(groups[3]);
    // == Etape 4 : La somme == //
    if ((group1 + group2 + group3 + group4) % 10000 !== 0) {
        isValid = false;
        console.error("Regle 4 !");
    }
    if (isValid) {
        rslt.textContent = "Votre numéro de série est valide";
        list.innerHTML = list.innerHTML + "<li>" + serialNumber.value + "</li>";
        nbRest.textContent = "Nombre de numéros valides restants : " + (10000-list.childElementCount);
        
    } else {
        rslt.textContent = "Votre numéro de série n'est pas valide";
        
    }
})