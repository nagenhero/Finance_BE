import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import {
  createTransaction,
  deleteTransaction,
  deleteTransactionMany,
  getTransaction,
} from "../model/transaction/TransactionModel.js";
const routerTranscation = express.Router();
routerTranscation.post("/", authenticate, async (req, res) => {
  try {
    console.log(101, req.headers);
    // //1.get the toke
    // const token = req.headers.authorization;
    // //2. cdecode
    // const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(201, token);
    // console.log("decodedata", decodedData);
    // //3. check if decodeddata has email
    // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
    // if (decodedData?.email) {
    //   const userData = await getUserByEmail(decodedData.email);
    // if (userData) {
    //4.creayte the transction
    const { type, description, amount, date } = req.body;
    const newTransaction = await createTransaction({
      userId: req.userData._id,
      type: type,
      description: description,
      amount: amount,
      date: date,
    });
    // const newData = await newTransaction.save();
    res.status(201).json({
      status: "success",
      message: "transaction created",
      data: newTransaction,
    });
    // } else {
    //     res.status(201).json({
    //       status: "error",
    //       message: " invlaid token transaction not createad as email not valid",
    //     });
    //   }
    // }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: " error!!! transaction not created",
      errormessage: error.message,
    });
  }
});
routerTranscation.get("/", authenticate, async (req, res) => {
  try {
    // console.log(101, req.headers);
    // //1.get the toke
    // const token = req.headers.authorization;
    // //2. cdecode
    // const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(201, token);
    // console.log("decodedata", decodedData);
    // //3. check if decodeddata has email
    // // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
    // if (decodedData?.email) {
    //   const userData = await getUserByEmail(decodedData.email);
    // if (userData) {
    //4.fetch the transction data of the user with use id from userdata
    const transactionData = await getTransaction({
      userId: req.userData._id,
    });
    res.status(201).json({
      status: "success",
      message: "transaction found ",
      transaction: transactionData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
});
routerTranscation.delete("/:id", authenticate, async (req, res) => {
  try {
    // const id = req.params.id;
    // console.log(222, id);

    // const token = req.headers.authorization;
    // //2. cdecode
    // const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    // // console.log(201, token);
    // console.log("decodedata", decodedData);
    // //3. check if decodeddata has email
    // // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
    // if (decodedData?.email) {
    //   const userData = await getUserByEmail(decodedData.email);
    // if (userData) {
    const transId = req.params.id;
    //4.find the transction wuth the used id from userdata and trasnction id from the parameter and delete
    const transactionData = await deleteTransaction({
      _id: transId,
      userId: req.userData._id,
    });
    if (transactionData) {
      console.log("444", transactionData);
      res.status(201).json({
        status: "success",
        message: "transaction ha been deleted succesfully",
        newData: transactionData,
        // transaction: transactionData,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "transction id not found or have been already deleted",
      });
    }

    console.log("444", transactionData);
    res.status(201).json({
      status: "success",
      message: "transaction found ",
      transaction: transactionData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
});

routerTranscation.delete("/", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(222, id);

    // const token = req.headers.authorization;
    // //2. cdecode
    // const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    // // console.log(201, token);
    // console.log("decodedata", decodedData);
    // //3. check if decodeddata has email
    // // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
    // if (decodedData?.email) {
    //   const userData = await getUserByEmail(decodedData.email);
    // if (userData) {
    //   //4.find the transcttion with the user id from userdata and
    // transction id from the paramter and delted
    const transactions = req.body.transactions;

    const transactionData = await deleteTransactionMany({
      _id: { $in: transactions },
      userId: req.userData._id,
    });
    if (transactionData) {
      console.log("444", transactionData);
      return res.status(201).json({
        status: "success",
        message: transactionData.deletedCount + "    transction deleted",
        // transaction: transactionData,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "error in deltetin g tranction data",
      });
    }

    console.log("after deleting");
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
});

export default routerTranscation;
