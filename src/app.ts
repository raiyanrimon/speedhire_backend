import express, { Application } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use("/api/", router);

// app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
