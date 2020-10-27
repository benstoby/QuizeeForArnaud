var passwordValidator = require('password-validator');

var passwordShema = new passwordValidator();
 
// Add properties to it
passwordShema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['password1234', 'Password1234']); // Blacklist these values

var secureShema = new passwordValidator();
 
// Add properties to it
secureShema
.is().max(1000)                                  // Maximum length 100
.has().not().symbols();

var secureShemaForce = new passwordValidator();
 
// Add properties to it
secureShemaForce
.is().min(1)
.is().max(100)                                  // Maximum length 100
.has().not().symbols();

var verifPass = function(password, passcpy)
{
    if(passwordShema.validate(password) && password.localeCompare(passcpy) == 0)
    {
        return true;
    }
    return false;
}
var verifchampForce = function(champ)
{
    if(secureShemaForce.validate(champ))
    {
        return true;
    }
    return false;
}

var verifchamp = function(champ)
{
    if(secureShema.validate(champ))
    {
        return true;
    }
    return false;
}

exports.verifchamp = verifchamp;
exports.verifPass = verifPass;
exports.verifchampForce = verifchampForce;
