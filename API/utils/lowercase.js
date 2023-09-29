function primeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lettersToLowercase(string) {
    return string.toLowerCase()
}

module.exports={primeraLetraMayuscula, lettersToLowercase}
