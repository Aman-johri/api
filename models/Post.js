const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required:true,
    },
    categories:{
        type: String,
        required: false,
    },
    username:{
        type: String,
        required: false,
    },
    img:{
        type: String,
        required: false,
    },
    userID:{
        type: String,
        required: true,
    }

},
    { timestamps: true}
);

module.exports = mongoose.model("Post",PostSchema);