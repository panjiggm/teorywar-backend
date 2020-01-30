const functions = require("firebase-functions");

const authMiddleware = require("./util/authMiddleware");
const app = require("express")();

const { getAllOpinion, createSingleOpinion } = require("./handlers/opinion");
const { signup, login, uploadImage } = require("./handlers/users");

// Opinion Routes
app.get("/opinion", getAllOpinion);
app.post("/opinion", authMiddleware, createSingleOpinion);

// Users Routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", authMiddleware, uploadImage);

exports.api = functions.https.onRequest(app);
