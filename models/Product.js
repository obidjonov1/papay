const assert = require("assert");
const { shapeIntoMongooseObjectid } = require("../lib/config");
const Definer = require("../lib/mistake");
const ProductModel = require("../schema/product.model");
const Member = require("./Member");

class Product {
  constructor() {
    this.productModel = ProductModel;
  }

  async getAllProductsData(member, data) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectid(member?._id);

      let match = { product_status: "PROCESS" };
      if (data.restaurant_mb_id) {
        match["restaurant_mb_id"] = shapeIntoMongooseObjectid(
          data.restaurant_mb_id
        );
        match["product_collection"] = data.product_collection;
      }

      const sort =
        data.order === "product_price"
          ? { [data.order]: 1 }
          : { [data.order]: -1 }; //dynamic value

      const result = await this.productModel
        .aggregate([
          { $match: match },
          { $sort: sort },
          { $skip: (data.page * 1 - 1) * data.limit },
          { $limit: data.limit * 1 },
          // todo: Check auth member product likes
        ])
        .exec();

      // console.log("result:", result);

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getChosenProductData(member, id) {
    try {
      const auth_mb_id = shapeIntoMongooseObjectid(member?._id);
      id = shapeIntoMongooseObjectid(id);

      // login bo'lmagan bo'lsa bu yerdan o'tib ketadi -->
      // 1ta productni viewlarni '1+view' qilish ->
      if (member) {
        const member_obj = new Member();
        await member_obj.viewChosenItemByMember(member, id, "product");
      }

      const result = await this.productModel
        // productlarning statusi "PROCESS" bo'lsa shularni olib ber ->
        .aggregate([
          { $match: { _id: id, product_status: "PROCESS" } },
          // todo: Check auth member product likes
        ])
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getAllProductsDataResto(member) {
    try {
      // login bo'lgan memberning idsi orqali productModuldan -> [16] ->
      member._id = shapeIntoMongooseObjectid(member._id);
      const result = await this.productModel.find({
        // restaurant_mb_id = member._id bo'lgan hammasini topib beradi -> [20]
        restaurant_mb_id: member._id,
      });
      assert.ok(result, Definer.general_err1);
      // [17]-> va ularni qaytarib beradi
      return result; // restaurantController [21] ga pass qilib beradi
    } catch (err) {
      throw err;
    }
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
