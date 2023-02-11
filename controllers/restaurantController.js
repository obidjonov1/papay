const assert = require("assert");
const Definer = require("../lib/mistake");
const Member = require("../models/Member");
const Product = require("../models/Product");

let restaurantController = module.exports;

restaurantController.home = (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR: cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantProducts");
    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member);
    // login bo'lgan restaurantni hamma productlarini olib "restaurant-menu.ejs" ga yuboradi
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR: cont/getMyRestaurantProducts ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR: cont/getSignupMyRestaurant ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signupProcess");
    assert(req.file, Definer.general_err3);

    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member(),
      // signupData(data) -> ga req.bodyni yuboryabmiz
      result = await member.signupData(new_member);
    assert(req.file, Definer.general_err1);

    // resquest sessionni ichiga SET qilyabmiz
    req.session.member = result;
    res.redirect("/resto/products/menu"); // boshqa pagega yuborish
  } catch (err) {
    console.log(`ERROR: cont/signupProcess ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR: cont/getLoginMyRestaurant ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/loginProcess");
    const data = req.body,
      member = new Member(),
      // signupData(data) -> ga req.bodyni yuboryabmiz
      result = await member.loginData(data); // memberimizni barcha ma'lumotlari "result" da mavjud

    // sessionni ichida memberni hosil qilib ichiga yuklayabmiz "result"ni
    req.session.member = result;
    req.session.save(function () {
      // redirect = bu router_bssr.js(23) dan davom etadi
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-restaurant")
        : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR: cont/loginProcess ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifasidasiz");
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "Only authenticated members with restaurant type",
    });
};

restaurantController.checkSessions = (req, res) => {
  if (req.session.member) {
    res.json({ state: "succeed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You are not authenticated" });
  }
};
