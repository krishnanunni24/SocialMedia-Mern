import UserModel from "../../mongodb/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ReportPostModel from "../../mongodb/models/reportPostModel.js";
import PostModel from "../../mongodb/models/postModel.js";
import BlockedUsersModel from "../../mongodb/models/BlockedModel.js";
import LikeModel from "../../mongodb/models/likesModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users) {
      return res.status(200).json({ users });
    } else {
      return res.status(400).json({ message: "NO users found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const blockUser = async (req, res) => {
  console.log("block user");
  try {
    const userId = req.body.id;
    const blocked = req.body.blocked;

    if (blocked) {
      // Create a new BlockedUser entry
      const blockedUser = await BlockedUsersModel.create({
        userId: userId,
      });

    } else {
      // Remove the BlockedUser entry if unblocking
      const deletedBlockedUser = await BlockedUsersModel.findOneAndDelete({
        userId: userId,
      });

      console.log("User unblocked");
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isBlocked: blocked } }
    );

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(400).json({ message: "No users found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const fetchUserDataWithDiffPercentage = async (req, res) => {
  // Get the current date and the start of the current month
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get the start of the previous month
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  try {
    // Query to get user data added in the current month
    const currentMonthUserData = await UserModel.find({
      createdAt: { $gte: startOfMonth, $lt: currentDate },
    }).exec();

    // Query to get user data added in the previous month
    const previousMonthUserData = await UserModel.find({
      createdAt: { $gte: previousMonth, $lt: startOfMonth },
    }).exec();

    // Calculate the difference percentage in user count
    const currentMonthUserCount = currentMonthUserData.length;
    const previousMonthUserCount = previousMonthUserData.length;
    const userCountDiffPercentage = Math.round(
      ((currentMonthUserCount - previousMonthUserCount) /
        previousMonthUserCount) *
        100
    );

    const data = {
      title: "New Users",
      icon: "user",
      value: currentMonthUserCount,
      diff: userCountDiffPercentage,
    };

    return res.status(200).json(data);
    // Return or process the user data and the difference percentage as needed
    // ...
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json(error);
  }
};

// Fetch post data added in the current month and calculate the difference percentage compared to the previous month
export const fetchPostsDataWithDiffPercentage = async (req, res) => {
  // Get the current date and the start of the current month
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get the start of the previous month
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  try {
    // Query to get post data added in the current month
    const currentMonthPostData = await PostModel.find({
      createdAt: { $gte: startOfMonth, $lt: currentDate },
    }).exec();

    // Query to get post data added in the previous month
    const previousMonthPostData = await PostModel.find({
      createdAt: { $gte: previousMonth, $lt: startOfMonth },
    }).exec();

    // Calculate the difference percentage in post count
    const currentMonthPostCount = currentMonthPostData.length;
    const previousMonthPostCount = previousMonthPostData.length;
    const postCountDiffPercentage = Math.round(
      ((currentMonthPostCount - previousMonthPostCount) /
        previousMonthPostCount) *
        100
    );

    const data = {
      title: "New Posts",
      icon: "post",
      value: currentMonthPostCount,
      diff: postCountDiffPercentage,
    };

    return res.status(200).json(data);

    // Return or process the post data and the difference percentage as needed
    // ...
  } catch (error) {
    console.error("Error fetching post data:", error);
    res.status(500).json(error);
  }
};

// Fetch like data added in the current month and calculate the rounded difference percentage compared to the previous month
export const fetchLikesDataWithDiffPercentage = async (req, res) => {
  // Get the current date and the start of the current month
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get the start of the previous month
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  try {
    // Query to get like data added in the current month
    const currentMonthLikesData = await LikeModel.find({
      createdAt: { $gte: startOfMonth, $lt: currentDate },
    }).exec();

    // Query to get like data added in the previous month
    const previousMonthLikesData = await LikeModel.find({
      createdAt: { $gte: previousMonth, $lt: startOfMonth },
    }).exec();

    // Calculate the difference percentage in like count and round it to the nearest whole number
    const currentMonthLikeCount = currentMonthLikesData.length;
    const previousMonthLikeCount = previousMonthLikesData.length;
    const likeCountDiffPercentage = Math.round(
      ((currentMonthLikeCount - previousMonthLikeCount) /
        previousMonthLikeCount) *
        100
    );

    const data = {
      title: "New Likes",
      icon: "like",
      value: currentMonthLikeCount,
      diff: likeCountDiffPercentage,
    };
    return res.status(200).json(data);
    // Return or process the like data and the rounded difference percentage as needed
    // ...
  } catch (error) {
    console.error("Error fetching like data:", error);
    return res.status(500).json(error);
  }
};

// Fetch reported post data added in the current month and calculate the rounded difference percentage compared to the previous month

export const fetchReportedPostsDataWithDiffPercentage = async (req, res) => {
  // Get the current date and the start of the current month
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get the start of the previous month
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  try {
    // Query to get reported post data added in the current month
    const currentMonthReportedPostsData = await ReportPostModel.find({
      createdAt: { $gte: startOfMonth, $lt: currentDate },
    }).exec();

    // Query to get reported post data added in the previous month
    const previousMonthReportedPostsData = await ReportPostModel.find({
      createdAt: { $gte: previousMonth, $lt: startOfMonth },
    }).exec();

    // Calculate the difference percentage in reported post count and round it to the nearest whole number
    const currentMonthReportedPostCount = currentMonthReportedPostsData.length;
    const previousMonthReportedPostCount =
      previousMonthReportedPostsData.length;

    let reportedPostCountDiffPercentage;
    if (previousMonthReportedPostCount === 0) {
      reportedPostCountDiffPercentage = 0;
    } else {
      reportedPostCountDiffPercentage = Math.round(
        ((currentMonthReportedPostCount - previousMonthReportedPostCount) /
          previousMonthReportedPostCount) *
          100
      );
    }

    const data = {
      title: "New Reports",
      icon: "report",
      value: currentMonthReportedPostCount,
      diff: reportedPostCountDiffPercentage,
    };

    return res.status(200).json(data);
    // Return or process the reported post data and the rounded difference percentage as needed
    // ...
  } catch (error) {
    console.error("Error fetching reported post data:", error);
    return res.status(500).json(error);
  }
};

export const fetchReportedPosts = async (req, res) => {
  try {
    const reports = await ReportPostModel.find()
      .populate({
        path: "userId",
        select: "username profilePicture",
      })
      .populate({
        path: "reporters.userId",
        select: "username profilePicture", // Select the desired fields from the 'Users' model
      })
      .populate({
        path: "postId",
        select: "caption image likes comments shares unlisted", // Select the desired fields from the 'Posts' model
      });

    res.status(200).json({ reports });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const fetchUsersByWeek = async (req, res) => {
  // Get the current date and time
  const currentDate = new Date();

  // Calculate the date 7 days ago
  const lastWeekDate = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  // Set the last week's date to the beginning of the day
  lastWeekDate.setHours(0, 0, 0, 0);

  // Set the current date to the beginning of the day
  currentDate.setHours(0, 0, 0, 0);
  try {
    const usersAddedLastWeek = await UserModel.find({
      createdAt: {
        $gte: lastWeekDate,
        $lt: currentDate,
      },
    });

    // Group users by day
    const usersByDay = {};
    usersAddedLastWeek.forEach((user) => {
      const createdDate = user.createdAt.toDateString();
      if (usersByDay.hasOwnProperty(createdDate)) {
        usersByDay[createdDate].push(user);
      } else {
        usersByDay[createdDate] = [user];
      }
    });

  } catch (error) {
    console.error("Error fetching users added last week:", error);
  }
};

export const unListPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.unlisted = !post.unlisted;
    const unlisted = post.unlisted;
    await post.save();
    return res
      .status(200)
      .json({ message: "Post updated successfully", unlisted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchNewUsersWeekly = async (req, res) => {
  try {
    // Get the current date and time
    const currentDate = new Date();

    // Calculate the date 7 days ago
    const lastWeekDate = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    // Set the last week's date to the beginning of the day
    lastWeekDate.setHours(0, 0, 0, 0);

    const usersAddedLastWeek = await UserModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastWeekDate,
            $lt: currentDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const userCounts = [];

    // Initialize the dates and counts
    let dateCursor = new Date(lastWeekDate);
    let dayCount = 0;

    while (dateCursor <= currentDate && dayCount < 7) {
      const dateKey = dateCursor.toISOString().split("T")[0];
      const matchingEntry = usersAddedLastWeek.find(
        (entry) => entry._id === dateKey
      );
      const count = matchingEntry ? matchingEntry.count : 0;
      userCounts.push(count);
      dateCursor.setDate(dateCursor.getDate() + 1);
      dayCount++;
    }

    return res.status(200).json(userCounts);
  } catch (error) {
    console.error("Error fetching posts added last week:", error);
    return res.status(500).json(error);
  }
};

export const fetchNewPostsWeekly = async (req, res) => {
  // Get the current date and time
  const currentDate = new Date();

  // Calculate the date 7 days ago
  const lastWeekDate = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  // Set the last week's date to the beginning of the day
  lastWeekDate.setHours(0, 0, 0, 0);
  try {
    const postsAddedLastWeek = await PostModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastWeekDate,
            $lt: currentDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    const postCounts = [];

    // Initialize the dates and counts
    let dateCursor = new Date(lastWeekDate);
    let dayCount = 0;

    while (dateCursor <= currentDate && dayCount < 7) {
      const dateKey = dateCursor.toISOString().split("T")[0];
      const matchingEntry = postsAddedLastWeek.find(
        (entry) => entry._id === dateKey
      );
      const count = matchingEntry ? matchingEntry.count : 0;
      postCounts.push(count);
      dateCursor.setDate(dateCursor.getDate() + 1);
      dayCount++;
    }

    return res.status(200).json(postCounts);
  } catch (error) {
    console.error("Error fetching posts added last week:", error);
    return res.status(500).json(error);
  }
};

export const fetchTotal = async (req, res) => {
  try {
    const totalLikes = await LikeModel.countDocuments({}); // Count the total number of likes in the LikeModel collection
    const totalPosts = await PostModel.countDocuments({});
    const totalUsers = await UserModel.countDocuments({}); // Count the total number of users in the UserModel collection
    const data = { totalLikes, totalPosts, totalUsers };
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching total likes and total users:", error);
    return res.status(500).json(error);
  }
};
