import express from "express";
import { createUser, getUserByEmail } from "../model/user/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { compareText, encryptText } from "../Utils/bcrypt.js";
import { jwtSign } from "../Utils/jwt.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email } = req.body;
    let { password } = req.body;
    // const saltRound = 10;()
    password = await encryptText(password);
    // const newUser = new User({
    //   username,
    //   email,
    //   password,
    // });
    // const data = await newUser.save();

    const newUser = await createUser({
      username,
      email,
      password,
    });

    return res.json({
      status: "success",
      message: "post user created",
    });
  } catch (error) {
    // y
    console.log("232", error.message);

    next({
      statusCode: 500,
      message: error?.message,
    });

    // if (error?.message?.includes("E11000")) {
    //   res.status(400).json({
    //     status: "error",
    //     message: error.message,
    //     message1: " EMAIL SHOULD BE UNIQUE .EMAIL ALREADY USED",
    //   });
    // }
  }
});
router.post("/login", async (req, res, next) => {
  try {
    console.log("step1", req.body);
    const { email, password } = req.body;

    const userData = await getUserByEmail(email);

    console.log(111, userData);

    if (userData) {
      const loginSuccess = await compareText(password, userData.password);
      const tokenData = {
        email: userData.email,
      };
      const token = await jwtSign(tokenData);
      if (loginSuccess) {
        res.status(200).json({
          status: "success",
          message: " user  login sucessfulll",
          accessToken: token,
          user: {
            id: userData.id,
            username: userData.username,
          },
        });
      } else {
        next({
          statusCode: 400,
          message: "Password not matched!",
        });
      }
    } else {
      next({
        statusCode: 400,
        message: "user not matched or not in database!",
      });
      // res.status(500).json({
      //   status: "error",
      //   message: " user not found",
      // });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});
router.get("/", authenticate, async (req, res) => {
  req.userData.password = "";
});
export default router;
