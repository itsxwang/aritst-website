import express from 'express';
import { verifyEmail, verifyNewsletter,verifyId } from '../controller/verifyController';
const router = express.Router();



router.post("/verify/newsletter", verifyNewsletter)
// if someone open valid page with random id, we are handling that
router.get("/verify/:id", verifyId)
router.post("/verify/email", verifyEmail)
export default router;