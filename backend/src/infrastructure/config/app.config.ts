export default () => ({
  name: process.env.APP_NAME!,
  env: process.env.NODE_ENV!,
  port: Number(process.env.PORT),
});
