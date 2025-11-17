import express from 'express';
import { verifyEmail, verifyNewsletter,verifyId } from '../controller/verifyController';
const router = express.Router();



router.post("/newsletter", verifyNewsletter)
// if someone open valid page with random id, we are handling that
router.get("/:id", verifyId)
router.post("/email", verifyEmail)


export default router;