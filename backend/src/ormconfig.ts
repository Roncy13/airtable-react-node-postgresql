import dotenv from "dotenv";

dotenv.config();

const config = {
  type: process.env.DB_TYPE || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "smurf_db",
  logging: false,
  synchronize: false,
  entities: [
    __dirname + '/**/models/*.entity{.ts,.js}',
    __dirname + '/**/api/**/*.entity{.ts,.js}'
  ],
  migrations: [
    'migrations/*{.ts,.js}'
  ],
  cli: {
      migrationsDir: "migrations",
  },
  uuidExtension: 'pgcrypto'
};

export = config;