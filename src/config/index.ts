process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = (process.env.STAGE = process.env.STAGE || 'local');

let envConfig;

if (stage === 'production') {
  envConfig = require('./prod').default;
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}

export default { port: 3001, host: 'localhost', ...envConfig };
