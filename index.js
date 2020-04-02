const serialNumber = prompt("Saisissez votre numéro de série");
let isValid = true;

// == Etape 1 : Vérification du format == //
if (serialNumber.length !== 19) {
    isValid = false;
    console.error("Regle 1 : Mauvaise longueur !");
} else if (serialNumber[4] !== '-' || serialNumber[9] !== '-' || serialNumber[14] !== '-') {
    isValid = false;
    console.error("Regle 1 : Mauvais format (tiret) !");
} else if (isNaN(serialNumber.split('-').join(''))) {
    isValid = false;
    console.error("Regle 1 : Mauvais format (chiffres) !");
} else if (parseInt(serialNumber.split('-').join('')) !== parseFloat(serialNumber.split('-').join(''))) {
    isValid = false;
    console.error("Regle 1 : Mauvais format (y'a un point) !");
} else {
    const groups = serialNumber.split('-');

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
}

if (isValid) {
    alert("Le numéro de série est valide !");
} else {
    alert("Le numéro de série n'est pas valide !");
}