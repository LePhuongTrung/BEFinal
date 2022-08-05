const jwt = require("jsonwebtoken");
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.headers.access_token;

    if (!token) return res.status(400).send("Haven't logged in yet !!!");
    const { email, role, fullname } = await jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    req.email = email;
    req.role = role;
    req.fullname = fullname;

    return next();
  } catch (error) {
    console.log("🚀 ~ file: authMiddleware.js ~ line 20 ~ isLoggedIn ~ error", error)
    return res.sendStatus(500);
  }
};

// const isLoggedIn = async (req, res, next) => {

//     const token = req.cookies.access_token || req.headers.access_token;
//     console.log("🚀 ~ file: authMiddleware.js ~ line 32 ~ isLoggedIn ~ token", token);
//     if (!token) return res.status(400).send("Haven't logged in yet !!!");
//     const { email, role, fullname } = await jwt.verify(
//       token,
//       process.env.SECRET_KEY
//     );
//     next();
// };

module.exports = {
  isLoggedIn,
};
