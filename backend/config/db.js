
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "mysql://avnadmin:AVNS_Nh2dKPoG7scLVfrMFyT@mysql-32fc156d-sam9910333-ab06.f.aivencloud.com:12978/auido-insight?ssl-mode=REQUIRED",

  {
    dialect: "mysql",
  }
);

async function ConnectToDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has established successfully");
    await sequelize.sync();
  } catch (err) {
    console.log("unable to connect");
  }
}

module.exports = {
  sequelize,
  ConnectToDB,
};
