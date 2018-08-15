/**
 * 
 * @param {Number} ms Number of milliseconds to wait.
 * @param {Function} func (Optional). Function to call once number of milliseconds to wait has passed.
 */
function timeout(ms, func = '') {
	if (func) {
		return new Promise(resolve => setTimeout(resolve, ms))
			.then(func)
			.catch(error => console.log('Error on timeout.\n', error.message));
	} else {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = {
	timeout
};
