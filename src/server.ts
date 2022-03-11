import cors from "cors";
import express from "express";

import "dotenv/config";

import { routes } from "./routes/routes";

const app = express();

const options: cors.CorsOptions = {
  origin: "*",
};

app.use(cors(options));

app.use("/supports", routes);

app.listen(3333, () => console.log("Server is running!"));
