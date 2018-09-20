module.exports = {
	handle: jest.fn(() => true),
	sendTextMessage: jest.fn(() => true),
	sendTemplateMessage: jest.fn(() => true),
	sendItemMessage: jest.fn(() => true),
	sendUrlInfoMessage: jest.fn(() => true),
	sendDonateInfoMessage: jest.fn(() => true)
};