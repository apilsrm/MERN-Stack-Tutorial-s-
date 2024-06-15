import express from "express";
import { PORT } from "./config.js";
import cors from "cors";

import dotenv from "dotenv";
import mongoose from "mongoose";

// import Book from "./models/bookModel.js";
import bookRoute from "./routes/bookRoutes.js"

const app = express();
dotenv.config();

//middlewres for parsing request body
app.use(express.json());

//middlewares for cors
//allow all rogins with default od cors(*)
// app.use(cors());
//option2  allow custom origins
app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);


app.get("/", (req, res) => {
  //    console.log("Request is ", req)
  return res.status(304).send("Welcome to Mern stack  Running well");
});

//routes
app.use("/books", bookRoute);

// Connect db  and connect to  express app
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database is connected to app");
    app.listen(PORT, () => {
      console.log(
        `ServerApp is listening to port: ${PORT} and running at http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
