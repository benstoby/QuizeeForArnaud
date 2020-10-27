var express = require('express');
var validator = require("email-validator");
var sendmail = require('../utils/send-email');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('pages/contact', {isEmailNotValid: false});
});

router.post('/contact', function(req, res, next) {
  // envoyer un post vers le back-end soit a l'adress localhost:8080/user
  var from = req.body.from;
  var subject = req.body.subject;
  var text = req.body.text;

  if(validator.validate(from))
  {
    var checkvariable = sendmail.sendmail(from, subject, text);
    res.redirect('/');
  }
  else
  {
    //informer avec un res render l'utilisateur que son email n'est pas valide 
    // aide : faire une condition en ejs
    console.log("attaque detecter");
    res.render('pages/contact', {isEmailNotValid: true});
  }
});

router.get('/infos', function(req, res, next) {
  res.render('pages/infos', { title: 'Express' });
});

router.get('/equipe', function(req, res, next) {
  res.render('pages/equipe', { title: 'Express' });
});


module.exports = router;
