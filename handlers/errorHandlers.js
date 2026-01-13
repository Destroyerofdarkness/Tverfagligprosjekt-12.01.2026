

const handleUserError = (error)=>{
console.log(error.message, error.code)
const errors = {username:"", passwd: ""}
if(error.message.includes("Password doesn't match")){
    errors.passwd = "Password doesn't match or repeat the password"
    return errors
}
if(error.message.includes("User not found")){
errors.username = "The User doesn't exist"
return errors
}
if(error.message.includes("Wrong Password")){
    errors.passwd = "The provided password is not right"
    return errors
}
if(error.code === 11000){
    errors.username = "The User already exists"
    return errors
}
if(error.message.includes("Users validation failed")){
     Object.values(error.errors).forEach(({ properties }) => {
    console.log(properties.message)
    errors[properties.path] = properties.message   
  });
}
return errors
}

const handleQuoteError = (error)=>{

    const errors = {quote:"",origin:""}
    if(error.code === 11000){
    errors.quote = "The Quote is already published"
    return errors
    }
    if(error.message.includes("Quotes validation failed")){
     Object.values(error.errors).forEach(({ properties }) => {
    console.log(properties.message)
    errors[properties.path] = properties.message   
  });
  return errors
}
}

module.exports = {handleUserError, handleQuoteError}