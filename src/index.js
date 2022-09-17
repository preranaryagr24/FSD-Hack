const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const { json } = require("express");
require("./db/conn");
const Register = require("./models/register");
const Contact = require("./models/contact");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const pass = req.body.password;
    const cpass = req.body.cpassword;

    if (pass === cpass) {
      const registerEmploy = new Register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: pass,
        cpassword: cpass,
        email: req.body.email,
        phone: req.body.phone,
      });

      const Registered = await registerEmploy.save();
      res.status(201).render("index");
    } else {
      res.send("passwords doesn't match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/hire", (req, res, next) => {
  res.render("hire");
});
app.get("/FAQs", (req, res) => {
  res.render("FAQ");
});
app.post("/sign", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({ email: email });

    if (useremail.password === password) {
      res.status(201).render("index");
    } else {
      res.send("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Invalid Credentials");
  }
});

app.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact({
      Full_Name: req.body.Full_Name,
      Email: req.body.Email,
      text: req.body.text,
    });

    const contacted = await newContact.save();
    res.status(201).render("contact");
  } catch (error) {
    res.status(400).send(error);
  }
});
app.use(express.static(static_path));
app.get("*", (req, res) => {
  res.render("404error", {
    errorMsg: "Opps page  not found",
  });
});

const localhost = "127.0.0.1";
app.listen(port, () => {
  console.log(`the code is running at http://${localhost}:${port}`);
});
