var express = require('express');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres\
var redis = require('redis');
var IoRedis = require('ioredis');
var setQuizzUtils = require('./utils/quizzUtils');
var getQuizzUtils = require('./utils/getQuizzUtils');
var getUserUtils = require('./utils/getUserUtils');
var getQuizzsUtils = require('./utils/getQuizzsUtils');
var passwordHash = require('password-hash');

const { setUser } = require('./utils/usersUtils');


var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var client = redis.createClient(); //creates a new client

var ioRedis = new IoRedis();

var client = redis.createClient(35221, 'sb249585-001.dbaas.ovh.net', {no_ready_check: true});
client.auth('pass', function (err) {
    if (err) console.error(err);
});

client.on('connect', function (error) {
    if(error)
        console.error(error);
    console.log('connected');
});


app.use(bodyParser.json())
    .use(function (req, res, next) {

        next();
    })
    // traformer les deux set en un hmset
    .post('/signin', urlencodedParser, function (req, res) {
        setUser(client, req, res);
    })

    

    .post('/login', urlencodedParser, function (req, res) {
        client.hgetall(req.body.username, function (err, results) {
            if (err) {
                // do something like callback(err) or whatever
                res.sendStatus(218);
            } else {
                // do something with results
                if(results)
                {
                    if (passwordHash.verify(req.body.password, results.password)) {
                        results.password = '';
                        res.setHeader('Content-Type', 'text/plain');
                        res.json(results);
                        res.send();
                    }
                    else{
                        res.sendStatus(218);
                    }
                }
                else
                {
                    res.sendStatus(218);
                }

            }
        });
    })

    .get('/user', function (req, res) {
        getUserUtils.getUser(req.query.username, res, client)
    })

    //creer un post et un get pour la clé sur paint

    .post('/quizz', urlencodedParser, function (req, res) {
        var quizz = req.body.quizz;
        setQuizzUtils.setQuizz(quizz, client, res);
    })
    .put('/quizz', urlencodedParser, function (req, res) {
        var quizz = req.body.quizz;
        var key = quizz.username + "_" + "Quizz" + quizz.id;
        setQuizzUtils.saveQuizz(key, quizz.id, quizz, client, res);
    })

    .post('/quizzincrement', urlencodedParser, function (req, res) {
        var key = req.body.username + '_Quizz' + req.body.quizz;
        
        setQuizzUtils.incrementQuizz(key, req.body.success, client, res);
    })


    // traiter le cas de la requette http get et renvoyer le contenue du hset (en format json)

    .get('/quizz', function (req, res) {
        var key = req.query.username + '_Quizz' + req.query.quizz;
        getQuizzUtils.getQuizz(key, res, client);
    })

    .get('/quizzs', function (req, res) {
        getQuizzsUtils.getQuizzs(req.query.username, res, client, ioRedis);
    })

    .post('/supprimer', urlencodedParser, function (req, res) {
        // username_Quizz0
        client.del(req.body.username + "_Quizz" + req.body.id, function (err, response) {
            if (response == 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(518);
            }
         })
    })

    .use(function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.send('Vous êtes à l\'accueil');
    });

app.listen(8080);