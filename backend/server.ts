/* eslint-disable no-console */
import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/user.routes";
import linkRoutes from "./routes/link.routes";
import taskRoutes from "./routes/task.routes";
import colorRoutes from "./routes/color.routes";
import errorHandler from "./middleware/errorHandler";
import connectDB from "./config/connect";
import cors from "cors"; // Import the CORS middleware

// Load environment variables
// dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '.env') });

// // Read in port to spin up server
// let port: string;
// if (process.env.PORT) {
//   port = process.env.PORT;
// } else {
//   port = "80"; // Default to port 80
// }

// Read in port to spin up server
const port = process.env.PORT || "80";

// Instantiate express app and use built-in middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes middleware
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/colors", colorRoutes);

app.use(cors()); 
// app.use(cors({
//   origin: "https://csscolorsapi.com/api/colors", // Replace with your frontend's URL
//   methods: ["GET", "POST","PUT"], // Specify allowed HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
// }));
// app.use(
//   cors({
//     origin: "https://csscolorsapi.com/api/colors", // Replace with your allowed origin
//     methods: ["GET", "POST"], // Specify allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
//   })
// );


// Serve frontend
if (process.env.NODE_ENV === "production") {
  // Path for static assets (build)
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Serve index.html
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
}

// Custom error handler middleware ()
app.use(errorHandler);
//testing environment
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
//     console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('DB_URI:', process.env.DB_URI);
// console.log('DEV_DB_URI:', process.env.DEV_DB_URI);

    connectDB();
  });
}

export default app;
