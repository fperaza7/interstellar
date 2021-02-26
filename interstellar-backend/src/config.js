import { config } from "dotenv";

config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://mongo-db:27017/interstellar",
  PORT: process.env.PORT || 3000,
  SECRET: 'interstellar-api'
};
