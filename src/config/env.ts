import dotenv from "dotenv";

dotenv.config({ encoding: "utf8", override: false });

const { NODE_ENV, REDIS_ENDPOINT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } =
  process.env;

if (
  !NODE_ENV ||
  !REDIS_ENDPOINT ||
  !DB_HOST ||
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_DATABASE
) {
  throw new Error("Environment variables must be set");
}

const env = {
  NODE_ENV,
  REDIS_ENDPOINT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
};

export default env;
