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
    test:process.env.DBTEST,
    cluster: process.env.DB_CLUSTER,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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