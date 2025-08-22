"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const artworkRouter_1 = __importDefault(require("./router/artworkRouter"));
const emailRouter_1 = __importDefault(require("./router/emailRouter"));
const verifyRouter_1 = __importDefault(require("./router/verifyRouter"));
const checkoutRouter_1 = __importDefault(require("./router/checkoutRouter"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../../.env') // go up one directory
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.BACKEND_PORT;
app.use(artworkRouter_1.default);
app.use(emailRouter_1.default);
app.use(checkoutRouter_1.default);
app.use(verifyRouter_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port http://localhost:" + PORT);
    });
})
    .catch((err) => {
    console.log("Database connection failed", err);
    console.log(process.env.DB_PATH);
});
