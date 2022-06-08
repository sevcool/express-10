const authRouter = require("express").Router();
const User = require("../models/user");

authRouter.post("/checkCredentials", (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email).then((user) => {
    if (!user) res.status(401).send("invalid credentials");
    else {
      User.verifyPassword(password, user.hashedPassword).then(
        (passwordCorrect) =>
          passwordCorrect
            ? res.status(200).send("Authentification OK")
            : res.status(401).send("Invalid credentials")
      );
    }
  });
});

module.exports = authRouter;
