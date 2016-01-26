const env = process.env.NODE_ENV || 'development';
const config = {};

switch (env) {
case 'development':
case 'production':
default: break;
}

export default config;
