require('babel-register');
require('babel-core/polyfill');

const koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const cors = require('koa-cors');
const koaLogger = require('koa-bunyan');
const bunyan = require('bunyan');
const app = koa();

const featureRoutes = require('./routes/features');

router.get('/features', featureRoutes.get);
router.post('/features', featureRoutes.post);
router.put('/features/:id', featureRoutes.put);
router.delete('/features/:id', featureRoutes.delete);

// sets the reponse headers to allow cross origin requests
app.use(cors());

const logger = bunyan.createLogger({name: 'ui-api'});
app.use(koaLogger(logger, {
  // which level you want to use for logging?
  // default is info
  level: 'debug',
  // this is optional. Here you can provide request time in ms,
  // and all requests longer than specified time will have level 'warn'
  timeLimit: 100
}));

/* Handles all errors.
   Sets and errors array in the context to be filled
   by the following middelwares. These errors return a 400 status
   unless it gets explicitly set */
app.use(function * errorHandler(next) {
  try {
    this.errors = [];
    yield next;
    if (this.errors.length) {
      this.status = this.status || 400;
      this.body = { errors: this.errors };
    } else {
      this.status = this.status || 200;
    }
  } catch (err) {
    this.status = err.status || 500;
    console.error(err);
    this.body = {errors: ['Internal Server Error']};
  }
});

/* Parses the body of the requests and sets its contents to this.body */
app.use(bodyparser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
