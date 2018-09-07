const clientConfig = require('../../config/client');

exports.getConfig = (req, res) => res.json(clientConfig);