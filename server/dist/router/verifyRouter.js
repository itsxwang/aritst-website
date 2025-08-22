"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyController_1 = require("../controller/verifyController");
const router = express_1.default.Router();
router.post("/verify/newsletter", verifyController_1.verifyNewsletter);
// if someone open valid page with random id, we are handling that
router.get("/verify/:id", verifyController_1.verifyId);
router.post("/verify/email", verifyController_1.verifyEmail);
exports.default = router;
