const UserModel = require("../../../Database/models/User");

const create = async (data) => {
  try {
    const register = await UserModel.create(data);
    return register;
  } catch (error) {
    console.log("🚀 ~ file: AuthRepository.js ~ line 18 ~ register ~ error", error)

  }
};

const findOne = async (option) => {
  try {
    const find = await UserModel.findOne(option);
    return find;
  } catch (error) {
  console.log("🚀 ~ file: userRepository.js ~ line 18 ~ findOne ~ error", error)
  }
};

const deleteUser = async (id) =>{
  try{
      const deleteUser = await UserModel.findByIdAndDelete(id);
      return deleteUser;
  } catch(error){
  console.log("🚀 ~ file: userRepository.js ~ line 27 ~ deleteUser ~ error", error)
  }
}

const update = async (id, data) =>{
  try{
      const updated = await UserModel.findByIdAndUpdate(id, data);
      return updated;
  } catch(error){
  console.log("🚀 ~ file: userRepository.js ~ line 36 ~ update ~ error", error)
  }
}

module.exports = { 
  create, 
  findOne,
  deleteUser,
  update,
};
