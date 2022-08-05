const userRepository = require("../repository/userRepository");
const nodemailer = require("nodemailer");
require("dotenv").config();

const create = async (data) => {
  try {
    const handleRegister = await userRepository.create(data);
    return handleRegister;
  } catch (error) {
  console.log("🚀 ~ file: userServices.js ~ line 10 ~ create ~ error", error)
  }
};

const findOne = async (option) => {
  try {
    const handleLogin = await userRepository.findOne(option);
    return handleLogin;
  } catch (error) {
  console.log("🚀 ~ file: userServices.js ~ line 19 ~ findOne ~ error", error)
  }
};

const deleteAccount = async (id) => {
  try {
      const deleteAccount = await userRepository.deleteUser(id);
      return deleteAccount;
  } catch (error) {
  console.log("🚀 ~ file: userServices.js ~ line 28 ~ deleteAccount ~ error", error)
  }
};

const update = async (id, data ) => {
  try {
      const update = await userRepository.update(id, data);
      return update;
  } catch (error) {
      console.log(error);
  }
};
const user = "trung0824013874@gmail.com";
const password = process.env.pass;
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: password,
  },
});

module.exports = { 
  create, 
  findOne,
  deleteAccount,
  update,
  transport
};
