"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../controller/emailController");
const router = (0, express_1.Router)();
router.post("/send-email", emailController_1.sendEmail);
exports.default = router;
