const express = require("express");
const path = require("path");
const multer = require("multer");
const { mergePDF } = require("./public/js/mergePDF");
const fs = require("fs");
const app = express();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("application/pdf")) {
      return cb(new Error("Only PDF files are allowed!"));
    }
    cb(null, true);
  },
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/merge-pdfs", upload.array("pdfs", 2), async (req, res) => {
  try {
    if (req.files.length !== 2) {
      throw new Error("please select exactly two PDFs to merge");
    }
    const mergedPdfTime = await mergePDF(
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path)
    );
    const mergedPdfPath = path.join(
      __dirname,
      `public/generatedPDFs/${mergedPdfTime}.pdf`
    );
    fs.readFile(mergedPdfPath, (err, data) => {
      if (err) {
        throw new Error("Failed to read the merged PDF file.");
      }
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000);
