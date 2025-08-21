import { Router } from "express"; 
import { postCheckout } from "../controller/checkoutController";
const router = Router();

router.post("/checkout",postCheckout);

export default router;