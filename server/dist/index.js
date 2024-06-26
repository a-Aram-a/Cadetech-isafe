"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const PORT = config_1.default.PORT;
app.get('/', (req, res) => {
    res.send('Hello, this is Express + TypeScript');
});
app.listen(PORT, () => {
    console.log(`[Server]: Running at ${PORT} port`);
});
