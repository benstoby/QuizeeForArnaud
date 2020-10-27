

var getUser = function (username, res, client)
{
    
    client.hgetall(username, function (err, results) {
        if (err) {
            // do something like callback(err) or whatever
        } else {
            if(results)
            {
                // do something with results
                results.password = "";
                
                res.setHeader('Content-Type', 'text/plain');
                res.json(results);
                res.send();
            }
            else
            {
                res.sendStatus(404);
            }
            
        }
    });
}
exports.getUser = getUser;