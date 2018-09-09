module.exports = () => {
	const {DB_URL, DB_USER, DB_PASSWORD} = process.env;

	return `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}`;
};