const mongoose = require("mongoose");
const productionUrl = process.env.MONGODB_URL_PRODUCTION;
const localUrl = process.env.MONGODB_URL;
mongoose
  .connect(productionUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase Connected Successfully"))
  .catch((error) => console.log("Database connection failed"));
