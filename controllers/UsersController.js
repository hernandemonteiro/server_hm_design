"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersServices_1 = require("../services/UsersServices");
class UsersController {
    constructor() {
        this._service = new UsersServices_1.UsersService();
    }
    getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._service.getAll();
                response.status(200).json({ result });
            }
            catch (error) {
                response.status(500).json({ error: error.message || error.toString() });
                console.log(error);
            }
        });
    }
    getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params.id;
                let result = yield this._service.get(_id);
                response.status(200).json({ result });
            }
            catch (error) {
                response.status(500).json({ error: error.message || error.toString() });
            }
        });
    }
    userRegister(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = request.params.name;
                const email = request.params.email;
                const password = request.params.password;
                const type = request.params.type;
                let result = yield this._service.userRegister(name, email, password, type);
                response.status(200).json({ result });
            }
            catch (error) {
                response.status(500).json({ error: error.message || error.toString() });
            }
        });
    }
    updateUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = request.params.id;
                const name = request.params.name;
                const email = request.params.email;
                const password = request.params.password;
                let result = yield this._service.updateUser(id, name, email, password);
                response.status(200).json({ result });
            }
            catch (error) {
                response.status(500).json({ error: error.message || error.toString() });
            }
        });
    }
    deleteUser(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = request.params.id;
                let result = yield this._service.deleteUser(_id);
                response.status(200).json({ result });
            }
            catch (error) {
                response.status(500).json({ error: error.message || error.toString() });
            }
        });
    }
}
exports.default = new UsersController();