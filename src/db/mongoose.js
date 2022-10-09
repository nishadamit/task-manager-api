const mongoose = require("mongoose");
const productionUrl =
  "mongodb+srv://amitnishad:amit@cluster0.iyehy6v.mongodb.net/?retryWrites=true&w=majority";
const localUrl = process.env.MONGODB_URL;
mongoose
  .connect(productionUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase Connected Successfully"))
  .catch((error) => console.log("Database connection failed"));
