const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const db = require("./db");

const Image = require("./Image/model");

app.listen(port, () => {
	console.log("Listening on port", +port);
});
