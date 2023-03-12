const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memeberController");
const productController = require("./controllers/productController");
const restaurantController = require("./controllers/restaurantController");

/* *************************
 *      REST API          *
 **************************/

// Members secion router
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
  "/member/:id",
  // 1-si view uchun ->
  memberController.retrieveAuthMember,
  memberController.getChosenMember
);

// Product related routers
router.post(
  "/products",
  memberController.retrieveAuthMember, // middleveartoken
  productController.getAllProducts
);
router.get(
  "/products/:id",
  memberController.retrieveAuthMember,
  productController.getChosenProduct
);

// Restaurant related routers
router.get(
  "/restaurants",
  memberController.retrieveAuthMember,
  restaurantController.getRestaurants
);

router.get(
  "/restaurants/:id",
  memberController.retrieveAuthMember,
  restaurantController.getChosenRestaurant
);

module.exports = router;
