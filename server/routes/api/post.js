import express from 'express'

// Model 
import Post from '../../models/post'
import auth from '../../middleware/auth'

const router = express.Router()

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


