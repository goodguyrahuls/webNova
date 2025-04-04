const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const asyncWrap = require("./utils/asyncWrap.js");

const Contact = require("./models/contact.js");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.engine("ejs", ejsMate);



require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err));



//Index route
app.get("/frox", (req, res) => {
    res.render("frox/index.ejs");
})

//Contact route
app.get("/frox/contact", (req, res) => {
    res.render("frox/contact.ejs");
})

app.post("/frox/contact", async(req, res) => {
    let {name, ph, email, message} = req.body;
    let client = new Contact({
        name: name,
        ph: ph,
        email: email,
        message: message,
    })
    await client.save();
    res.redirect("/frox");
})

app.get("/frox/admin", async(req, res) => {
    let contacts = await Contact.find();
    res.render("frox/admin.ejs", { contacts });
})

app.get("/frox/about", (req, res) => {
    res.render("frox/about.ejs");
})

app.get("/frox/services", (req, res) => {
    res.render("frox/service.ejs");
})

app.get("/frox/projects", (req, res) => {
    res.render("frox/project.ejs");
})

app.get("/frox/blogs", (req, res) => {
    res.render("frox/blog.ejs");
})

app.get("/frox/program", (req, res) => {
    res.render("frox/program.ejs")
})



app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
})