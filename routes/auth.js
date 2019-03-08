const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, config.JWT_SECRET, function(err) {
      if (err) {
        return res
          .status(400)
          .send(
            "There is a problem with your access token, please sign in again!"
          );
      } else {
        next();
      }
    });
  } else {
    return res.status(401).send("Please Sign in to continue.");
  }
};
