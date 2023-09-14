const expresiones = {
    txtPassword: /^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ0-9!@#$%^&.\-_\-.,"';~*?_~+%&#/]{6,20}$/,
    txtEmail: /^[a-zA-Z0-9_\-.~]{2,}@[a-zA-Z0-9_\-.~]{2,}\.[a-zA-Z]{2,4}$/
  }
const validarEmail = (data) => {
    if (!expresiones.txtEmail.test(data)) return false
    return true
}
const validarPassword = (data) => {
    if (!expresiones.txtPassword.test(data)) return false
    return true
}

module.exports={validarEmail, validarPassword}