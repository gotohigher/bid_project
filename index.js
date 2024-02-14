const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const db = require('./models');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes);
db.sequelize
	.sync()
	.then(() => {
		console.log('Synced db.');
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message);
	});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server runnning on port: ${port}`);
});
