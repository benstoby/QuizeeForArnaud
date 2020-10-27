var quizztojson = require('./quizztojson');


var getQuizz = function (key, res, client)
{
    
    client.hgetall(key, function (err, results) {
        if (err) {
            // do something like callback(err) or whatever
        } else {
            if(results)
            {
                // do something with results
                ret = quizztojson.quizztojson(results);
                

                res.setHeader('Content-Type', 'text/plain');
                res.json(ret);
                res.send();
            }
            else
            {
                res.sendStatus(404);
            }
            
        }
    });
}
exports.getQuizz = getQuizz;