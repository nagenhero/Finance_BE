# Finance_BE
Backend: Node.js with Express.js
Database: MongoDB (hosted on MongoDB Atlas)
Authentication: JWT (JSON Web Tokens)
Deployment:
Frontend: Deployed on Netlify or Vercel
Backend: Deployed on Render or Cyclic
4. Database Design
Users Collection:
_id: ObjectId
username: String 
email: String (unique)
password: String (hashed)
createdAt: Date
Transactions Collection:
_id: ObjectId
userId: ObjectId (reference to Users collection)
type: String (Income/Expense)
amount: Number
date: Date
description: String
createdAt: Date
5. Security Considerations
Passwords will be hashed before storage using bcrypt.
JWT will be used for authentication with secure cookie storage.
HTTPS will be enforced on both frontend and backend deployments.
