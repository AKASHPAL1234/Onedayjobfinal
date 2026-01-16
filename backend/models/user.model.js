// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
   
//   },

//   photo: {
//    public_id:{
//     type:String,
//     required:true
//    },
//    url:{
//     type:String,
//     required:true

//    }
//   },

//   phone:{
//     type:String,
//     required:true,
//     unique:true,
//     maxlength:10,
//     minlength:10
//   },
 
 
//   role: {
//     type: String,
//     required: true,
//     enum: ["Worker", "Client","Admin"],
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false,
//   },
//   token:{
//     type:String,
    
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export const User = mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  photo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
    minlength: 10,
  },

  role: {
    type: String,
    required: true,
    enum: ["Worker", "Client", "Admin"],
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  token: {
    type: String,
  },

  // 🔑 Ye field add karo
  kycStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
