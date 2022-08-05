const mongoose = require("mongoose");
const { ADMIN_ROLE, USER_ROLE, SELLER_ROLE } = require("../../constansts/role");
// const { Pending, Active} = require("../../constansts/status");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  tokenVerification: String,
  phoneNumber: {
    type: String,
    min: [100000000]
  },
  firstName: String,
  lastName: String,
  birthDay: Date,
  address: [{
    address: String,
    city: String,
    country: String,
    postalCode: String,
}],
  status: {
    type: String, 
    enum: ['Pending', 'Active'],
    default: 'Pending',
  },
  role: {
    type: String,
    enum: [USER_ROLE, ADMIN_ROLE, SELLER_ROLE],
    default: USER_ROLE,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
