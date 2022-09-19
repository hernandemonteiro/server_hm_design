import express, { Application, Request, Response } from "express";
import Database from "./infra/db";
import userRouter from "./router/UserRouter";
import productsRouter from "./router/ProductsRouter";
import cartRouter from "./router/CartRouter";
import orderRouter from "./router/OrderRouter";
import categoryRouter from "./router/CategoryRouter";
import forgotPasswordRouter from "./router/ForgotPasswordRouter";
import CryptoJS from "crypto-js";

const cors = require("cors");

class StartUp {
  public app: Application;
  private _db: Database = new Database();
  constructor() {
    this.app = express();
    this._db.createConnection();
    this.routes();
  }

  routes() {
    // this.app.use(express.json());
    // this.app.use("*", function (req, res, next) {
    //   const Authenticate = req.headers;
    //   var iv = CryptoJS.enc.Base64.parse(process.env.HASH_SECRET);
    //   const secret = CryptoJS.SHA256(process.env.HASH_SECRET);
    //   const tokenDecrypted = CryptoJS.AES.decrypt(Authenticate, secret, {
    //     iv: iv,
    //     mode: CryptoJS.mode.CBC,
    //     padding: CryptoJS.pad.Pkcs7,
    //   }).toString(CryptoJS.enc.Utf8);
    //   console.log(Authenticate)
    //   if (tokenDecrypted === process.env.HASH_SECRET) {
    //     next();
    //   } else {
    //     var err = new Error("You are not authenticated!");
    //     res.setHeader("WWW-Authenticate", "Basic");
    //     return next(err);
    //   }
    // });
    this.app.use(
      cors({
        origin: [process.env.ORIGIN, "https://hm-design.vercel.app"],
      })
    );
    this.app.use("/", userRouter);
    this.app.use("/", productsRouter);
    this.app.use("/", cartRouter);
    this.app.use("/", orderRouter);
    this.app.use("/", categoryRouter);
    this.app.use("/", forgotPasswordRouter);
  }
}

export default new StartUp();
