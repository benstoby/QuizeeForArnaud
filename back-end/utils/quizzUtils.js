var questionUtils = require('./questionUtils');

var clientG;
var quizzG;
var resG;

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
    clientG.hmset(testKey,'id',max ,'nbsuccess', 0, 'nbtry', 0, 'title', quizzG.title, 'info', quizzG.info, 'seuil', quizzG.seuil, 'creation', quizzG.creation, 'lastmodif', quizzG.lastmodif, 'subject', quizzG.subject, 'lastsend', quizzG.lastsend, 'nextsend', quizzG.nextsend);
    
    for(var i = 0; i < quizzG.questions.length; i++)
    {
        questionUtils.setQuestion(testKey, i, quizzG.questions[i], clientG, resG);
    }
    
    resG.status(200); 
    resG.send(max.toString());
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
exports.incrementQuizz = incrementQuizz;