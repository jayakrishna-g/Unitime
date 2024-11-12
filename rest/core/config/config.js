const development = {
  connString:
    process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/unitime',
  jwtSecretKey: 'Test',
};
const production = {
  connString: process.env.MONGODB_CONNECTION_STRING,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
module.exports = {
  development,
  production,
  get_config_profile() {
    return process.env.PROFILE || 'development';
  },
  get_config: () => {
    const configProfile = process.env.PROFILE || 'development';
    console.log(`CONFIG PROFILE SELECTED IS:  ${configProfile}`);
    if (configProfile === 'development') {
      return development;
    }
    return production;
  },
};
