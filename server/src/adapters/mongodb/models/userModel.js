import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    uid:{
      type:String
    },
    name: {
      type: String,
      required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    followers:{type:Number,default:0},
    following:{type:Number,default:0},
    posts:{type:Number,default:0},

    isBlocked:{
      type:Boolean,
      default:false
    },
    profilePicture:{
      type:String,
      default: process.env.DEFAULT_PROFILE,
    },
    about: String,
    active:Boolean,
  },
  { timestamps: true }
);



const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
