const jwt = require("jsonwebtoken");

const createToken = async (variable) => {
  try {
    const token =  jwt.sign(variable, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.log("🚀 ~ file: jwt.js ~ line 7 ~ createToken ~ error", error);
    return error;
  }
};

module.exports = {
  createToken,
};
