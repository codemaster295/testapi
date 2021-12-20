const bcrypt = require("bcrypt");
const express = require('express')
const router = express.Router();
const Signupdetails = require("../models/Signupdetails");
module.exports = router;
const encoder = bodyParser.urlencoded();
const jwt = require("jsonwebtoken");


//......SignUP.......//

router.post("/", async (req, res) => {
	const isUserRegisters = await Signupdetails.findOne({ email: req.body.email })
	const { username, email, password, birhdate, gender, contact } = req.body
	if (isUserRegisters) {
		res.status(200).send({
			success: false,
			message: "Email already exist please login with existing email"
		})
	}
	else if (!req.body.email) {
		res.status(200).send({
			success: false,
			message: "Please provide email"
		})
	}
	else if (!isUserRegisters) {

		const signup = new Signupdetails({
			username,
			email,
			password: bcrypt.hashSync(password, 10),
			birhdate,
			gender,
			contact,
		});
		const token = jwt.sign({ email: signup.email, password: signup.password }, process.env.JWT_KEY)
		signup.save().then(() => {
			res.status(201).send({
				success: true,
				message: "Account created successfully",
				token: token
			})
		});

	}
});