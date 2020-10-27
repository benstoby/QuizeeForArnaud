var express = require('express');
var sa = require('superagent');
var validator = require("email-validator");
var secucheck = require('../utils/secucheck');
var utilslogin = require('../utils/checklogin');


var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/connexion', function (req, res, next) {
  express.static(__dirname + '/public');
  res.render('pages/connexion', { somethingNotValid: false });
});

router.get('/logout',utilslogin.checklogin, function (req, res, next) {
  express.static(__dirname + '/public');

  sa.get('localhost:8080/user')
    .query({ username: req.session.user })
    .end(function (err, response) {
        if (!err) {
          var user = JSON.parse(response.text);
          console.log(response.text);
          res.render('pages/logout', { user: user, username : req.session.user });
        }
        else {
            console.log(err);
            res.redirect('/quizz/dashboard');
        }
    });

  
  //req.session.destroy(function(err) {
  //res.redirect('/connexion');
  //})

});

router.post('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/');
  })
});

router.get('/formulaire', function (req, res, next) {
  express.static(__dirname + '/public');
  res.render('pages/formulaire', { somethingNotValid: false });
});

router.get('/reinitialisemdp1', function (req, res, next) {
  express.static(__dirname + '/public');
  res.render('pages/reinitialisemdp1', { title: 'Express' });
});

router.get('/reinitialisemdp2', function (req, res, next) {
  express.static(__dirname + '/public');
  res.render('pages/reinitialisemdp2', { title: 'Express' });
});

router.post('/signin', function (req, res, next) {
  // envoyer un post vers le back-end soit a l'adress localhost:8080/user
  // verifier l'email avant l'inscription et envoyer un message d'erreur si ce n'est pas le cas
  var email = req.body.email[0];
  if (validator.validate(email) &&
    req.body.email[0].localeCompare(req.body.email[1]) == 0 &&
    secucheck.verifPass(req.body.password[0], req.body.password[1]) &&
    secucheck.verifchampForce(req.body.username) &&
    secucheck.verifchamp(req.body.lastname) &&
    secucheck.verifchamp(req.body.firstname) &&
    secucheck.verifchamp(req.body.country) &&
    secucheck.verifchamp(req.body.socity) &&
    secucheck.verifchamp(req.body.function)) {
    sa.post('localhost:8080/signin')
      .send(req.body)
      .end(function (err, response) {
        if (!err) {
          if (response.status == 200) {
            req.session.user = req.body.username;
            res.redirect('/users/connexion');
          }
          else {
            res.render('pages/formulaire', { somethingNotValid: true });
          }
        }
        else {
          console.log(err);
        }
      });
    
  }
  else {
    //informer avec un res render l'utilisateur que son email n'est pas valide 
    // aide : faire une condition en ejs
    console.log("attaque detecter");
    res.render('pages/formulaire', { somethingNotValid: true });
  }
});

router.post('/login', function (req, res, next) {
  // envoyer un post vers le back-end soit a l'adress localhost:8080/user
  if (  secucheck.verifchamp(req.body.username) &&
        secucheck.verifchamp(req.body.password))
  {
    sa.post('localhost:8080/login')
      .send(req.body)
      .end(function (err, response) {
        if (!err) {
          if (response.status == 200) {
            req.session.user = req.body.username;
            res.redirect('/quizz/dashboard');
          }
          else {
            res.render('pages/connexion', { somethingNotValid: true });
          }
        }
        else {
          console.log(err);
        }
      });
  }
  else
  {
    console.log("attaque detecter");
    res.render('pages/connexion', { somethingNotValid: true });
  }
});


module.exports = router;
