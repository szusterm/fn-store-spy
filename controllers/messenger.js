class Messenger {
	send() {
		console.log('Sending message');
	}
}

module.exports = () => new Messenger();