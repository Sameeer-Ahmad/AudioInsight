require("dotenv").config();
const { Sequelize } = require("sequelize");

// mysql2 doesn't understand a `ssl-mode` query param (managed MySQL hosts
// like Aiven put one in their connection string) — it just silently ignores
// it and connects without SSL, which Aiven's free tier will then reject.
// Read it ourselves and configure SSL properly via dialectOptions instead.
const dbUrl = new URL(process.env.DB_URL);
const requiresSSL = dbUrl.searchParams.get("ssl-mode") === "REQUIRED";
dbUrl.searchParams.delete("ssl-mode");

const sequelize = new Sequelize(dbUrl.toString(), {
  dialect: "mysql",
  dialectOptions: requiresSSL ? { ssl: { rejectUnauthorized: false } } : {},
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
