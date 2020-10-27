var quizztojson = require('./quizztojson');

var ioRedisG;
var resG;

function callbackKey(err, keys)
{
    if (err)
    {
        return console.log(err);
    }
    MHGETALL_P(keys, function(err, quizzs) {  
        
        var ret = quizzs.map(function(quizz) {
            return quizztojson.quizztojson(quizz[1]);
        });
        resG.setHeader('Content-Type', 'text/plain');
        resG.json(ret);
        resG.send();
    });

}

function MHGETALL_P(keys, cb) {

    var pipeline = ioRedisG.pipeline();

    keys.forEach(function(key, index){
        pipeline.hgetall(key);
    });

    pipeline.exec(function(err, result){
        cb(err, result);
    });
}
var getQuizzs = function (username, res, client, ioRedis)
{
    resG = res;
    ioRedisG = ioRedis
    client.keys(username + '_*', callbackKey);
}
exports.getQuizzs = getQuizzs;