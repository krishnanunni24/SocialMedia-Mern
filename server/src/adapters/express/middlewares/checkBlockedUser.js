import BlockedUsersModel from "../../mongodb/models/BlockedModel.js";

const checkBlockedUser = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id']; // Access the userId from the request headers

    const blockedUser = await BlockedUsersModel.findOne({ userId });

    if (blockedUser) {
      // User is blocked, prevent further processing
      console.log("Blocked User...")
      return res.status(403).json({ message: "User is blocked." });
    }

    // User is not blocked, proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export default checkBlockedUser;
