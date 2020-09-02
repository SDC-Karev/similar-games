
const faker = require('faker');
const fs = require('fs');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const csvStringifier = createCsvStringifier({
    header: [
            {id: 'name', title: 'NAME'},
            {id: 'price', title: 'PRICE'},
            {id: 'sale', title: 'SALE'},
	    {id: 'release', title:'release'},
	    {id: 'reviews', title: 'reviews'},
	    {id: 'series', title: 'SERIES'},
	    {id: 'imagea', title: 'IMAGEA'},
	    {id: 'imageb', title: 'IMAGEB'},
	    {id: 'imagec', title: 'IMAGEC'},
	    {id: 'imaged', title: 'IMAGED'},
	    {id: 'tags', title: 'TAGS'}
	
    ]
});

let j = 0;

const writeGames = fs.createWriteStream('games.csv');
writeGames.write(csvStringifier.getHeaderString(), 'utf8');
let i = 0;
function write(callback) {
	let notFull = true;
	while(i < 10000000 && notFull) {
		i++;
		if (i % 500000 === 0) { console.log(i) }
		let name = faker.random.words();
		let price = (Math.random() * 100).toFixed(2);
		let sale = (Math.random().toFixed(2, 2) - .01);
		let dateFaker = faker.date.past();
		let month = dateFaker.getMonth().toString();
		let day = dateFaker.getDate().toString();
		let release = dateFaker.getFullYear() + '-' + ((month.padStart(2, '0') === '00') ? '01' : month.padStart(2, '0')) + '-' + day.padStart(2, '0');
		let reviews = Math.floor(Math.random() * 500);
		let rating = (Math.random()*4).toFixed(1, 2);
		let imagea = Math.ceil(Math.random() * 776)}
		let imageb = Math.ceil(Math.random() * 776)}
		let imagec = Math.ceil(Math.random() * 776)}
		let imaged = Math.ceil(Math.random() * 776)}
		let tags = [];
		let tagNum = Math.floor(Math.random() * (5 - 1) + 1);
		for ( var j = 0; j < 5; j++) {
			tags.push(faker.hacker.adjective());
		}
		let newGame = `${name},${price},${sale},${release},${reviews},${rating},${imagea},${imageb},${imagec},${imaged},${tags}\n`
		
		if (i === 10000000) {
			writeGames.write(newGame, 'utf8', callback);
		} else {
			notFull = writeGames.write(newGame, 'utf8');
			
		}
	}
	if (i < 10000000) {
		writeGames.once('drain', write);
	}
}

write(() => {
	console.log('CSV GENERATED!');
	writeGames.end();
});

