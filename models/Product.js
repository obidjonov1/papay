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

  async updateChosenProductData(id, updated_data, mb_id) {
    try {
      id = shapeIntoMongooseObjectid(id);
      mb_id = shapeIntoMongooseObjectid(mb_id);

      const result = await this.productModel
        .findOneAndUpdate(
          // qaysi objectni update qilinyapti ->
          { _id: id, restaurant_mb_id: mb_id },
          updated_data,
          // o'zgargan datani yuboradi ->
          {
            runValidators: true,
            lean: true,
            returnDocument: "after",
          }
        )
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Product;
