import express from "express";
import { addToCart, createPost, deletePost, getFromCart, getMyProducts, getPost, getPosts, removeFromCart, updatePost } from "../controllers/post.js";
import { tokenChecker } from "../middlewares/tokenChecker.js";
import uploadFile from "../middlewares/uploadConf.js";


const router = express.Router()

router.get('/', getPosts)
router.get('/my_products',tokenChecker, getMyProducts)
router.get('/get_from_cart',tokenChecker, getFromCart)
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
