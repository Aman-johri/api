const router = require("express").Router();
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE POST
router.put("/:id", async (req, res) => {
    try{
        const updatedPost = await Post.updateOne({_id: req.params.id}, {
            $set: {
                title: req.body.title,
                desc: req.body.desc,
                categories: req.body.categories,
                img: req.body.img,
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

// //Get post by id
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.find({_id: req.params.id});
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Get all posts
router.get("/", async (req, res) => {
    try {
      const posts = await Post.find().sort({_id: -1});
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;