import postMessages from "../models/post.js"
import profiles from "../models/profile.js";
import Image from "../models/Image.js";
import FileContent from "../models/FileContent.js"
// import path from 'path'
// File: deletePost.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from 'path';


export const getPosts = async (req,res) => {
    postMessages.find() 
    .then(showPosts =>res.status(200).json(showPosts))
    // console.log(showPosts)
    .catch ((error) => res.status(404).json({message: error.message}))
}
export const getStore = async (req,res) => {
  const MyProducts = []
  const username = req.params.username
  console.log("uuu",username);
  const userFound = await profiles.findOne({ username: username })
  postMessages.find({instructor:username}) 
  .then(showPosts =>{
    // console.log("showPosts: ",showPosts);
    console.log("avatar:",userFound?.profilePicture);
    res.status(200).json({AllPosts:showPosts,avatar:userFound?.profilePicture})
  })
  // console.log(showPosts)
  .catch ((error) => res.status(404).json({message: error.message}))
}

export const getPost = async (req,res) => {
    const id = req.params.id
    postMessages.findById(id)
    .then(async (showPost) => {
      
      const userFound = await profiles.findOne({ username: showPost.instructor })
      res.status(200).json({Post:showPost,avatar:userFound?.profilePicture})
    })
    // console.log(showPosts)
    .catch ((error) => res.status(404).json({dsf: error.message}))
}

export const order = async (req,res) => {
  const id = req.params.id
  console.log('id',id);
  await profiles.findOneAndUpdate({username: req.user.username},{$push:{orders:id}})
  .then(showPost =>{
    // console.log(showPost)
    res.status(200).json("ordered")
  })
  // console.log(showPosts)
  .catch ((error) => res.status(404).json({dsf: error.message}))
}

export const addToCart = async (req,res) => {
  const id = req.params.id
  console.log('id',id);
  await profiles.findOneAndUpdate({username: req.user.username},{$push:{addToCart:id}})
  .then(showPost =>{
    // console.log(showPost)
    res.status(200).json("added")
  })
  // console.log(showPosts)
  .catch ((error) => res.status(404).json({dsf: error.message}))
}

export const getFromCart = async (req, res) => {
  try {
    const theProfile = await profiles.findOne({ username: req.user.username });

    if (theProfile?.addToCart.length > 0) {
      const myCart = [];

      // Using Promise.all to wait for all asynchronous operations to complete
      await Promise.all(
        theProfile.addToCart.map((idProduct) =>
          postMessages.findById(idProduct).then((product) => {
            myCart.push(product);
          }).catch((error) => {
            console.error(`Error fetching product with id ${idProduct}: ${error.message}`);
          })
        )
      );

      // console.log("Products in the cart is sended successfully");
      res.status(200).json(myCart);
    } else {
      console.log("MyCart is empty");
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const theProfile = await profiles.findOne({ username: req.user.username });

    if (theProfile?.orders.length > 0) {
      const myOrders = [];

      // Using Promise.all to wait for all asynchronous operations to complete
      await Promise.all(
        theProfile.orders.map((idProduct) =>
          postMessages.findById(idProduct).then((product) => {
            myOrders.push(product);
          }).catch((error) => {
            console.error(`Error fetching product with id ${idProduct}: ${error.message}`);
          })
        )
      );

      // console.log("Products in the cart is sended successfully");
      res.status(200).json(myOrders);
    } else {
      console.log("orders is empty");
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const username = req.user.username;

    // Find the user profile
    const theProfile = await profiles.findOne({ username });

    if (!theProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    // Check if the product is in the user's cart
    const productIndex = theProfile.addToCart.indexOf(productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Remove the product from the addToCart array
    theProfile.addToCart.splice(productIndex, 1);

    // Save the updated user profile
    await theProfile.save();

    console.log("Product removed from the cart successfully");
    res.status(200).json({ message: "Product removed from the cart successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const createPost = async (req,res) => {
    const formBody = req.body;
    const filePath = req.file.path;
    const fileName = req.file.filename;
    // console.log('File uploaded:', req.file);
    // console.log('body :', formBody);

    // Save image details to the database
    const image = new Image({
      filename: req.file.filename,
      path: filePath,
    });
    await image.save();

    const usernameProfile = req.user
    const user = await profiles.findOne({
        username: usernameProfile.username
    })

    formBody.instructor = user.username
    formBody.thumbnail = fileName
    const newPost = new postMessages(formBody)
    try {
        await newPost.save() 
        console.log("post of ",usernameProfile.username," is created");
        res.status(201).json({newPost})
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error.message})
    }
}


export const updatePost = async (req,res) => {
    const id = req.params.id
    // console.log('id :', id);
    const formBody = req.body;
    // console.log('body :', formBody);
    // console.log('File uploaded:', req.file);
    const filePath = (req?.file?.path) ?req.file.path: null;
    const fileName = (req?.file?.filename) ?req.file.filename: null;
    

    const theCourse = await postMessages.findOne({
        _id : id
    })

    // Save image details to the database
    if (filePath != null) {
      const imagePath = path.join(__dirname, '../uploads/images', theCourse.thumbnail);
      await fs.unlink(imagePath);

      formBody.thumbnail = fileName

      const image = new Image({
        filename: req.file.filename,
        path: filePath,
      });
      await image.save();
    }
    // console.log("course instructor id : ",theCourse.instructor.toString());
    
    const usernameProfile = req.user
    const user = await profiles.findOne({
        username: usernameProfile.username
    })
    // console.log("user id: ",user._id.toString());
    if (user.username == theCourse.instructor) {
        // console.log("equal")
        postMessages.findByIdAndUpdate({_id:id}, formBody).then(post => {
            console.log("post of ",usernameProfile.username," is updated");
            res.json(post)
        })
        .catch(err => res.json(err))
    } else {
        // res.json("not allowed")
        res.status(404).json({error:'not allowed'})
    }
}


export const deletePost = async (req, res) => {
  const id = req.params.id;
  const theCourse = await postMessages.findOne({
    _id: id
  });

  const usernameProfile = req.user;
  const user = await profiles.findOne({
    username: usernameProfile.username
  });

  if (user.username === theCourse.instructor) {
    try {
      // Delete the post
      const deletedPost = await postMessages.findByIdAndDelete({ _id: id });
      console.log("Post of", usernameProfile.username, "is deleted");

      // Delete the associated image
      const deletedImage = await Image.findOneAndDelete({ filename: theCourse.thumbnail });
      console.log("Image of", usernameProfile.username, "is deleted");

      // Delete the associated image file from the "uploads" directory
      const imagePath = path.join(__dirname, '../uploads/images', theCourse.thumbnail);
      await fs.unlink(imagePath);
      console.log("Image file of", usernameProfile.username, "is deleted from uploads directory");

      res.status(200).json({ deletedPost, deletedImage });
    } catch (error) {
      console.error('Error deleting post, image, and image file:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(403).json({ success: false, error: 'Permission Denied' });
  }
};
