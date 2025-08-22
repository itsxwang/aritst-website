"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkoutController_1 = require("../controller/checkoutController");
const router = (0, express_1.Router)();
router.post("/checkout", checkoutController_1.postCheckout);
exports.default = router;
