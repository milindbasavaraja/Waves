const express = require("express");
const app = express();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");
require("dotenv").config();
const { handleError, convertToApiError } = require("./middleware/apiError");
const passport = require("passport");
const { jwtStrategy } = require("./middleware/passport");

const PORT = process.env.PORT || 3002;

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}
?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//previously used body parser
app.use(express.json());

//sanitize
app.use(xss());
app.use(mongoSanitize());

//passport
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

//routes
app.use("/api", routes);

//Handle errors
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
