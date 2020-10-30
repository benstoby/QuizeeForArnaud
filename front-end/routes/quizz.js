var express = require('express');
var sa = require('superagent');
var utilsjsonback = require('../utils/jsontoback');
var router = express.Router();

router.get('/quizeelink', function (req, res, next) {
    var ikeyquizz = req.query.quizz;

    res.render('pages/quizeelink', { username: req.session.user, quizz: ikeyquizz })
});

router.get('/modifier', function (req, res, next) {
    sa.get('localhost:8080/quizz')
        .query({ username: req.query.user, quizz: req.query.quizz })
        .end(function (err, response) {
            if (!err) {
                var quizz = JSON.parse(response.text);
                quizz = quizz.quizz;
                res.render('pages/modifier', { quizz: quizz, user: req.query.user, nbquizz: req.query.quizz, somethingNotValid: false});
            }
            else {
                res.redirect('/quizz/dashboard');
            }
        });

});

router.get('/dashboard', function (req, res, next) {
    var quizzs = [];

    sa.get('localhost:8080/quizzs')
        .query({ username: req.session.user })
        .end(function (err, response) {
            if (!err) {
                if (response.status == 200) {
                    var quizz = JSON.parse(response.text);
                    for (var i = 0; i < quizz.length; i++) {
                        var tmpQuizz = quizz[i].quizz;
                        tmpQuizz.creation = tmpQuizz.creation.substr(1);
                        tmpQuizz.creation = tmpQuizz.creation.split('.')[0];
                        tmpQuizz.lastmodif = tmpQuizz.lastmodif.substr(1);
                        tmpQuizz.lastmodif = tmpQuizz.lastmodif.split('.')[0];
                        tmpQuizz.lastsend = tmpQuizz.lastsend.substr(1);
                        tmpQuizz.lastsend = tmpQuizz.lastsend.split('.')[0];
                        tmpQuizz.nextsend = tmpQuizz.nextsend.substr(1);
                        tmpQuizz.nextsend = tmpQuizz.nextsend.split('.')[0];

                        quizzs.push({nbtry: tmpQuizz.nbtry, nbsuccess: tmpQuizz.nbsuccess, seuil: tmpQuizz.seuil, id: tmpQuizz.id, titre: tmpQuizz.title, creation: new Date(tmpQuizz.creation), derniere_modification: new Date(tmpQuizz.lastmodif), sujet: tmpQuizz.subject, dernier_envoi: new Date(tmpQuizz.lastsend), prochain_envoi: new Date(tmpQuizz.nextsend) })
                    }

                    // text to json puis push

                }
                else {
                    console.log('quizz not found');
                }
            }
            express.static(__dirname + '/public');
            res.render('pages/dashboard', { title: 'Express', quizzs: quizzs, username: req.session.user});
        });
});

router.get('/supprimer', function (req, res, next) {
    if (req.query.user != req.session.user) {
        res.redirect('/quizz/dashboard');
    }
    else {
        sa.post('localhost:8080/supprimer')
            .send({ username: req.query.user, id: req.query.quizz })
            .end(function (err, response) {
                res.redirect('/quizz/dashboard');
            });

    }
});

router.get('/ajouter', function (req, res, next) {
    express.static(__dirname + '/public');
    res.render('pages/ajouter', { somethingNotValid: false });
});


// creer une route post pour ajouter(question) et editer le formulaire de la vue ajouter (textarea ajouter name = "identifiant pour lier question reponse")
router.post('/ajouter', function (req, res) {

    var json = utilsjsonback.jsontoback(req);
    if (json != null) {

        sa.post('localhost:8080/quizz')
        .set('accept', 'json')
        .send(json)
        .end(function (err, response) {
            if (!err) {
                if (req.body.submit == 1) {

                    res.redirect('/quizz/dashboard');
                }
                else if (req.body.submit == 2) {
                    res.redirect('/quizz/quizeelink?quizz=' + response.text);
                }
            }
            else {
                res.render('pages/ajouter', { somethingNotValid: true });
            }
        });
    }
    else {
        res.render('pages/ajouter', { somethingNotValid: true });
    }
});

router.post('/modifier', function (req, res) {
    var json = utilsjsonback.jsontoback(req);
    if (json != null) {

        sa.put('localhost:8080/quizz')
        .set('accept', 'json')
        .send(json)
        .end(function (err, response) {
            if (!err) {
                if (req.body.submit == 1) {

                    res.redirect('/quizz/dashboard');
                }
                else if (req.body.submit == 2) {
                    res.redirect('/quizz/quizeelink?quizz=' + response.text);
                }
            }
            else {
                res.render('pages/ajouter', { somethingNotValid: true });
            }
        });
    }
    else {
        res.render('pages/ajouter', { somethingNotValid: true });
    }
});

router.post('/dupliquer', function (req, res, next) {
    sa.get('localhost:8080/quizz')
    .query({ username: req.session.user, quizz: req.body.id })
    .end(function (err, response) {
        if (!err) {
            var quizz = JSON.parse(response.text);
            quizz.quizz.username = req.session.user;

            sa.post('localhost:8080/quizz')
            .set('accept', 'json')
            .send(quizz)
            .end(function (err, responsePost) {
                if (!err) {
                    res.redirect('/quizz/dashboard');
                }
                else {
                    console.log(err);
                    res.redirect('/quizz/dashboard');
                }
            });
        
     
        }
        else {
            console.log(err);
            res.redirect('/quizz/dashboard');
        }
    });
});

module.exports = router;
