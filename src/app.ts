import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/config";
import userRouter from "./routes/usuario.routes";
import asociacionRouter from "./routes/asociacion.routes";
import adminRoutes from "./routes/admin.routes";
import miembrosRouter from "./routes/miembros.routes";

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/usuario", userRouter);
app.use("/api/asociacion", asociacionRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/miembro", miembrosRouter);

export default app;
