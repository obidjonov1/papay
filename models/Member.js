const MemberModel = require("../schema/member.model");
const Definer = require("../lib/mistake");
const assert = require("assert");

class Member {
  constructor() {
    // shartli ravishda kichkina harfda yozib oldik
    this.memberModel = MemberModel;
  }
  // req.body kelyapti
  async signupData(input) {
    try {
      const new_member = new this.memberModel(input);
      let result;
      try {
        result = await new_member.save();
      } catch (mongo_err) {
        console.log(mongo_err);
        throw new Error(Definer.auth_err1);
      }

      result.mb_password = "";
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

      const isMatch = input.mb_password === member.mb_password;
      // agar member password true bo'lsa ok, bo'lmasa Definer(ERROR) ->
      assert.ok(isMatch, Definer.auth_err3);

      return await this.memberModel.findOne({ mb_nick: input.mb_nick }).exec();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Member;