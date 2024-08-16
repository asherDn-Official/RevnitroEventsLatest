const express = require("express");
const path = require("path");
const connectToDatabase = require("./database");
const eventsRoutes = require("./routes/eventsRoute");
const bodyParser = require("body-parser");
const imgur = require("imgur");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
app.use(fileUpload());
const PORT = process.env.PORT || 4000;
connectToDatabase();
const uploadDir = __dirname + "/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors({ origin: [`${process.env.frontUrl}`], credentials: true }));
app.use("/uploads", express.static("uploads"));

app.post("/api/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  let sampleFile = req.files.sampleFile;
  let uploadPath = __dirname + "/uploads/" + sampleFile.name;
  fs.writeFileSync(uploadPath, sampleFile.data);
  imgur.uploadFile(uploadPath).then((urlObject) => {
    fs.unlinkSync(uploadPath);
    return res.status(200).json({ link: urlObject.data.link });
  });
});

app.use("/api/events", eventsRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
