import express from 'express'

// Model 
import Post from '../../models/post'
import User from '../../models/user'
import Category from '../../models/category'
import auth from '../../middleware/auth'
import moment from "moment";

const router = express.Router()

import multer from 'multer'
import multerS3 from 'multer-s3' // aws s3 전용 library
import path from 'path' 
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY
})

const uploadS3 = multer({
    storage: multerS3({
        s3,
        bucket: "kyumoon2021/upload",
        region: "ap-northeast-2",
        key(req, file, cb) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext)
            cb(null, basename + new Date().valueOf() + ext)
        }
    }),
    limits: {fileSize: 1000 * 1024 * 1024}, //파일 용량
})

// @ ROUTE  api/post/image
// @ desc   CREATEE a post
// @ access Private

router.post("/image", uploadS3.array("upload",5), async(req, res, next) => {
    try {
        console.log(req.files.map((v) => v.location))
        res.json({uploaded: true, url: req.files.map((v) => v.location)})
    } catch (e) {
        console.error(e)
        res.json({uploaded: false, url:null})
    }
})



// api/post
router.get('/', async(req, res) => {
    const postFindResult = await Post.find()
    console.log(postFindResult, "post 다찾았당")
    res.json(postFindResult)
})

// @route   POST api/post
// @desc    Create a Post
// @ access Private

router.post('/', auth, uploadS3.none(), async(req, res, next) => {
    try {
        console.log(req, "req")
        const {title, contents, fileUrl, creator, category} = req.body
        //req.body.title => 넘 길음
        const newPost = await Post.create({
            title, contents, fileUrl, creator: req.user.id, date:moment().format("YYYY-MM-DD hh:mm:ss")
        });

        const findResult = await Category.findOne({
            categoryName: category
        })

        console.log(findResult, "Find Result!")

        if(findResult === null || findResult === undefined) {
            const newCategory = await Category.create({
                categoryName: category
            })
            await Post.findByIdAndUpdate(newPost._id,{
                $push: {category: newCategory._id}
            })
            await Category.findByIdAndUpdate(newCategory._id, {
                $push: {posts: newPost._id}
            })
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    posts: newPost._id
                }
            })
            return res.redirect(`/api/post/${newPost._id}`)
        } else {
            await Category.findByIdAndUpdate(findResult._id, {
                $push: {posts:newPost._id}
            })
            await Post.findByIdAndUpdate(newPost._id, {
                category: findResult._id
            })
            await User.findByIdAndUpdate(req.user.id, {
                $push: {
                    posts: newPost._id
                }
            })
            
        }
        return res.redirect(`/api/post/${newPost._id}`)

    } catch(e) {
        console.log(e)
    }
});

// @route   POST api/post/:id
// @desc    Detail Post
// @access  Public

router.get("/:id", async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" });
      res.json(post);
    } catch(e) {
        console.error(e)
        next(e)
    }
})

export default router


