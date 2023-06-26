import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Modify the verification process based on your token structure
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err){
        if(err.message === "jwt expired") {
        return res.status(403).json({ message: err.message ,expired:true});

        }else{
          return res.status(403).json({ message: "Invalid token" });
        }
      }

      // Modify the property to match the decoded token's structure
      req.userId = decoded.id; // Assuming the decoded token contains the "id" property

      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default verifyToken;
