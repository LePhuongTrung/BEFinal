const { hashPassword, checkPassword } = require("../../../utils/bcrypt");
const { createToken } = require("../../../utils/jwt");
const userService = require("../services/userServices");
// const { Pending, Active} = require("../../../constansts/status");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    let data = req.body;
    console.log("🚀 ~ file: userController.js ~ line 11 ~ register ~ data", data)
    const foundUser = await userService.findOne({email: data.email});
    if (foundUser) return res.status(400).send("user already exist");
    if (!data.email || !data.password || !data.lastName || !data.firstName) return res.status(412).send("Please fill in all required information")

    const hashedPassword = await hashPassword(data.password);
    const token = await createToken(data);

    const newUser = await userService.create({ ...data, password: hashedPassword, tokenVerification: token });

    if (!newUser) return res.status(500).send("Internal server error");

    userService.transport.sendMail({
      from: process.env.user,
      to: data.email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${data.lastName}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3003/users/confirm/${token}> Click here</a>
        </div>`,
    })

    return res.status(200).send("User was registered successfully! Please check your email");
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 19 ~ router.post ~ error", error);
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const foundUser = await userService.findOne({tokenVerification: req.params.token});
    console.log("🚀 ~ file: userController.js ~ line 44 ~ verify ~ foundUser", foundUser)
    if (!foundUser) return res.status(406).send( "User Not found." );
    const authentication = await userService.update(foundUser.id , { status: "Active"} );
  } catch(error){
  console.log("🚀 ~ file: userController.js ~ line 46 ~ verify ~ error", error)
  }
};


const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("empty email or password");

    const foundUser = await userService.findOne({email: req.body.email});

    if (!foundUser) return res.status(403).send("Can't find any user");
    if (foundUser.status !== "Active") return res.status(401).send("Pending Account. Please Verify Your Email!");

    const isValidPassword = await checkPassword(password, foundUser.password);

    if (!isValidPassword) return res.status(401).send("Password is not valid");

    const { email: userEmail, role, fullname } = foundUser;

    const payload = { email: userEmail, role, fullname };

    const token = await createToken(payload);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      // maxAge: 300000,
    });

    return res.status(200).send("Login successfully !!!");
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 47 ~ router.post ~ error", error);
    next(error);
  }
};

const deletedAccount = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send("empty email or password");

    const foundUser = await userService.findOne(email);

    if (!foundUser) return res.status(403).send("Can't find any user");
  }
  catch(error){

  }
}

const changeInformation = async (req, res) => {
  try{
    const token = req.cookies.access_token || req.headers.access_token;    
    const { email} =  jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    req.email = email;
    const thisUserId = (await userService.findOne(email)).id;
    let data = req.body;
    if (!data.password){
      const newInformation = await userService.update(thisUserId, data);
      if (!newInformation) return res.status(403).send("Can't change information");
      return res.status(200).send(newInformation);
    }
    const plainPassword = data.password;
    const hashedPassword = await hashPassword(plainPassword);
    const newPassword = await userService.update(thisUserId , { password: hashedPassword} );
    if (!newPassword) return res.status(403).send("Can't change Password");
    return res.status(200).send(newPassword);
  }catch(error){
  console.log("🚀 ~ file: authController.js ~ line 96 ~ changeInformation ~ error", error)
  }
}

module.exports = {
  register,
  login,
  deletedAccount,
  changeInformation,
  verify
};
