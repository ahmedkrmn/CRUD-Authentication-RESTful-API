module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || "http://localhost:3000",
  DB_URI: process.env.DB_URI || "YOUR MONGODB ATLAS URI",
  JWT_SECRET: process.env.JWT_SECRET || "development"
};
