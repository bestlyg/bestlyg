const express = require("express");
const { sendFile } = require("./utils");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  sendFile({ req, res, filepath: "index.html" });
});

// app
//   .route("/book")
//   .get((req, res) => {
//     res.send("Get a random book");
//   })
//   .post((req, res) => {
//     res.send("Add a book");
//   })
//   .put((req, res) => {
//     res.send("Update the book");
//   });

app.listen(port, () => {
  console.log("App listening : " + port);
});
