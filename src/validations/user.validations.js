export const validatePassword = password => {
  // password must contain one number, one uppercase letter and one lowercase letter
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  const isValid = passwordRegExp.test(password)
  return isValid
}
export const validateUsername = username => {
  // username debe tener entre 8 y 30 caracteres, solo puede contener '_' como caracter especial y debe empezar con una letra
  const usernameRegExp = /^[A-Za-z][A-Za-z0-9_]{7,29}$/
  const isValid = usernameRegExp.test(username)
  return isValid
}
export const validateEmail = email => {
  // RegEx email según w3.org
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const isValid = emailRegExp.test(email)
  return isValid
}
