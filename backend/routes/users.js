import express from "express";
import mongoose from "mongoose";
const User = mongoose.model("user");
const router = express.Router();
 
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let err = {}
      if(username.trim()==='') err.username = 'Username can not be empty';
      if(password.trim()==='') err.password = 'Password can not be empty';
      if(Object.keys(err).length>0) throw err;
      let user = await User.findOne({ username: username }, {});
      if(!user){
        err.username = 'User does not exist';
        throw err; 
      }
      if(password!==user.password){
        err.password = 'Password does not match';
        throw err;
      }
      res.send("Login Succcesfully")
      return user;
  } catch (error) {
      console.log(error);
      throw error;
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  try {
    let err = {}
      if(username.trim()==='') err.username = 'Username can not be empty';
      if(email.trim()==='') err.email = 'Email can not be empty';
      if(password.trim()==='') err.password = 'Password can not be empty';
      if(Object.keys(err).length>0) throw err;
      let user = await User.findOne({ username: username }, {});
      if(!user){
        user = await new User({ username, email, password, confirm_password }).save();
        return user; 
      }
  } catch (error) {
      console.log(error);
      throw error;
  }
});

export default router;