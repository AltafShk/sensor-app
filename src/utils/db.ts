import mysql from "mysql2";
import env from "../config/env";

export class Database {
  private pool: mysql.Pool;
  private static instance: Database;

  constructor() {
    this.pool = mysql.createPool({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    Database.instance = this;
    console.log("Database connected");
  }

  public static getInstance(): Database {
    return Database.instance;
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}
