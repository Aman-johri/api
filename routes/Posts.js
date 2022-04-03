const router = require("express").Router();
const Post = require("../models/Post");

//CREATE POST
router.post("/", (req, res) => {
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc,
        categories: req.body.categories,
    });
    post.save().then((data) => {
        res.send(data);
    });
});


//UPDATE POST
router.put("/:id", async (req, res) => {
    try{
        const updatedPost = await Post.updateOne({_id: req.params.id}, {
            $set: {
                title: req.body.title,
                desc: req.body.desc,
                categories: req.body.categories,
            }
        });
        res.send(updatedPost);
    }catch(err){
        res.send(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try{
        const deletedPost = await Post.deleteOne({_id: req.params.id});
        res.status(200).json(deletedPost);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Get post by id
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.find({_id: req.params.id});
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Get post by category
router.get("/", async (req, res) => {
    const category = req.query.category;
    try{
        if(category){
            const posts = await Post.find({categories: category});
            res.status(200).json(posts);
        }
        else{
            const posts = await Post.find();
            res.status(200).json(posts);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;