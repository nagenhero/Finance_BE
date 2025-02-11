import TransactionModel from "./TransactionSchema.js";
export const getTransaction = (filter) => {
  return TransactionModel.find(filter);
};
export const createTransaction = (tObj) => {
  return TransactionModel(tObj).save();
};

export const deleteTransaction = (dObj) => {
  return TransactionModel.findOneAndDelete(dObj);
};

export const deleteTransactionMany = (dObj) => {
  return TransactionModel.deleteMany(dObj);
};
