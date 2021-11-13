/** @format */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// const academicyearRouter = require("./routes/academicyear");
const classRouter = require("./routes/class");
const courseRouter = require("./routes/course");
// const lessonRouter = require("/routes/lesson");
// const logbookRouter = require("/routes/logbook");
const schoolRouter = require("./routes/school");
const studentRouter = require("./routes/student");
// const teacherRouter = require("./routes/teahcer");
// const timetableRouter = require("./routes/timetable");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hbe2k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
// app.use("/api/course", courseRouter);
// app.use("/api/academicyear", academicyearRouter);
app.use("/api/school", schoolRouter);
app.use("/api/student", studentRouter);
app.use("/api/posts", postRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
