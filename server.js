const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://steve:WWige06usl6Txy7A@cluster0.bdocfly.mongodb.net/Reja?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB:");
    else {
      console.log("MongoDB connection succeed");
      module.exports = client;

      const app = require("./app");
      const server = http.createServer(app);
      // my localhost:3003
      let PORT = 3003;
      server.listen(PORT, function () {
        console.log(`runnig syccessfuly ${PORT}, http://localhost:${PORT}`);
      });
    }
  }
);
