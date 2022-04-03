const router = require("express").Router();
const Category = require("../models/Category");

//CREATE CATEGORY
router.post("/", (req, res) => {
    const category = new Category({
        name: req.body.name,
    });
    category.save().then(() => {
        res.send(category);
    });
});

// Get category
router.get("/", async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

