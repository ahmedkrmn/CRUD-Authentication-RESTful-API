module.exports = {
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || "http://localhost:3000",
  DB_URI: process.env.DB_URI || "YOUR DB URI",
  JWT_SECRET: process.env.JWT_SECRET || "YOUR JWT SECRET"
};
