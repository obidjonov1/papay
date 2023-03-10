const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake");
const assert = require("assert");
const bcrypt = require("bcryptjs"); // passwordni shifrlash uchun
const { shapeIntoMongooseObjectid } = require("../lib/config");
const View = require("./View");

class Member {
  constructor() {
    // shartli ravishda kichkina harfda yozib oldik.
    this.memberModel = MemberModel;
  }
  // req.body kelyapti
  async signupData(input) {
    try {
      // passwordni shifrlash uchun ->
      const salt = await bcrypt.genSalt();
      input.mb_password = await bcrypt.hash(input.mb_password, salt);
      const new_member = new this.memberModel(input);

      let result;
      try {
        // databasega save qiladi
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }

      result.mb_password = "";
      // resultni tashqariga javob -> return qilganimiz uchun
      return result;
    } catch (err) {
      throw err;
    }
  }

  async loginData(input) {
    try {
      const member = await this.memberModel
        .findOne({ mb_nick: input.mb_nick }, { mb_nick: 1, mb_password: 1 })
        .exec();
      // agar member nick true bo'lsa ok, bo'lmasa Definer(ERROR) ->
      assert.ok(member, Definer.auth_err2);

      // bu yerda login bo'layotganda bcrypt inputdagi pswni databaseagi psw bilan o'zi solishtirib oladi.
      const isMatch = await bcrypt.compare(
        input.mb_password,
        member.mb_password
      );
      // agar member password true bo'lsa ok, bo'lmasa Definer(ERROR) ->
      assert.ok(isMatch, Definer.auth_err3);

      // bir hil password kirtgan bo'lsa, mb_nick m'lumotlarini olib orqaga qaytaradi -> [rstaurantController 74 qator]
      return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec();
    } catch (err) {
      throw err;
    }
  }

  async getChosenMemberData(member, id) {
    try {
      // ObjectId ni mongodbId ga o'zgartirish(kuchaytirish) ->
      id = shapeIntoMongooseObjectid(id);
      console.log("member:", member);

      // login bo'lmagan bo'lsa bu yerdan o'tib ketadi ->
      if (member) {
        // condition if not see before
        await this.viewChosenItemByMember(member, id, "member");
      }

      const result = await this.memberModel
        .aggregate([
          { $match: { _id: id, mb_status: "ACTIVE" } },
          // aggregate mbni hamma datasini olib beradi "$unset" mb_passwordni yashiradi ->
          { $unset: "mb_password" },
          // todo: Check auth member liked the chosen member
        ])
        .exec();

      assert.ok(result, Definer.general_err2);
      return result[0];
    } catch (err) {
      throw err;
    }
  }

  async viewChosenItemByMember(member, view_ref_id, group_type) {
    try {
      view_ref_id = shapeIntoMongooseObjectid(view_ref_id);
      const mb_id = shapeIntoMongooseObjectid(member._id);

      const view = new View(mb_id);
      // validation needed haqiqatda bor accauntmi "View.js[11]"
      const isValid = await view.validateChosenTarget(view_ref_id, group_type);
      assert.ok(isValid, Definer.general_err2);

      // logged user has seen target before (user bu productni ko'rganmi ? ->)
      const doesExist = await view.checkViewExistence(view_ref_id);
      console.log("doesExist:", doesExist);

      if (!doesExist) {
        // user bu productni ko'rgan bo'lsa o'tib ketadi
        const result = await view.insertMemberView(view_ref_id, group_type);
        assert.ok(result, Definer.general_err1);
      }
      // const result = await view.insertMemberView(view_ref_id, group_type);
      return true;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;
