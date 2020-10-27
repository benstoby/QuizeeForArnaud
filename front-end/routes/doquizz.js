var express = require('express');
var sa = require('superagent');
var quizzCheck = require('../utils/quizzcheck');
var router = express.Router();

router.get('/', function (req, res, next) {
    sa.get('localhost:8080/quizz')
        .query({ username: req.query.user, quizz: req.query.quizz })
        .end(function (err, response) {
            if (!err) {
                var quizz = JSON.parse(response.text);
                quizz = quizz.quizz;
                res.render('pages/quizz', { quizz: quizz, user: req.query.user, nbquizz: req.query.quizz});
            }
            else {
                res.redirect('/quizz/dashboard');
            }
        });
});

router.post('/correction', function(req, res, next) {
    sa.get('localhost:8080/quizz')
    .query({ username: req.body.user, quizz: req.body.nbquizz })
    .end(function (err, response) {
        if (!err) {
            var quizz = JSON.parse(response.text);
            var success = true;
            
            quizz = quizz.quizz;
            express.static(__dirname + '/public');
            success = quizzCheck.quizzCheck(quizz, req.body);
            sa.post('localhost:8080/quizzincrement')
            .set('accept', 'json')
            .send({username: req.body.user, quizz: req.body.nbquizz, success: success})
            .end(function (err, response) {
            });
            res.render('pages/correction', { quizz: quizz, userAnswers: req.body});
        }
        else {
            res.redirect('/quizz/dashboard');
        }
    });

  });

module.exports = router;