import express from 'express'

// Model 
import Post from '../../models/post'
import auth from '../../middleware/auth'

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


router.post('/', auth, async(req, res, next) => {
    try {
        console.log(req, "req")
        const {title, contents, fileUrl, creator} = req.body
        //req.body.tile => 넘 길음
        const newPost = await Post.create({
            title, contents, fileUrl, creator
        });
        res.json(newPost)
    } catch(e) {
        console.log(e)
    }
});

export default router


