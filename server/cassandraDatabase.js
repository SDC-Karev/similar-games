const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'similargames'
});

const getGameById = (id, callback) => {
    const query = `SELECT name, series, price, sale, release, reviews, rating, imagea, imageb, imagec, imaged, tags FROM games_by_id WHERE id = ${id}`;
    client.execute(query)
     .then((results) => {
         callback(null, results);
     })
     .catch((error) => {
         callback(error);
     })
};

const getGameByTag = (tag, id, callback) => {
    let num;
    id < 9999900 ? num = id + 1 : num = 1
    const query = `SELECT name, series, price,sale, release, reviews, rating, imagea, imageb, imagec, imaged, tags FROM games_by_tags WHERE tags = '${tag}' AND id > ${num} LIMIT 10`;
    client.execute(query)
     .then((results) => {
         callback(null, results);
     })
     .catch((error) => {
         callback(error);
     })
};

const getGameBySeries = (series, id, callback) => {
    let num;
    id < 9998000 ? num = id + 1 : num = 1
    const query = `SELECT name, series, price, sale, release, reviews, rating, imagea, imageb, imagec, imaged, tags FROM games_by_series WHERE series = '${series}' AND id > ${num} LIMIT 10`;
    client.execute(query)
     .then((results) => {
         callback(null, results);
     })
     .catch((error) => {
         callback(error);
     })
}

module.exports.getGameById = getGameById;
module.exports.getGameByTag = getGameByTag;
module.exports.getGameBySeries = getGameBySeries;