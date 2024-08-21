require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
});

async function ConnectToDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has established successfully");
    await sequelize.sync();
  } catch (err) {
    console.log("unable to connect");
    console.log(err);
  }
}

module.exports = {
  sequelize,
  ConnectToDB,
};
