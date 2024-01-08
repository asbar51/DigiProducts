import express from "express";
import { getOrders,addToCart, createPost, deletePost, getFromCart, getPost, getPosts, order, removeFromCart, updatePost, getStore } from "../controllers/post.js";
import { tokenChecker } from "../middlewares/tokenChecker.js";
import uploadFile from "../middlewares/uploadConf.js";
import { captureOrder, createOrder } from "../controllers/PaimentPaypal.js";

// __ router

const router = express.Router()

router.get('/', getPosts)
router.get('/store/:username',tokenChecker, getStore)
router.get('/get_from_cart',tokenChecker, getFromCart)
router.get('/get_orders',tokenChecker, getOrders)
router.post('/order/:id',tokenChecker, order)
router.post('/add_to_cart/:id',tokenChecker, addToCart)
router.delete('/cart/:id', tokenChecker, removeFromCart);
router.post('/', tokenChecker, uploadFile, createPost);  // Change the order of middlewares
router.route("/:id")
.get(getPost)
.put(tokenChecker, uploadFile, updatePost)
.delete(tokenChecker, deletePost)

// Paypal payment
router.post("/api/orders", async (req, res) => {
    try {
      // use the cart information passed from the front-end to calculate the order amount detals
      const { cart } = req.body;
      const { jsonResponse, httpStatusCode } = await createOrder(cart);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
});

router.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
      console.log("Paiment successfull for id: ",orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
});


export default router
