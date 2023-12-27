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

export const getPost = async (req,res) => {
    const id = req.params.id
    postMessages.findById(id)
    .then(showPost =>res.status(200).json(showPost))
    // console.log(showPosts)
    .catch ((error) => res.status(404).json({dsf: error.message}))
}

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
    console.log('id :', id);
    const formBody = req.body;
    console.log('body :', formBody);
    console.log('File uploaded:', req.file);
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
