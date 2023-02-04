const assert = require("assert");
const Definer = require("../lib/mistake");
const Product = require("../models/Product");

let productController = module.exports;

productController.getAllproducts = async (req, res) => {
  try {
    console.log("GET: cont/getAllProduct");
  } catch (err) {
    console.log(`ERROR: cont/getAllProduct ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

productController.addNewProduct = async (req, res) => {
  try {
    console.log("POST: cont/addNewProduct");
    // fileni yuklaydi agar file yo'q bo'lsa error qaytaradi ->
    assert(req.files, Definer.general_err3);

    const product = new Product();
    let data = req.body;

    // req.filesga yuklangan fileni array qilib databasega yozish ->
    data.product_images = req.files.map((ele) => {
      return ele.path;
    });

    const result = await product.addNewProductData(data, req.member);

    const html = `<script>
                    alert(new dush added successfully);
                    window.location.replace('/resto/products/menu');
                  </script>`;
    res.end(html);
  } catch (err) {
    console.log(`ERROR: cont/addNewProduct ${err.message}`);
  }
};

productController.updateChosenProduct = async (req, res) => {
  try {
    console.log("POST: cont/updateChosenProduct");
  } catch (err) {
    console.log(`ERROR: cont/updateChosenProduct ${err.message}`);
  }
};
