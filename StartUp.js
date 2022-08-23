"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./infra/db"));
const ProductsController_1 = __importDefault(require("./controllers/ProductsController"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const CartController_1 = __importDefault(require("./controllers/CartController"));
const OrderController_1 = __importDefault(require("./controllers/OrderController"));
const cors = require('cors');
class StartUp {
    constructor() {
        this._db = new db_1.default();
        this.app = (0, express_1.default)();
        this._db.createConnection();
        this.routes();
    }
    routes() {
        let corsOptions = {
            "origin": "*",
            "Access-Control-Allow-Origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        };
        this.app.use(cors(corsOptions));
        /*
        * @description this routes is for serve products
        *
        * @params /:page/:qtd filter the results in limit quantity with pages
        * @param /:id search product for _id
        *
        *
        */
        this.app.route('/products/:page/:qtd').get((req, res) => {
            return ProductsController_1.default.get(req, res);
        });
        this.app.route('/products/:id').get((req, res) => {
            return ProductsController_1.default.getById(req, res);
        });
        // implements delete product method
        // implements put product method
        this.app.route('/products').get((req, res) => {
            return ProductsController_1.default.getAll(req, res);
        });
        /*
        * @description this routes is for serve users
        *
        * @params /:page/:qtd filter the results in limit quantity with pages
        * @param /:id search user for _id
        *
        *
        */
        this.app.route('/users/:page/:qtd').get((req, res) => {
            return UsersController_1.default.get(req, res);
        });
        this.app.route('/users/:id').get((req, res) => {
            return UsersController_1.default.getById(req, res);
        });
        // implements update method
        // implements delete method
        this.app.route('/users/:id').delete((req, res) => {
            return UsersController_1.default.deleteUser(req, res);
        });
        this.app.route('/users').get((req, res) => {
            return UsersController_1.default.getAll(req, res);
        });
        this.app.route('/users').put((req, res) => {
            return UsersController_1.default.userRegister(req, res);
        });
        /*
        * @description this routes is for serve the cart
        *
        * @params /:page/:qtd filter the results in limit quantity with pages
        * @param /:id search product cart for _id
        *
        *
        */
        this.app.route('/cart/:page/:qtd').get((req, res) => {
            return CartController_1.default.get(req, res);
        });
        this.app.route('/cart/:id').get((req, res) => {
            return CartController_1.default.getById(req, res);
        });
        // implements delete method
        this.app.route('/cart').get((req, res) => {
            return CartController_1.default.getAll(req, res);
        });
        /*
        * @description this routes is for serve the orders
        *
        * @params /:page/:qtd filter the results in limit quantity with pages
        * @param /:id search order for _id
        *
        *
        */
        this.app.route('/order/:page/:qtd').get((req, res) => {
            return OrderController_1.default.get(req, res);
        });
        this.app.route('/order/:id').get((req, res) => {
            return OrderController_1.default.getById(req, res);
        });
        // implements delete method
        this.app.route('/order').get((req, res) => {
            return OrderController_1.default.getAll(req, res);
        });
    }
}
exports.default = new StartUp();
