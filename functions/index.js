const functions = require("firebase-functions");

const authMiddleware = require("./util/authMiddleware");
const app = require("express")();

const { getAllOpinion, createSingleOpinion } = require("./handlers/opinion");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser
} = require("./handlers/users");

// Opinion Routes
app.get("/opinion", getAllOpinion);
app.post("/opinion", authMiddleware, createSingleOpinion);
app.post("/user/image", authMiddleware, uploadImage);
app.post("/user", authMiddleware, addUserDetails);
app.get("/user", authMiddleware, getAuthenticatedUser);

// Users Routes
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.https.onRequest(app);
