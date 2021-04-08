/* eslint-disable prettier/prettier */
export default () => ({
  app: {
     name: process.env.APP_NAME,
     baseUrl: process.env.BASE_URL,
    },
  port: 3000,
  database:{
    hosts: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    // cluster: process.env.DATABASE_CLUSTER,
    test: process.env.DATABASE_TEST_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  erp:{
    baseUrl:process.env.ERPBASEURL
  },
  isDev():boolean {
      const env = process.env.NODE_ENV;
      const envs = ['development', 'test', 'localhost', 'local'];
      return !env || envs.includes(env);
  }
})