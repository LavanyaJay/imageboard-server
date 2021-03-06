const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
const corsMiddleware = cors();
app.use(corsMiddleware);

const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

const Image = require("./Image/model");
const imageRouter = require("./Image/router");
app.use(imageRouter);

const authRouter = require("./auth/router");
app.use(authRouter);

const userRouter = require("./User/router");
app.use(userRouter);

app.listen(process.env.PORT || 5000, () => {
	console.log("Listening on port", +port);
});
