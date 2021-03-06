import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import "./passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const cookieStore = MongoStore(session);

app.use(helmet({ contentSecurityPolicy: false }));
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.KEY,
    resave: true,
    saveUninitialized: false,
    store: new cookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static(__dirname + "/../assets"));
app.use("/", globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
