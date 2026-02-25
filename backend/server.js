const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const db = require('./db')


require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(mysql);

app.post("./register", async (req, res)=>{

const {name, email, password} = req.body;
const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO login_user (name, email, password) VALUES(?, ?)",
    [name, email, hashed],
    (err)=>{
      if(err) return res.status(400).json({error: "User Alredy exists"});
      res.json({message: "Register Sucessfully"});
    }
  );
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected");
});



app.listen(5000, () => {
  console.log("server runngin on port 5000");
});
