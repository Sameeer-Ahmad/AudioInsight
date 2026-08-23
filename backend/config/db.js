require("dotenv").config();
const { Sequelize } = require("sequelize");

if (!process.env.DB_URL) {
  throw new Error(
    "DB_URL environment variable is not set. Check your hosting platform's " +
      "environment variable configuration (see backend/.env.example)."
  );
}

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
