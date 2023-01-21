const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongodb = require("mongodb");

const connectionString = process.env.MONGO_URL;

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
      let PORT = process.env.PORT || 3003;
      server.listen(PORT, function () {
        console.log(`runnig syccessfuly ${PORT}, http://localhost:${PORT}`);
      });
    }
  }
);
