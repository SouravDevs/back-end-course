import express from "express";
import multer from "multer";

import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const id = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    const customFileName = `${id}${extension}`;

    file.id = id;

    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const app = express();
const PORT = 4000;

app.post(
  "/upload",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "profilePic2", maxCount: 1 },
  ]),
  (req, res) => {
    res.send({ message: req.files });
  }
);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
