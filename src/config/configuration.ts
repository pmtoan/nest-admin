import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});
