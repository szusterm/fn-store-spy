const clientConfig = require('../../config/client');

export const getConfig = (req, res) => res.json(clientConfig);