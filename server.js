const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync("server.log", log + "\n");
  next();
});

app.use((req, res, next) => {
  res.render("404.hbs");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home.hbs", {
    welcomeMessage: "Welcome to my express.js site",
    pageTitle: "Home Page"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/help", (req, res) => {
  res.send("Help Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
