const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import Routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");

// App
const app = express();

// Connect Database
mongoose
	.connect(process.env.DATABASE_LOCAL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database Connected!");
	})
	.catch((err) => {
		console.error(err);
	});

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS
if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// Router middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
