const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URL;

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, goose) => {
    if (err) console.log("ERROR on connection MongoDB:");
    else {
      console.log("MongoDB connection succeed");

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
