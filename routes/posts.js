const router = require("express").Router();
const Post = require("../models/Post");

//投稿を作成する
router.post("/", async  (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    } catch (err) {
        return res.status(500).json(err);
    }
})
//投稿を更新する
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userID === req.body.userID) {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿編集に成功しました。");
        } else {
            return res.status(403).json("あなたは他の人の投稿を編集できません。");
        }

    } catch (err) {
        return res.status(403).json(err);
    }
});
//投稿を削除
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userID === req.body.userID) {
            await post.deleteOne({});
            return res.status(200).json("投稿削除に成功しました。");
        } else {
            return res.status(403).json("あなたは他の人の投稿を削除できません。");
        }

    } catch (err) {
        return res.status(403).json(err);
    }
});
module.exports = router;