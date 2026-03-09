require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const formidable = require("formidable");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, email, password, status } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);

    const status = 1;

    db.query(
      "INSERT INTO login_user (name, email, password, status) VALUES(?, ?, ?)",
      [name, email, hashed, status],
      (err) => {
        if (err) return res.status(400).json({ err: "User Alredy exists" });
        res.json({
          sucess: true,
          statusCode: 201,
          message: "Register Sucessfully",
        });
      },
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/loginData", (req, res) => {
  // const{name, email, created_at, role, status} = req.body;

  const sql = `SELECT name, email, created_at, role, status FROM login_user`;
  db.query(sql, (err, result) => {
    if (err) return res.status(501).send("failed to get userData");
    res.json(result);
  });
});

app.post("/update_user", (req, res) => {
  const { id, status } = req.body;

  if(id=== undefined || status=== undefined){
    return res.status(400).json({mesage:" user Id required"})
  }

  const state = status === 1 ? 0 : 1;

  const sql = `UPDATE login_user  SET status=? WHERE id  = ?`;
  db.query(sql, [state, id], (err, result) => {
    if (err) return res.status(500).send("failed to Update Data");
    res.json(result);
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM login_user WHERE email= ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ error: "server error" });

      if (result.length === 0) {
        return res.status(400).json({ error: "User Not Found" });
      }

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ error: "Wrong Password" });
      }
      res.json({
        sucess: true,
        statuscode: 200,
        message: "login sucessfull",
        role: user.role,
        name: user.name,
      });
    },
  );
});

app.get("/currentUser/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT name,email FROM login)user WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result[0]);
    }
  });
});
app.post("/formData", (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields) => {
    if (err) return res.status(500).send("Error parsing form");

    const {
      name,
      type,
      email,
      position,
      city,
      landmark,
      address,
      birthdate,
      tel,
    } = fields;
    const formId = uuidv4();

    const sql =
      "INSERT INTO job_form(user_id, name, type, email, position, city, landmark, address, birthdate, tel ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      sql,
      [
        formId,
        name,
        type,
        email,
        position,
        city,
        landmark,
        address,
        birthdate,
        tel,
      ],
      (err, result) => {
        if (err) {
          console.log("err", err);
          return res.status(500).send({ error: "Form subission failed" });
        }
        res.json({
          sucess: true,
          id: formId,
          message: "Form Submitted Successfully",
        });
      },
    );
  });
});

app.get("/formSubData", (req, res) => {
  const sql = `SELECT name, position, date FROM job_form`;

  db.query(sql, (err, result) => {
    if (err) return res.status(501).send("faild to get Data");
    res.json(result);
  });
});

app.post("/jobformdata", (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields) => {
    if (err) return res.status(500).send("error in uploading form");
    const {
      title,
      companyName,
      experience,
      jobType,
      location,
      startDate,
      amount,
      applydate,
      skills,
      description,
      aboutcompany,
      requirement,
    } = fields;

    const formId = uuidv4();

    const sql =
      "INSERT INTO job_postdata(id, title, companyName, experience, jobType, location, startDate, amount, applydate, skills, description,aboutcompany, requirement) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

    db.query(
      sql,
      [
        formId,
        title,
        companyName,
        experience,
        jobType,
        location,
        startDate,
        amount,
        applydate,
        skills,
        description,
        aboutcompany,
        requirement,
      ],
      (err, result) => {
        if (err) {
          console.log("err", err);
          return res.status(500).send("failed to Post Job");
        }

        return res.status(200).json({
          message: "Job posted successfully",
          id: formId,
          sucess: true,
        });
      },
    );
  });
});

app.get("/jobdata", (req, res) => {
  const sql = "SELECT * FROM job_postdata";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send("failed to load data");
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("server runngin on port 5000");
});
