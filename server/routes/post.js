import express from "express";
import { getOrders,addToCart, createPost, deletePost, getFromCart, getPost, getPosts, order, removeFromCart, updatePost, getStore } from "../controllers/post.js";
import { tokenChecker } from "../middlewares/tokenChecker.js";
import uploadFile from "../middlewares/uploadConf.js";


const router = express.Router()

router.get('/', getPosts)
router.get('/store/:username',tokenChecker, getStore)
router.get('/get_from_cart',tokenChecker, getFromCart)
router.get('/get_orders',tokenChecker, getOrders)
router.post('/order/:id',tokenChecker, order)
router.post('/add_to_cart/:id',tokenChecker, addToCart)
router.delete('/cart/:id', tokenChecker, removeFromCart);
router.post('/', tokenChecker, uploadFile, createPost);  // Change the order of middlewares
// router.get('/:id', getPost)
// router.put('/:id', tokenChecker, uploadFile, updatePost)
// router.delete('/:id', tokenChecker, deletePost)
router.route("/:id")
.get(getPost)
.put(tokenChecker, uploadFile, updatePost)
.delete(tokenChecker, deletePost)

export default router
