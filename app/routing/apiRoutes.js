
var friendsList = require('../data/friends.js');


module.exports = function (app) {
    //a GET, shows all friends
    app.get('/api/friends', function (req, res) {
        res.json(friendsList);
    }); 

    app.post('/api/friends', function (req, res) {
        //grabs the new friend's scores to compare with friends in friendsList array
        var newUserScores = req.body.scores;
        var scoresArray = [];
        var bestMatch = 0;

        for (var i = 0; i < friendsList.length; i++) {
            var scoresDiff = 0;
            //run through scores to compare friends
            for (var j = 0; j < newUserScores.length; j++) {
                scoresDiff += (Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newUserScores[j])));
            }

            scoresArray.push(scoresDiff);
        }

        //after all friends are compared, find best match
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        //return data
        var bff = friendsList[bestMatch];
        res.json(bff);

        //pushes new submission into the friendsList array
        friendsList.push(req.body);
    });
};