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
  res.cookie("access_token", null, { maxAge: 0, httpOnly: true });

  res.json({ state: "succeed", data: "logout successfuly!" });
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

    // jwtga kerakli datani tanlab olyabmiz -> (jwt.sign -> ichga tokenga aylantirmoqchi bo'lgan object -> secret code -> vaqt(options)
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

// jbrish qilib yashirgan codeni qayta olish
memberController.checkMyAuthentication = (req, res) => {
  try {
    console.log("GET cont/checkMyAuthentication");
    // cookiedagi tokenni (frontenda)  qabul qilish -> kelayotgan requestdan cookiesni 받을 수 있슴
    let token = req.cookies["access_token"]; // "access_token" -> qanday nom bilan yozilgan bo'lsa shu nom bilan qabul qilinadi [18]

    //  tokeni ichidagi yashiringan objectni olish ->
    const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    assert.ok(member, Definer.auth_err4); // <- memberni objectni olyabmiz uni ichida(id, nick_name...[63])

    res.json({ state: "succeed", data: member });
  } catch (err) {
    throw err;
  }
};

memberController.getChosenMember = async (req, res) => {
  try {
    console.log("GET cont/getChosenMember");
    const id = req.params.id;

    const member = new Member();
    // .getChosenMemberData(kim reqni amalga oshiryapti, kimni ko'rmoqchi)
    const result = await member.getChosenMemberData(req.member, id);
    
    res.json({ state: "Succeeded", data: result });
  } catch (err) {
    console.log(`ERROR: cont/getChosenMember ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

// VIEWlar uchun TOKEN orqali ->
memberController.retrieveAuthMember = (req, res, next) => {
  try {
    const token = req.cookies["access_token"];
    // token orqali "member" check qilinyapti ->
    req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
    next();
  } catch (err) {
    console.log(`ERROR: cont/retrieveAuthMember ${err.message}`);
    // authenticated bo'lmagan userlarni ham error bermay o'tazib yuborish uchun ->
    next();
  }
};
