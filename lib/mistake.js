class Definer {
  /** generaal errors */
  static general_err1 = "att: samething went wrong!";
  static general_err2 = "att: there is no data with that params!";
  static general_err3 = "att: file upload error!";

  /** member auth related */
  static auth_err1 = "att: mongodb validation is failed!";
  static auth_err2 = "att: no member with that mb_nick!";
  static auth_err3 = "att: your credentials do not match!";
  static auth_err4 = "att: jwt token creation error!";
  static auth_err5 = "att: you are not authenticated!";

  /** product related errors */
  static product_err1 = "att: product creation is failed!";

  /** order related errors */
  static order_err1 = "att: order creation is failed!";
}

module.exports = Definer;
