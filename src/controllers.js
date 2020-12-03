const {readFile} = require('fs');
const {join} = require('path');
const uuid = require('uuid4');
const {writeFilePromise, readFilePromise} = require('./helpers');
const getDataFileName = () => 'user.json';

const getUsers = () => readFilePromise(getDataFileName());

const getUserById = (id) => {
	return new Promise((res, rej) => {
		readFilePromise(getDataFileName())
			.then((users) => {
				const user = users.find((user) => user.id === id);
				res(user);
			})
			.catch((err) => rej(err));
	});
};
const createUser = (user) => {
	return new Promise((resolve, reject) => {
		getUsers().then((users) => {
			const newUser = {id: uuid(), ...user};
			const newUsers = [...users, newUser];
			writeFilePromise(newUsers, getDataFileName()).then(resolve).catch(reject);
		});
	});
};

module.exports = {getUsers, getUserById, createUser};
