import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

//Buy subscriptions

router.route("/subscribe").get(isAuthenticated, buySubscription);

//Payment verification
router.route("/paymentverification").post(paymentVerification);

//Get razorpay key
router.route("/razorpaykey").get(getRazorPayKey);

//cancel subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
