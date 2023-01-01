import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PSQL_HOST,
  port: Number(process.env.PSQL_PORT),
  username: process.env.PSQL_USER,
  password: process.env.PSQL_PW,
  database: process.env.PSQL_DATABASE,
  entities: ['dist/src/**/*.entity.js'],
  synchronize: process.env.MODE == 'production' ? false : true, // no sync on production
  migrations: ['dist/src/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
