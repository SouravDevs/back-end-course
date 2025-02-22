import express from "express";
import multer from "multer";
import path from "path";
import cors from 'cors'

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

app.use(cors())

const PORT = 4000;

// For Single File Upload
// app.post("/upload", upload.single("profilePic"), (req, res) => {

//     console.log(req.body.username);
//     console.log(req.body.age);
//     console.log(req.file);

//     res.json({ message: req.file });
// });

// For Multi File Upload
app.post(
  "/upload",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "profilePic2", maxCount: 1 },
    { name: "profilePic3", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.body.username);
    console.log(req.body.age);
    console.log(req.files);

    console.log(req.body);
    res.json({ message: req.files });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
