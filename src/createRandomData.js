const {writeFile} = require('fs');
const {join} = require('path');
const faker = require('faker');
const uuid = require('uuid4');
const {writeFilePromise} = require('./helpers');
const createUsersArray = (howMany) =>
	[...new Array(howMany).keys()].map((el) => {
		return {
			id: uuid(),
			name: faker.name.findName(),
			email: faker.internet.email(),
		};
	});

writeFilePromise(createUsersArray(5), 'user.json')
	.then(() => console.log('Done'))
	.catch((err) => console.log(err));
