//Serverga image yuklash
const path = require("path");
const multer = require("multer");
const uuid = require("uuid");
const { randomBytes } = require("crypto");

/** MULTER IMAGE UPLOADER */
function getTargetImageStorage(address) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      console.log(file);
      // yuklanayotgan rasimni asl nomi va o'sha file farmatini olish uchun ->
      const extension = path.parse(file.originalname).ext;
      // nameni random qilib beradi
      const random_name = uuid.v4() + extension;
      cb(null, random_name);
    },
  });
}

// natija: multer object hosil qilish uchun 
const makeUploader = (address) => {
  const storage = getTargetImageStorage(address);
  return multer({ storage: storage });
};

module.exports = makeUploader;

/* const product_storage = multer.diskStorage({
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

module.exports.uploadProductImage = multer({ storage: product_storage }); */
