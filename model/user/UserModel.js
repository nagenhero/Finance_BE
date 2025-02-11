import userModel from "./UserSchema.js";
//create user
export const createUser = (userObj) => {
  return userModel(userObj).save();
};
//READ USER
export const getUserByEmail = (email) => {
  return userModel.findOne({ email });
};
