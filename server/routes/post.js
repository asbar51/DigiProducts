import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js";
import { tokenChecker } from "../middlewares/tokenChecker.js";
import uploadFile from "../middlewares/uploadConf.js";


const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', tokenChecker, uploadFile, createPost);  // Change the order of middlewares
router.put('/:id', tokenChecker, uploadFile, updatePost)
router.delete('/:id', tokenChecker, deletePost)

export default router
