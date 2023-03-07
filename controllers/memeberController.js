const Member = require("../models/Member");
const jwt = require("jsonwebtoken");
const assert = require("assert");
const Definer = require("../lib/mistake");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body,
      member = new Member(),
      // signupData(data) -> ga req.bodyni yuboryabmiz
      new_member = await member.signupData(data);

    const token = memberController.createToken(new_member);
    // tokenni cookiega set qilish ->
    res.cookie("access_token", token, {
      // tokendagi vaqt bilan bir hil bo'lishi kerak
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });

    res.json({ state: "succeed", data: new_member });
  } catch (err) {
    console.log(`ERROR: cont/signup ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(),
      // signupData(data) -> ga req.bodyni yuboryabmiz
      result = await member.loginData(data);

    const token = memberController.createToken(result);

    // tokenni cookiega set qilish ->
    res.cookie("access_token", token, {
      // tokendagi vaqt bilan bir hil bo'lishi kerak
      maxAge: 6 * 3600 * 1000,
      httpOnly: true,
    });
    res.json({ state: "succeed", data: result });
  } catch (err) {
    console.log(`ERROR: cont/login ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont/logout");
  res.send("logout sahifasidasiz");
};

// JWT
memberController.createToken = (result) => {
  try {
    // upload_data orqali pastdagilarni olyabmiz ->
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };

    // jwtga kerakli datani tanlab olyabmiz ->
    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      // token necha soatda tugashi ->
      expiresIn: "6h",
    });

    assert.ok(token, Definer.auth_err4);
    return token;
  } catch (err) {
    throw err;
  }
};

memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("GET cont/checkMyAuthentication");
    // cookiedagi tokenni (frontenda)  qabul qilish ->
    let token = req.cookies["access_token"];

    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(member, Definer.auth_err4); // <- memberni olyabmiz id, nick_name...[63]

    res.json({ state: "succeed", data: member });
  } catch (err) {
    throw err;
  }
};
