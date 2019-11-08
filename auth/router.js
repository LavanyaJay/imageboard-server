const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../User/model");
const router = new Router();
const bcrypt = require("bcrypt");
const auth = require("../auth/middleware");

// define endpoints here
router.post("/login", (req, res, next) => {
	const { email, password } = req.body;

	if (!email && !password) {
		console.log("email", email, password);
		return res
			.status(400)
			.send({ message: "Please supply a valid email and password" });
	}
	User.findOne({
		where: {
			email: email
		}
	})
		.then(user => {
			console.log(user);
			const result = bcrypt.compareSync(password, user.password);

			if (result) {
				res.send({
					jwt: toJWT({ userId: user.id })
				});
			} else {
				return res
					.status(400)
					.send({ success: false, message: "passwords do not match" });
			}
		})
		.catch(err => {
			res.status(500).send({ message: "Something went wrong" });
		});
});

router.get("/secret-endpoint", auth, (req, res) => {
	res.send({
		message: `Thanks for visiting the secret endpoint ${req.user.email}.`
	});
});

module.exports = router;
