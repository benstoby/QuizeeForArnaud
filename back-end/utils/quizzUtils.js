var questionUtils = require('./questionUtils');

var clientG;
var quizzG;
var resG;

function saveQuizz(key, id, quizz, client, res){
    client.hmset(key,'id',id ,'nbsuccess', 0, 'nbtry', 0, 'title', quizz.title, 'info', quizz.info, 'seuil', quizz.seuil, 'creation', quizz.creation, 'lastmodif', quizz.lastmodif, 'subject', quizz.subject, 'lastsend', quizz.lastsend, 'nextsend', quizz.nextsend);
    
    for(var i = 0; i < quizz.questions.length; i++)
    {
        questionUtils.setQuestion(key, i, quizz.questions[i], client, res);
    }

    res.status(200); 
    res.send(id.toString());
}

function callbackKey(err, keys) {
    if (err)
    {
        
        return console.log(err);
    } 
    var testKey;

    var max = -1;
    var tmp;
    for(var i = 0; i < keys.length; i++)
    {
        tmp = keys[i].split('Quizz')[1];
        if(parseInt(tmp) > parseInt(max)) {
            max = tmp;
        }
    }
    max++;
    testKey = quizzG.username + "_" + "Quizz" + max;
    saveQuizz(testKey, max, quizzG, clientG, resG);
}

var setQuizz = function (quizz, client, res) {
    clientG = client;
    quizzG = quizz;
    resG = res;

    client.keys(quizz.username + '_*', callbackKey);
}
var incrementQuizz = function (key, success, client, res) {
    client.hincrby(key, 'nbtry', 1, function(err, ret){		
		if(err) 
			console.log('db err');
		else {
            if(success) {
                client.hincrby(key, 'nbsuccess', 1, function(err, ret){});
            }
		}
    });
}

exports.setQuizz = setQuizz;
exports.saveQuizz = saveQuizz;
exports.incrementQuizz = incrementQuizz;