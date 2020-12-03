const {readFile, writeFile} = require('fs');
const {join} = require('path');

module.exports.writeFilePromise = (data, filename) => {
	return new Promise((res, rej) => {
		writeFile(
			join(__dirname, filename),
			JSON.stringify(data, null, 4),
			(err) => {
				if (err) return rej('something went wrong');
				res('Done');
			}
		);
	});
};

module.exports.readFilePromise = (filename) => {
	return new Promise((res, rej) => {
		readFile(join(__dirname, filename), 'utf-8', (err, data) => {
			if (err) return rej(err);
			res(JSON.parse(data));
		});
	});
};

module.exports.reponseError = (status, msg) => ({...new Error(), status, msg});
module.exports.reponseSuccess = (data, message = 'success', status = 200) => ({
	status,
	data,
	message,
});
