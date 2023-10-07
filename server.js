const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;
const baseRoute = require("./routes/contactRoutes");
const userRoute = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
connectDB();

app.use(express.json()); // this middleware is used to accept the body of POST requests that clients send
app.use("/api/contact", baseRoute);
app.use("/api", userRoute);
app.use(errorHandler);

app.listen(port, console.log(`server listening to port ${port}`));
