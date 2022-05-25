const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  //it takes the id--userid
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", //expires in 30 days
  }); //generate in the form of encrypted token
};
module.exports = generateToken;
