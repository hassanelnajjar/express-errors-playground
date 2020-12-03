const router = require('express').Router();
const {getUsers, getUserById, createUser} = require('./controllers');
const {reponseError, reponseSuccess} = require('./helpers');

// GET /users
// GET /user/:id
// PORT /users

router.get('/users', (req, res, next) => {
	getUsers()
		.then((data) => res.json(reponseSuccess(data)))
		.catch(next);
});

router.get('/users/:id', (req, res, next) => {
	const {id} = req.params;
	getUserById(id)
		.then((user) => {
			if (!user) {
				throw reponseError(404, 'user not found - please check id');
			}
			res.json(reponseSuccess(user));
		})
		.catch(next);
});

router.post('/users', (req, res, next) => {
	const {name, email} = req.body;

	if (!name) {
		throw reponseError(400, 'you must enter name');
	}
	if (!email) {
		throw reponseError(400, 'you must enter email');
	}

	createUser({name, email})
		.then(() => res.json(reponseSuccess(null, 'user created ..', 201)))
		.catch(next);
});

router.use((err, req, res, next) => {
	console.log(err);
	const status = err.status || 500;
	const message = err.msg || 'Internal Server Error.';
	res.status(status).json({
		status,
		message,
	});
});

module.exports = router;
