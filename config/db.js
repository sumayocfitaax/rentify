// const mongoose = require("mongoose");

// const connectedDB = async () => {
//   console.log("MONGO:", process.env.MONGO_URL);
//   try {
//     console.log("Connecting MongoDB...");

//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("DB connected successfully");
//   } catch (error) {
//     console.log("DB connection error:", error.message);
//   }
// };

// module.exports = connectedDB;

const mongoose = require("mongoose");

const connectedDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URL);

    console.log("DB connected successfully");
  } catch (error) {
    console.log("FULL ERROR:");
    console.log(error);
  }
};

module.exports = connectedDB;