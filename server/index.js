const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const db = require('./database.js');
const path = require('path');
const port = 3003;
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client')); //could be problematic as well



app.get('/api/getGameByID/:gameID', cors(corsOptions), function(req, res) {
  var gameID = req.params.gameID;
  db.getGameByID(gameID, function(error, result)
  {
    if (error)
    {
      console.log('Get request failed')
      res.sendStatus(500).end();
    } else {
      res.json(result).end();
    }

  });
});


app.get('/api/getGamesBySeries/:seriesID', cors(corsOptions), function(req, res) {
  var seriesID = req.params.seriesID;
  db.getGamesBySeries(seriesID, function(error, result)
  {
    if (error)
    {
      console.log('Get request failed, get games by series')
      res.sendStatus(500).end();
    } else {
      res.json(result).end();
    }

  });
});

app.get('/', function(req, res) {
  res.sendFile(path.join(_dirname, "public", index.html));
});

app.get('/api/getGamesByTags/:gameID/:tagString', cors(corsOptions), function(req, res) {
  var gameID = req.params.gameID;
  var tagString = req.params.tagString;
  var tagArray = tagString.split('&');
  db.getGamesByTags(gameID, tagArray, function(error, result)
  {
    if (error)
    {
      console.log('Get request failed, get games by tags', error)
      res.sendStatus(500).end();
    } else {
      res.json(result).end();
    }

  });
});

app.post('/api/relatedGames', cors(corsOptions), function(req, res) {
	var r = req.body;
	var newGame = {
		name: r.gameName,
		price: r.gamePrice,
		sale: r.gameSale,
		release: r.date,
		reviews: r.reviewNum,
		rating: r.avgReview,
		series: r.gameSeries,
		imagea: r.image1,
		imageb: r.image2,
		imagec: r.image3,
		imaged: r.image4,
		tags: r.gameTags
	}
	db.seedIntoDatabase(newGame, function(error, result) {
		if (error) {
			res.sendStatus(500);
		} else {
			res.sendStatus(201)
		}
	})
});

app.put('/api/relatedGames', cors(corsOptions), function (req, res) {
	let id = req.body.id;
	let newGame = req.body.game;
	db.updateGame(id, newGame, function (error, results) {
		if (error) {
			console.log('error in put', error);
			res.sendStatus(500);
		} else {
			res.sendStatus(201);
		}
	});
});

app.delete('/api/relatedGames', cors(corsOptions), function(req, res) {
	let id = req.body.id;
	db.deleteGame(id, function (error, results) {
		if (error) {
			console.log('error in delete request', error);
			res.sendStatus(500);
		} else {
			res.sendStatus(200);
		}
	});
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
