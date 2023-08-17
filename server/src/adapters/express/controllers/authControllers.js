import UserModel from "../../mongodb/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminModel from "../../mongodb/models/adminModel.js";
import twilio from "twilio";
import { configDotenv } from "dotenv";

configDotenv();
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, phone, name } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }, { phone: Number(phone) }],
    }).select("_id username phone email");

    if (existingUser) {
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({ message: "Username already exists", username: true });
      } else if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "Email already exists", email: true });
      } else if (existingUser.phone === phone) {
        return res
          .status(400)
          .json({ message: "Phone number already exists", phone: true });
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      name,
      password: hashedPassword,
      phone: Number(phone),
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { username: savedUser.username, id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ user: savedUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user.isBlocked) {
      return res.status(401).json({ message: "blocked user", blocked: true });
    }
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        return res
          .status(400)
          .json({ message: "Wrong Password", authFail: true });
      } else {
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
          { username: user.email, id: user._id },

          secret,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ user, token });
      }
    } else {
      return res
        .status(404)
        .json({ message: "User not found", authFail: true });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      const validity = await bcrypt.compare(password, admin.password);
      if (!validity) {
        res.status(400).json("Wrong Password");
      } else {
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
          { username: admin.email, id: admin._id },

          secret,
          { expiresIn: "1h" }
        );
        res.status(200).json({ admin, token });
      }
    } else {
      res.status(400).json("user not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginWithGoogle = async (req, res) => {
  console.log("loginwithgoogle", req.body);
  const { uid, email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user.isBlocked) {
      return res.status(401).json({ message: "blocked user", blocked: true });
    }
    if (user) {
      const validity = await bcrypt.compare(uid, user.uid);
      if (!validity) {
        return res
          .status(400)
          .json({ message: "Google Auth Failed", authFail: true });
      } else {
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
          { username: user.email, id: user._id },

          secret,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ user, token });
      }
    } else {
      return res
        .status(404)
        .json({ message: "User not found", authFail: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const SignUpWithGoogle = async (req, res) => {
  console.log("signup", req.body);
  try {
    const { username, phone, googleData } = req.body;
    const { email, displayName, uid } = googleData;
    //existing user check
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }, { phone: Number(phone) }],
    }).select("_id username phone email");
    console.log(existingUser, "user");
    if (existingUser) {
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({ message: "Username already exists", username: true });
      } else if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "Email already exists", email: true });
      } else if (existingUser.phone === Number(phone)) {
        return res
          .status(400)
          .json({ message: "Phone number already exists", phone: true });
      }
    }

    //hash uid
    const salt = await bcrypt.genSalt(10);
    const hashedUid = await bcrypt.hash(uid, salt);

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      name: displayName,
      phone: Number(phone),
      uid: hashedUid,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { username: savedUser.username, id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ user: savedUser, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const otpGenerate = async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  console.log(process.env.VERIFICATION_SID, "::", authToken, "::", accountSid);
  const client = twilio(accountSid, authToken);

  try {
    const { phone } = req.params;
    console.log("phone", phone);

    client.verify.v2
      .services(process.env.VERIFICATION_SID)
      .verifications.create({ to: `+91${phone}`, channel: "sms" })
      .then((verification) => {
        console.log(verification.sid);
        return res.status(200).json(verification);
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const OtpValidate = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    console.log(phone,otp)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    console.log(
      process.env.VERIFICATION_SID,
      "::",
      authToken,
      "::",
      accountSid
    );
    const client = twilio(accountSid, authToken);

    client.verify.v2
      .services(process.env.VERIFICATION_SID)
      .verificationChecks.create({ to: `+91${phone}`, code: otp })
      .then((verification_check) => {
        console.log(verification_check.status);
       
        return res.status(200).json(verification_check.status)
      });
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
};
