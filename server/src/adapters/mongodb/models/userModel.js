import mongoose from "mongoose";


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
      default:"https://res.cloudinary.com/dcpxcesvx/image/upload/v1684902597/social-media/defaultUser_kv3x1f.jpg"
    },
    about: String,
    active:Boolean,
  },
  { timestamps: true }
);



const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
