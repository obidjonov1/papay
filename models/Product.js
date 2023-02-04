const assert = require("assert");
const { shapeIntoMongooseObjectid } = require("../lib/config");
const Definer = require("../lib/mistake");
const ProductModel = require("../schema/product.model");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }
  async addNewProductData(data, member) {
    try {
      data.restaurant_mb_id = shapeIntoMongooseObjectid(member._id);

      const new_product = this.productModel(data);
      const result = await new_product.save();

      assert.ok(result, Definer.product_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
