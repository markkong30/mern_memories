import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@memories.rhhbrmk.mongodb.net/?retryWrites=true&w=majority`;
// const mongoURL =
// 	"mongodb+srv://admin:jk342jk342@memories.rhhbrmk.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
	.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => console.log(err));

// mongoose.set("useFindAndModify", false);