fetch('/api/v1/users')
	.then((results) => results.json())
	.then((users) => console.log(users));

fetch('/api/v1/users/9ec90479-029b-4731-ad26-7b8ff6aa6dce')
	.then((results) => results.json())
	.then((user) => {
		if (user.status === 400) {
			console.log(user.msg);
		} else if (user.status === 404) {
			console.log(user.msg);
		} else {
			console.log(user);
		}
	})
	.catch((err) => console.log(err));

fetch('/api/v1/users', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({name: 'alaa', email: 'alaa@gmail.com'}),
})
	.then((results) => results.json())
	.then((res) => {
		if (res.status === 400) {
			console.log(res.msg);
		} else if (res.status === 404) {
			console.log(res.msg);
		} else {
			console.log(res.message);
		}
	});
