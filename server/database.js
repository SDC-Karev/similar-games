const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
	contactPoints: ['127.0.0.1'],
	localDataCenter: 'datacenter1',
	keyspace: 'similargames'
});

client.connect(function (err) {
	if (err) {
		console.log('error connecting', err);
	}
});


const query = `CREATE TABLE IF NOT EXISTS similargames.games (
	name text PRIMARY KEY
	
