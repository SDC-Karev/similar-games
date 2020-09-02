const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ben',
    host: 'localhost',
    database: 'similarGames',
    password: '',
    port: 5432,
})

const getGameById = (id, callback) => {
    pool.query(`SELECT name, series, price, sale, release, reviews, rating, imagea, imageb, imagec, imaged, tags FROM games WHERE id = ${id}`, (err, res) => {
	    if (err) {
	        callback(err)
	    } else {
	        callback(null, res)
	    }
    })
}

const getGameByTag = (tag, id, callback) => {
    let num;
    id < 9999900 ? num = id + 1 : num = 1
    pool.query(`SELECT name, series, price,sale, release, reviews, rating, imagea, imageb, imagec, imaged, tags FROM games WHERE tags = '${tag}' AND id > ${num} LIMIT 10`, (err, res) => {
	    if (err) {
	        callback(err);
	    } else {
	        callback(null, res);
	    }
    });
}
const getGameBySeries = (series, id, callback) => {
    let num;
    id < 9998000 ? num = id + 1 : num = 1 
    pool.query(`SELECT name, series, price, sale, release, reviews, rating, imagea, imageb, imagec, imaged, tags FROM games WHERE series = '${series}' AND id > ${num} LIMIT 10`, (err, res) => {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
}

module.exports.getGameById = getGameById;
module.exports.getGameByTag = getGameByTag;
module.exports.getGameBySeries = getGameBySeries;