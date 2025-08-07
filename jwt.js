const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) res.status(401).json({ message: "Unauthorized" });
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
 try {
   const decoded = jwt.verify(token, process.env.secret_key);
   req.user = decoded;
   next();
 } catch (error) {
   res.status(401).json({ message: "Invalid Token" });
 }
};

const generatejwttoken = (userDetail) => {
  return jwt.sign(userDetail, process.env.secret_key);
};

module.exports = { jwtAuthMiddleware, generatejwttoken };
