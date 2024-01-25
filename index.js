const express = require("express");
const { connection } = require("./configs/db");
const { UserModel } = require("./models/User.model");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Instagram");
});

app.post("/register", async (req, res) => {
  const {email,fullname,username,password} = req.body;
  try {
    bcrypt.hash(password, 5, async(err, secure_password) =>{
        if(err){
          console.log(err)
        }else{
          const user=new UserModel({email,fullname,username,password:secure_password})
          await user.save();
          res.send("Registered");
        }
    })
  } catch (err) {
    res.send("Error in registering the user");
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({email});
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if(result){
          const token = jwt.sign({course: 'backend'}, 'masai');
          res.send({"msg":"Login Successfull","token":token})
          console.log("Login Hogaya")
        }else{
          res.send("Wrong Credentials")
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (err) {
    res.send("Something went wrong");
    console.log(err);
  }
});

app.get("/feed", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      res.send("Invalid Token");
      console.log(err);
    } else {
      res.send("Feed Page");
    }
  });
});

app.listen(1010, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Trouble connecting to the DB");
    console.log(err);
  }
  console.log("Server is running at port 1010");
});
