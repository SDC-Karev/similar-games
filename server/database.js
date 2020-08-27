const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config);

const getGamesBySeries = (function(data, callback) {
  const sql = `SELECT g.id, g.name, g.price, g.sale_percent, g.seriesID, g.releasedt, g.reviews, g.average_review,
  GROUP_CONCAT(DISTINCT t.tagName) as tags,
  GROUP_CONCAT(DISTINCT m.imageFile) as media
  FROM (games AS g, gameTags AS gt, tags AS t, series AS s, media AS m)
  WHERE s.id = ? AND g.id = gt.gameID AND gt.tagID = t.id AND m.gameID = g.id GROUP BY g.id, g.name
  LIMIT 10;`
  connection.query(sql, data, function(err, result, fields)
  {
    if (err)
    {
      console.log(err);
      callback(err, null);
    }
    else
    {
      callback(null, result);
    }
  })
});

const getGameByID = (function(data, callback) {
  const sql = `SELECT g.id, g.name, s.seriesName, g.price, g.sale_percent, g.seriesID, g.releasedt, g.reviews, g.average_review,
  GROUP_CONCAT(DISTINCT t.tagName) as tags,
  GROUP_CONCAT(DISTINCT m.imageFile) as media
  FROM (games AS g, gameTags AS gt, tags AS t, series AS s, media AS m)
  WHERE g.id = ? AND g.id = gt.gameID AND gt.tagID = t.id AND m.gameID = g.id AND g.seriesID = s.id GROUP BY g.id, g.name
  LIMIT 10;`
  connection.query(sql, data, function(err, result, fields)
  {
    if (err)
    {
      console.log(err);
      callback(err, null);
    }
    else
    {
      callback(null, result);
    }
  })
});

const getGamesByTags = (function(gameID, tagArray, callback) {
  var sql = "SELECT g.id, g.name, g.price, g.sale_percent, g.seriesID, g.releasedt, g.reviews, g.average_review, GROUP_CONCAT(DISTINCT t.tagName) as tags, GROUP_CONCAT(DISTINCT m.imageFile) as media, r.rank FROM (games AS g, gameTags AS gt, tags AS t, series AS s, media AS m, (" +
  "SELECT t.gameID, SUM(count) as rank FROM ("
  var first = true;
  for(var i = 0; i < tagArray.length; i++)
  {
    if (!first)
    {
      sql += " UNION "
    }
    first = false;
      sql += " SELECT gameID, count(gameID) as count from gameTags WHERE gameID != " + gameID + " AND tagID = " + tagArray[i] + " group by gameID "
  }
  sql += " ) as t GROUP BY t.gameID) as r) WHERE g.id = gt.gameID AND gt.tagID = t.id AND m.gameID = g.id and r.gameID = g.id GROUP BY g.id ORDER BY r.rank desc LIMIT 10;"
    connection.query(sql, function(err, result, fields)
  {
    if (err)
    {
      callback(err, null);
    }
    else
    {
      callback(null, result);
    }
  })
});

const seedIntoDatabase = (function(data, callback) {
  let newGame = data;
  console.log(' Data from database.js: ' + JSON.stringify(data));
  connection.query(
    "CALL populateRow('" + newGame.name + "', " + newGame.price + ", " + newGame.sale + ", '" + newGame.release + "', " + newGame.reviews + ", " + newGame.rating + ", '" + newGame.series + "', '" + newGame.tags[0] + "', '" + newGame.tags[1] + "', '" + newGame.tags[2] + "', '" + newGame.tags[3] + "', '" + newGame.tags[4] + "', '" + newGame.imagea + "', '" + newGame.imageb + "', '" + newGame.imagec + "', '" + newGame.imaged + "');",

    function(err, result)
  {
    if (err)
    {
      console.log(err);
      callback(err, null);
    }
    else
    {
      callback(null, result);
    }
  })
});

const updateGame = (id, game, callback) => {
	let sql = `UPDATE games
	SET
	name = "${game.name}",
	price = "${game.price}",
	sale_percent = "${game.sale}",
	seriesID = "${game.seriesID}",
	releasedt = "${game.release}",
	reviews = "${game.reviews}",
	average_review = "${game.average_review}"
	WHERE id = "${id}"`;
	connection.query(sql, function(error, results) {
		if (error) {
			callback(error);
		} else {
			callback(null, results);
		}
	});
}

const deleteGame = (id, callback) => {
	let sql = `DELETE FROM games WHERE id = "${id}"`;
	connection.query(sql, function(error, results) {
		if (error) {
			callback(error);
		} else {
			callback(null, results);
		}
	})
}

module.exports = {
  getGamesBySeries,
  getGamesByTags,
  seedIntoDatabase,
  getGameByID,
  updateGame,
  deleteGame
}
