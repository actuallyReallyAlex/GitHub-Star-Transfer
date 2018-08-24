const request = require('request');
const Configstore = require('configstore');

// Create instance of config file
const conf = new Configstore('github-star-transfer');


function getStarredRepos() {
	const url = 'https://api.github.com/user/starred';
    const token = conf.get('token');
    const etag = conf.get('etag');
    var headers = {
        'User-Agent': 'GitHub Star Transfer'
    };

    // If the etag exists from a previous request, add it as a header.
    if (etag) {
        headers['If-None-Match'] = etag;
    }

    request.get(url, {
		auth: {
			bearer: token
		},
		headers: headers
	}, (error, response, body) => {
		if (error) {
			console.log('Error: ', error);
		} else {
			const parsed = JSON.parse(body);

			parsed.forEach(repoObject => {
				const owner = repoObject.owner.login;
				const name = repoObject.name;
				const index = parsed.indexOf(repoObject);

				console.log('----------');
				console.log(`#${index}`);
				console.log(`Owner: ${owner}`);
				console.log(`Name: ${name}`);
			});
		}
	});
}

module.exports = {
    getStarredRepos
}