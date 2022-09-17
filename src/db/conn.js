const mongoose = require("mongoose");
const connectDB = "mongodb://127.0.0.1/hackthon";


mongoose
  .connect(connectDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Sucessfully connected to database"))
  .catch((err) => {
    console.log("error!! while conneecting to database");
  });