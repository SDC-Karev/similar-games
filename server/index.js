require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pdb = require('./postgresDatabase.js');
const cdb = require('./cassandraDatabase.js');
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
app.use('/:gameID', express.static(path.join(__dirname, '../public')));

app.get('/api/getGameByID/:gameID', cors(corsOptions), function(req, res) {
  var gameID = req.params.gameID;
  cdb.getGameById(gameID, function(error, result) {
    if (error) {
      console.log('Get request failed', error)
      res.sendStatus(500).end();
    } else {
      res.json(result.rows);
    }
  });
});

app.get('/api/getGamesByTags/:gameID/:tag', cors(corsOptions), function(req, res) {
  var tag = req.params.tag;
  var gameID = req.params.gameID;
  cdb.getGameByTag(tag, gameID, (tagErrors, tagResult) => {
    if (tagErrors) {
      console.log('Get request failed tags', tagErrors);
      res.sendStatus(500);
    } else {
      for (let obj of tagResult.rows) {
        obj.media = `https://sdcimages.s3-us-west-1.amazonaws.com/samplePics/image${obj.imagea}.jpg`;
      }
      res.json(tagResult.rows);
    }
  })
});
    
app.get('/api/getGamesBySeries/:gameID/:series', cors(corsOptions), function(req, res) {
  var series = req.params.series;
  var gameID = req.params.gameID;
  cdb.getGameBySeries(series, gameID, (seriesErrors, seriesResults) => {
    if (seriesErrors) {
      console.log('get req failed series', seriesErrors);
      res.sendStatus(500);
    } else {
      for (let obj of seriesResults.rows) {
        obj.media = `https://sdcimages.s3-us-west-1.amazonaws.com/samplePics/image${obj.imagea}.jpg`;
      }
      res.json(seriesResults.rows);
    }
  })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
