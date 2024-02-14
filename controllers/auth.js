const db = require('../models/index');
const User = db.Users;
const Op = db.Sequelize.Op;
const token = require('../util/token');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signin = async (req, res) => {
	try {
		const { body } = req;
    const hash = await bcrypt.hash(body.password, saltRounds);
		User.findAll({ where: { email: body.email } })
			.then((result) => {
				console.log(result[0].dataValues);
				if (result) {
					if (result.length == 0) {
						res.send('no user');
					} else {
						bcrypt
							.compare(body.password, result[0].dataValues.password)
							.then((comResult) => {
                console.log(comResult);
								if (comResult) {
									let data = {
										user: result[0].dataValues.name,
										password: body.password,
										status: true,
									};
                  console.log(data);
									res.send(data);
								} else {
									res.send('incorrect password');
								}
							})
							.catch((err) => res.send(err));
					}
				} else {
					res.status(404).send({
						message: `Cannot find Tutorial`,
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: 'Error retrieving Tutorial with',
				});
			});
	} catch (e) {}
};

exports.signup = async (req, res) => {
	const { body } = req;
	try {
		let query = 'select * from users where user_email=?';
		console.log(body);
		body.created_at = new Date();
		const hash = await bcrypt.hash(body.password, saltRounds);
		console.log(hash);
		const user = {
			email: body.email,
			password: hash,
			name: body.username,
		};
		User.create(user)
			.then((data) => {
				let response = {
					data: data,
					status: true,
				};
				res.send(response);
			})
			.catch((err) => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while creating the Tutorial.',
				});
			});

		// db.query(query, body.user_email, (err, result) => {
		//   if ( err ) {
		//     res.status(400).send(err);
		//   } else {
		//     if(result.length > 0) {
		//       return res.send("Deplication user")
		//     }
		//     else if ( body.password != body.checkpassword ) {
		//       return res.send("incorrect password");
		//     }
		//   }
		//   body.password = hash;
		//   delete body.checkpassword;
		//   query = 'insert into users set ?';
		//   db.query(query, body, (err, result) => {
		//     res.send("3");
		//   })
		// })
		token.generateToken(body);
	} catch (err) {}
};
