
const faker = require('faker');
const fs = require('fs');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const csvStringifier = createCsvStringifier({
    header: [
		{id: 'id', title: 'id'},
		{id: 'name', title: 'name'},
		{id: 'series', title: 'series'},
        {id: 'price', title: 'price'},
        {id: 'sale', title: 'sale'},
	    {id: 'release', title:'release'},
	    {id: 'reviews', title: 'reviews'},
	    {id: 'rating', title: 'rating'},
	    {id: 'imagea', title: 'imagea'},
	    {id: 'imageb', title: 'imageb'},
	    {id: 'imagec', title: 'imagec'},
	    {id: 'imaged', title: 'imaged'},
	    {id: 'tags', title: 'tags'}
	
    ]
});

let j = 0;

const writeGames = fs.createWriteStream('games.csv');
writeGames.write(csvStringifier.getHeaderString(), 'utf8');
let i = 0;
let seriesPossibilities = [];
let seriesNum = 10000;
for (var k = 0; k < seriesNum; k++) {
  seriesPossibilities.push(faker.lorem.words());
};

function write(callback) {
    let notFull = true;
	while(i < 50000000 && notFull) {
		i++;
		if (i % 500000 === 0) { console.log(i) }
		let id = i;
		let name = faker.lorem.words();
  		let gameSeries = seriesPossibilities[Math.floor(Math.random() * 10000)];
		let price = (Math.random() * 100).toFixed(2);
		let sale = (Math.random().toFixed(2, 2) - .01);
		let dateFaker = faker.date.past();
		let month = dateFaker.getMonth().toString();
		let day = dateFaker.getDate().toString();
		let release = dateFaker.getFullYear() + '-' + ((month.padStart(2, '0') === '00') ? '01' : month.padStart(2, '0')) + '-' + day.padStart(2, '0');
		let reviews = Math.floor(Math.random() * 500);
		let rating = (Math.random()*4).toFixed(1, 2);
		let imagea = Math.ceil(Math.random() * 776)
		let imageb = Math.ceil(Math.random() * 776)
		let imagec = Math.ceil(Math.random() * 776)
		let imaged = Math.ceil(Math.random() * 776)
		let tagArr = ['fun', 'shooter', 'action', 'rpg', 'fighting', 'party', 'family'];
		let tags = tagArr[Math.floor(Math.random() * 7)];
		let newGame = `${id},${name},${gameSeries},${price},${sale},${release},${reviews},${rating},${imagea},${imageb},${imagec},${imaged},${tags}\n`
		
		if (i === 50000000) {
			writeGames.write(newGame, 'utf8', callback);
		} else {
			notFull = writeGames.write(newGame, 'utf8');
			
		}
	}
	if (i < 50000000) {
		writeGames.once('drain', write);
	}
}

write(() => {
	console.log('CSV GENERATED!');
	writeGames.end();
});

