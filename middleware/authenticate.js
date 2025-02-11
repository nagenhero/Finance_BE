import { getUserByEmail } from "../model/user/UserModel.js";
import jwt from "jsonwebtoken";
import { jwtVerify } from "../Utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    //1.get the token
    const token = req.headers.authorization;
    console.log(201, token);
    //2. cdecode
    const decodedData = await jwtVerify(token);
    console.log(201, token);
    console.log("decodedata", decodedData);
    //3. check if decodeddata has email
    // decodedata { email: 'ashon@gmail.com', iat: 1737416517, exp: 1737502917 }
    if (decodedData?.email) {
      const userData = await getUserByEmail(decodedData.email);
      if (userData) {
        //4. go and do the next process
        // console.log(1111, userData);
        req.userData = userData;

        // console.log(22222, req);
        // console.log(111111, req.userData);
        next();
      } else {
        const errorObj = {
          status: "ERROR",
          message: "Autheticate failed",
        };
        return res.status(401).send(errorObj);
      }
    } else {
      return res.status(401).json({
        status: "Error",
        message: "invalid token",
      });
    }
  } catch (error) {
    next({
      statusCode: 500,
      message: "error autheticate token ssss",
    });

    // return res.status(401).json({
    //   status: "Error",
    //   message: "error autenticate token",
    // });
  }
};
