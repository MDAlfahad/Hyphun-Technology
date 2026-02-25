const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hyphun@1950#",
  database: "jobportal",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySql Connected");
});



app.listen(5000, () => {
  console.log("server runngin on port 5000");
});
