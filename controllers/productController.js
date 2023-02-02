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
    // Product creation develop
    res.send("ok");
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
