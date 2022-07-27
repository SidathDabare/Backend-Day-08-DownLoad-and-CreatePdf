/** @format */

import express from "express"
import multer from "multer"
//import { extname } from "path"
//import { saveProducts } from "../../lib/fs-tools.js"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary, // this searches in your process.env for something called CLOUDINARY_URL which contains your cloudinary api key and secret
    params: {
      folder: "productsImages",
    },
  }),
  limits: { fileSize: 1024 * 1024 },
}).single("image")

const filesRouter = express.Router()

// filesRouter.post(
//   "/products/:id",
//   multer({ limits: { fileSize: 1024 * 1024 } }).single("image"),
//   async (req, res, next) => {
//     // "avatar" needs to match precisely the name of the field appended in the FormData object coming from the FE. Otherwise multer is not going to find that file
//     try {
//       console.log("FILE: ", req.file)
//       const authorId = req.params.id
//       console.log("ProductId: ", authorId)
//       // find user by userId (3kg6a8l5s06609) in users.json

//       // save the file as /public/img/users/3kg6a8l5s06609.gif
//       // update that user by adding the path to the image, like "avatar": "/public/img/users/3kg6a8l5s06609.gif" to give the FE the possibility to display the image later on in an <img src="http://localhost:3001/public/img/users/3kg6a8l5s06609.gif" />
//       const fileName = authorId + extname(req.file.originalname)
//       await saveProducts(fileName, req.file.buffer)
//       res.send("UPLOADED")
//     } catch (error) {
//       next(error)
//     }
//   }
// )
filesRouter.post("/cloudinary", cloudinaryUploader, async (req, res, next) => {
  try {
    console.log("REQ FILE: ", req.file)

    // 1. upload on Cloudinary happens automatically
    // 2. req.file contains the path which is the url where to find that picture
    // 3. update the resource by adding the path to it
    res.send("UPLOADED")
  } catch (error) {
    next(error)
  }
})
// filesRouter.post(
//   "/uploadCover/:id",
//   multer({ limits: { fileSize: 1024 * 1024 } }).single("cover"),
//   async (req, res, next) => {
//     // "avatar" needs to match precisely the name of the field appended in the FormData object coming from the FE. Otherwise multer is not going to find that file
//     try {
//       console.log("FILE: ", req.file)
//       const authorId = req.params.id
//       console.log("AuthorId: ", authorId)
//       // find user by userId (3kg6a8l5s06609) in users.json

//       // save the file as /public/img/users/3kg6a8l5s06609.gif
//       // update that user by adding the path to the image, like "avatar": "/public/img/users/3kg6a8l5s06609.gif" to give the FE the possibility to display the image later on in an <img src="http://localhost:3001/public/img/users/3kg6a8l5s06609.gif" />
//       const fileName = authorId + extname(req.file.originalname)
//       await saveBlogPosts(fileName, req.file.buffer)
//       res.send("UPLOADED")
//     } catch (error) {
//       next(error)
//     }
//   }
// )

// filesRouter.post(
//   "/multiple",
//   multer().array("avatars"),
//   async (req, res, next) => {
//     try {
//       console.log("FILES: ", req.files)
//       const arrayOfPromises = req.files.map((file) =>
//         saveUsersAvatars(file.originalname, file.buffer)
//       )
//       await Promise.all(arrayOfPromises)
//       res.send("UPLOADED")
//     } catch (error) {
//       next(error)
//     }
//   }
// )

export default filesRouter
