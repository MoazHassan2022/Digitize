const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const dbConnect = () => {
  // Connect to the database
  const dbConnectionString = process.env.DATABASE.trim();
  // REMOTE DATABASE
  mongoose
    .connect(dbConnectionString, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to digitize database");
    });
};

module.exports = dbConnect;
