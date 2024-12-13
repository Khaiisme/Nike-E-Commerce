const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const Address = require("../../models/Address");

////////////////////////////////////////////////////////////////////

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      addressId,
      paymentMethod, // This will be "COD"
      totalAmount,
    } = req.body;

    // Validate input data
    if (
      !userId ||
      !cartId ||
      !addressId ||
      !paymentMethod ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Fetch the cart and address details from the database
    const cart = await Cart.findById(cartId).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const address = await Address.findById(addressId); // Assuming there's an Address model
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Create an order object based on the cart and address details
    const orderData = {
      userId,
      cartId,
      cartItems: cart.items.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        image: item.productId.image,
        price: item.productId.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: address._id,
        address: address.address,
        city: address.city,
        pincode: address.pincode,
        phone: address.phone,
        notes: address.notes,
      },
      orderStatus: "pending", 
      paymentMethod, // "COD"
      paymentStatus: "pending", 
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    // Create a new order in the database
    const newOrder = new Order(orderData);
    await newOrder.save();

    // Optionally, delete the cart if it's a one-time purchase
    await Cart.findByIdAndDelete(cartId);

    // Send the response back with the created order details
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order",
    });
  }
};
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
