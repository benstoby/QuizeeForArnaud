var passwordHash = require('password-hash');

var resG;
var reqG;

var setUser = function (client, req, res) {
    resG = res;
    reqG = req;
    client.exists(req.body.username, function(err, reply) {
        if (reply === 0) {
            var options = {algorithm : 'sha512'}
            var hashedPassword = passwordHash.generate(reqG.body.password[0], options);
            client.hmset(reqG.body.username, 'firstname', reqG.body.firstname, 'lastname', reqG.body.lastname, 'email', reqG.body.email[0], 'socity', reqG.body.socity, 'function', reqG.body.function, 'country', reqG.body.country, 'password', hashedPassword);
            resG.sendStatus(200);
        } else {
            resG.sendStatus(218);
        }
    });
}

exports.setUser = setUser;