const express = require("express");

const {
  createOrder,
  createOrderWithPaypal,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/createNewOrder", createOrder);
router.post("/createpaypal", createOrderWithPaypal);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;
