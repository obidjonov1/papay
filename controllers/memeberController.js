let memberController = module.exports;

memberController.home = (req, res) => {
  console.log("GET cont.home");
  res.send("Home sahifasidasiz");
};

memberController.signup = (req, res) => {
  console.log("POST cont.signup");
  res.send("signup sahifasidasiz");
};

memberController.login = (req, res) => {
  console.log("POST cont.login");
  res.send("login sahifasidasiz");
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifasidasiz"); 
};
