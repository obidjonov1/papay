const mongoose = require("mongoose");
const { member_type_enums } = require("../lib/config");

const memberSchema = new mongoose.Schema({
  mb_nick: {
    type: String,
    required: true,
    // memeber agar bor nickni tanlamoqchi bo'lsa error qaytaradi
    index: { unique: true, sparse: true },
  },
  mb_phone: {
    type: String,
    required: true,
  },
  mb_password: {
    type: String,
    required: true,
    // default holatda qaytarmasligi uchun
    select: false,
  },
  mb_type: {
    type: String,
    required: false,
    default: "USER",
    enum: {
      values: member_type_enums,
      message: "{VALUE} is not among permitted values",
    },
  },
  mb_status: {
    type: String,
    required: false,
    default: "ACTIVE",
    enum: {
      values: member_type_enums,
      message: "{VALUE} is not among permitted values",
    },
  },
  mb_full_name: {
    type: String,
    required: false,
  },
  mb_address: {
    type: String,
    required: false,
  },
  mb_image: {
    type: String,
    required: false,
  },
  mb_point: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("Member", memberSchema);
