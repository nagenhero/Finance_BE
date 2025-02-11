import bcrypt from "bcrypt";
const SALT_ROUND = 10;
export const encryptText = async (inputText) => {
  return bcrypt.hash(inputText, SALT_ROUND);
};

export const compareText = async (plainText, encryptText) => {
  return bcrypt.compare(plainText, encryptText);
};
