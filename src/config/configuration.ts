export default ():any => ({
  database: {
    host: process.env.DATABASE_URL,
  },
});
