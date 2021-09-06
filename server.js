const express = require("express");
const mongoose = require("mongoose");
const Document = require("./Model/snippetModel");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const DB =
  "mongodb+srv://<username>:<Password>@cluster0.v6gfl.mongodb.net/codeBin?retryWrites=true&w=majority";
mongoose
  .connect(DB, {})
  .then(() => {
    console.log("DB connect Succesfull🍃");
  })
  .catch((e) => console.log(e));
app.get("/", (req, res) => {
  const code = `Welcome in CodeBin👀👀

Sharing code is a good thing, and it should be _really_ easy to do it.
A lot of times, I want to show you something I'm seeing - and that's where we use codeBin.
By: Pradhuman Jain`;
  res.render("index", { code, language: "plaintext" });
});
app.get("/new", (req, res) => {
  res.render("new", { canSave: true });
});
app.post("/save", async (req, res) => {
  const value = req.body.value;
  const document = await Document.create({ value });
  res.redirect(`/${document.id}`);
});
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const document = await Document.findById(id);
  res.render("index", { code: document.value, id, canEdit: true });
});
app.get("/:id/dublicate", async (req, res) => {
  const id = req.params.id;
  const document = await Document.findById(id);
  res.render("new", {
    value: document.value,
    canSave: true,
    id,
    canEdit: false,
  });
});
app.post("/:id/update", async (req, res) => {
  const id = req.params.id;
  const value = req.body.value;
  const document = await Document.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.render("index", { code: document.value, canEdit: true, id });
});
app.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  const document = await Document.findById(id);
  res.render("new", {
    value: document.value,
    canUpdate: true,
    id,
    canEdit: false,
    canSave: false,
  });
});
app.listen(3000, () => {
  console.log("app listening");
});
