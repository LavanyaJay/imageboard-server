const { Router } = require("express");
const Image = require("./model");

const router = new Router();

router.get("/image", (request, response, next) => {
	Image.findAll()
		.then(image => {
			response.json(image);
		})
		.catch(next);
});

module.exports = router;
