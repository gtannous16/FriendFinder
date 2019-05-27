var FriendsList = require('../data/friends');

module.exports = function (app) {
    app.get('/api/friends', function(req,res){
        res.json(FriendsList);
    });
    
    app.post('/api/friends', function(req,res){
        var newUserScores = req.body.scores;
        var arrayOfScores = [];
        var bestMatch = 0;
    

        for (var i = 0; i < FriendsList.length; i++){
            var diffScores = 0;
            for(var u = 0; u < newUserScores.length; u++){
            diffScores += (Math.abs(parseInt(FriendsList[i].scores[u]) - parseInt(newUserScores[u])))
            }   
            arrayOfScores.push(diffScores);
        }

        for (var i = 0; i < arrayOfScores.length; i++){
            if (arrayOfScores[i] <= arrayOfScores[bestMatch]){
                bestMatch = i;
            }
        }

        var BFF = FriendsList[bestMatch];
        res.json(BFF);

        FriendsList.push(req.body);
    });
};