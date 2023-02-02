const path = require("path");
const multer = require("multer");
const uuid = require("uuid");
const { randomBytes } = require("crypto");

const product_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    console.log(file);
    // yuklanayotgan rasimni asl nomi va o'sha file farmatini olish uchun ->
    const extension = path.parse(file.originalname).ext;
    const random_name = uuid.v4() + extension;
    cb(null, random_name);
  },
});

module.exports.uploadProductImage = multer({ storage: product_storage });
