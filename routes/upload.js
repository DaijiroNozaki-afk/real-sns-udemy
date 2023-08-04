const router = require('express').Router();
const multer = require('multer'); // この方法はローカルサーバーに画像を保存する。MongoDB に保存する方法もある

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
//画像アップロード用API
router.post('/', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('画像アップロードに成功しました！');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
