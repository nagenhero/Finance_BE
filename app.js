import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "./Utils/errorhandler.js";

dotenv.config();
//  you can use in start in package .json"dev": "nodemon  --env-file=.env app.js",
import { connectMongoDB1 } from "./mongodbConnect.js";
import { createUser, getUserByEmail } from "./model/user/UserModel.js";
import {
  createTransaction,
  deleteTransaction,
  deleteTransactionMany,
  getTransaction,
} from "./model/transaction/TransactionModel.js";
import { authenticate } from "./middleware/authenticate.js";
const app = express();
app.use(express.json());
app.use(cors());
//
//CONECTION TO MONGO DB
connectMongoDB1();
// const PORT = 5030;
const PORT = process.env.PORT || 5040;
app.get("/", (req, res) => {
  res.json({
    message: "its live",
  });
});
// const userSchema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model("user", userSchema);
// const transactionSchema = mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ["Income", "Expense"],
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// const Transaction = mongoose.model("Transaction", transactionSchema);
//post or signup form for POST
import router from "./routers/userRouter.js";
import routerTranscation from "./routers/transactionRouter.js";
app.use("/api/v1/users", router);
// app.post("/api/v1/users/register", async (req, res) => {
//   try {
//     const { username, email } = req.body;
//     let { password } = req.body;
//     const saltRound = 10;
//     password = await bcrypt.hash(password, saltRound);
//     // const newUser = new User({
//     //   username,
//     //   email,
//     //   password,
//     // });
//     // const data = await newUser.save();

//     const newUser = await createUser({
//       username,
//       email,
//       password,
//     });

//     res.json({
//       status: "success",
//       message: "post user created",
//       data,
//     });
//   } catch (error) {
//     console.log(error.message);
//     if (error?.message?.includes("E11000")) {
//       res.status(400).json({
//         status: "error",
//         message: error.message,
//         message1: " EMAIL SHOULD BE UNIQUE .EMAIL ALREADY USED",
//       });
//     }
//   }
// });

// user login POST
// app.post("/api/v1/users/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);
//     const userData = await getUserByEmail(email);

//     console.log(111, userData);

//     if (userData) {
//       const loginSuccess = await bcrypt.compare(password, userData.password);
//       const tokenData = {
//         email: userData.email,
//       };
//       const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRESIN,
//       });
//       if (loginSuccess) {
//         res.status(200).json({
//           status: "success",
//           message: " user  login sucessfulll",
//           accessToken: token,
//         });
//       } else {
//         res.status(500).json({
//           status: "error",
//           message: "password not matched",
//         });
//       }
//     } else {
//       res.status(500).json({
//         status: "error",
//         message: " user not found",
//       });
//     }
//   } catch (error) {
//     res.json({
//       message: error.message,
//     });
//   }
// });
//create transction

app.use("/api/v1/transactions", routerTranscation);

// app.post("/api/v1/transactions", authenticate, async (req, res) => {
//   try {
//     console.log(101, req.headers);
//     // //1.get the toke
//     // const token = req.headers.authorization;
//     // //2. cdecode
//     // const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(201, token);
//     // console.log("decodedata", decodedData);
//     // //3. check if decodeddata has email
//     // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
//     // if (decodedData?.email) {
//     //   const userData = await getUserByEmail(decodedData.email);
//     // if (userData) {
//     //4.creayte the transction
//     const { type, description, amount, date } = req.body;
//     const newTransaction = await createTransaction({
//       userId: req.userData._id,
//       type: type,
//       description: description,
//       amount: amount,
//       date: date,
//     });
//     // const newData = await newTransaction.save();
//     res.status(201).json({
//       status: "success",
//       message: "transaction created",
//       data: newTransaction,
//     });
//     // } else {
//     //     res.status(201).json({
//     //       status: "error",
//     //       message: " invlaid token transaction not createad as email not valid",
//     //     });
//     //   }
//     // }
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: " error!!! transaction not created",
//       errormessage: error.message,
//     });
//   }
// });

// app.get("/api/v1/transactions", authenticate, async (req, res) => {
//   try {
//     // console.log(101, req.headers);
//     // //1.get the toke
//     // const token = req.headers.authorization;
//     // //2. cdecode
//     // const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(201, token);
//     // console.log("decodedata", decodedData);
//     // //3. check if decodeddata has email
//     // // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
//     // if (decodedData?.email) {
//     //   const userData = await getUserByEmail(decodedData.email);
//     // if (userData) {
//     //4.fetch the transction data of the user with use id from userdata
//     const transactionData = await getTransaction({
//       userId: req.userData._id,
//     });
//     res.status(201).json({
//       status: "success",
//       message: "transaction found ",
//       transaction: transactionData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       message: error.message,
//     });
//   }
// });
//DELETE
// app.delete("/api/v1/transactions/:id", authenticate, async (req, res) => {
//   try {
//     // const id = req.params.id;
//     // console.log(222, id);

//     // const token = req.headers.authorization;
//     // //2. cdecode
//     // const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
//     // // console.log(201, token);
//     // console.log("decodedata", decodedData);
//     // //3. check if decodeddata has email
//     // // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
//     // if (decodedData?.email) {
//     //   const userData = await getUserByEmail(decodedData.email);
//     // if (userData) {
//     const transId = req.params.id;
//     //4.find the transction wuth the used id from userdata and trasnction id from the parameter and delete
//     const transactionData = await deleteTransaction({
//       _id: transId,
//       userId: req.userData._id,
//     });
//     if (transactionData) {
//       console.log("444", transactionData);
//       res.status(201).json({
//         status: "success",
//         message: "transaction ha been deleted succesfully",
//         newData: transactionData,
//         // transaction: transactionData,
//       });
//     } else {
//       res.status(500).json({
//         status: "error",
//         message: "transction id not found or have been already deleted",
//       });
//     }

//     console.log("444", transactionData);
//     res.status(201).json({
//       status: "success",
//       message: "transaction found ",
//       transaction: transactionData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       message: error.message,
//     });
//   }
// });

// app.delete("/api/v1/transactions", authenticate, async (req, res) => {
//   try {
//     const id = req.params.id;
//     // console.log(222, id);

//     // const token = req.headers.authorization;
//     // //2. cdecode
//     // const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
//     // // console.log(201, token);
//     // console.log("decodedata", decodedData);
//     // //3. check if decodeddata has email
//     // // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
//     // if (decodedData?.email) {
//     //   const userData = await getUserByEmail(decodedData.email);
//     // if (userData) {
//     //   //4.find the transcttion with the user id from userdata and
//     // transction id from the paramter and delted
//     const transactions = req.body.transactions;

//     const transactionData = await deleteTransactionMany({
//       _id: { $in: transactions },
//       userId: req.userData._id,
//     });
//     if (transactionData) {
//       console.log("444", transactionData);
//       res.status(201).json({
//         status: "success",
//         message: transactionData.deletedCount + "    transction deleted",
//         // transaction: transactionData,
//       });
//     } else {
//       res.status(500).json({
//         status: "error",
//         message: "error in deltetin g tranction data",
//       });
//     }

//     console.log("444", transactionData);
//     res.status(201).json({
//       status: "success",
//       message: "transaction found ",
//       transaction: transactionData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       message: error.message,
//     });
//   }
// });

// error handler
app.use(errorHandler);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
