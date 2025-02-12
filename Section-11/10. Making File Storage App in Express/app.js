import express from "express";
import cors from "cors";
import directoryRoutes from "./Routes/directoryRoutes.js"
import fileRoutes from './Routes/fileRoutes.js'


const app = express();

app.use(express.json());
app.use(cors());

app.use("/directory", directoryRoutes)
app.use("/file", fileRoutes)



app.listen(4000, () => {
  console.log(`Server Started`);
});
