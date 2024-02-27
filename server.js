const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/merge-pdfs", upload.array("pdfs", 2),async(req, res) => {
  console.log(req.files)
  
});

app.listen(3000);
