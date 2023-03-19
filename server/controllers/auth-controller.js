const { authService } = require("../services/index-services");
const httpStatus = require("http-status");
const authController = {
  async registerUser(req, res, next) {
    try {
      const { email, password, firstname, lastname } = req.body;
      const user = await authService.createUser(
        email,
        password,
        firstname,
        lastname
      );
      const token = await authService.generateAuthToken(user);
      res
        .cookie("x-access-token", token)
        .status(httpStatus.CREATED)
        .json({ user, token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await authService.generateAuthToken(user);
      res
        .cookie("x-access-token", token)
        .status(httpStatus.OK)
        .json({ user, token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  async isAuth(req, res, next) {
    res.status(200).json(req.user);
  },

  async dog(req, res, next) {
    
  },
};

module.exports = authController;
