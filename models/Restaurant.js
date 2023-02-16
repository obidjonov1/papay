const assert = require("assert");
const { model } = require("mongoose");
const { shapeIntoMongooseObjectid } = require("../lib/config");
const Definer = require("../lib/mistake");
const MemberModel = require("../schema/member.model");

class Restaurant {
  constructor() {
    this.memberModel = MemberModel;
  }

  async getAllRestaurantsData() {
    try {
      let result = await this.memberModel
        .find({
          mb_type: "RESTAURANT",
        })
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async updateRestaurantByAdminData(update_data) {
    try {
      const id = shapeIntoMongooseObjectid(update_data?.id);
      const result = await this.memberModel
        .findByIdAndUpdate(
          { _id: id },
          update_data,
          // update bo'lgan qiymatni qaytaradi
          { runValidators: true, lean: true, returnDocument: "after" }
        )
        .exec();

      assert.ok(result, Definer.general_err1);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Restaurant;
