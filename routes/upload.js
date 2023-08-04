const router = require('express').Router();
const multer = require('multer'); // この方法はローカルサーバーに画像を保存する。MongoDB に保存する方法もある

const upload = multer();
//画像アップロード用API
router.post('/', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('画像アップロードに成功しました！');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
