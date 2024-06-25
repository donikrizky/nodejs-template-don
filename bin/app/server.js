const restify = require('restify');
const cors = require('../middlewares/cors');
const project = require('../../package.json');
const jwtAuth = require('../auth/jwt_auth_helper');
const routes = require('../routes');
const gracefulShutdown = require('./graceful_shutdown');
const healthCheck = require('./health_check');
const venueHandler = require('../modules/venue/handlers/api_handler');
const venuePresisiHandler = require('../modules/venue-presisi/handlers/api_handler');

const pipHandler = require('../modules/pip/handlers/api_handler');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');
const config = require('../infra/configs/global_config');

class AppServer {
  constructor() {
    this.server = restify.createServer({ name: `${project.name}-server`, version: project.version });
    gracefulShutdown.init(this.server);
    this.server.serverKey = '';
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.authorizationParser());

    // required for CORS configuration
    this.server.pre(cors.preflight);
    this.server.use(cors.actual);
    this.server.get('/event', (req, res, next) => {
      res.send(200, { success: true, data: 'server init', message: 'This service is running properly', code: 200 });
      next();
    });
    this.server.get('/event/health', (req, res, next) => {
      healthCheck.checkServiceHealth(this.server);
      res.send(200, { success: true, data: 'server init', message: 'This service is running health check', code: 200 });
      next();
    });

    // venue
    // read
    this.server.get('/event/v1/venue/:venueId', jwtAuth.decodeToken, venueHandler.getVenueById);
    this.server.get('/event/v1/venue/banner', jwtAuth.decodeToken, venueHandler.getVenueBanners);
    this.server.get('/event/v1/venue/region', jwtAuth.decodeToken, venueHandler.getVenueByRegion);

    // venue-presisi
    this.server.post('/event/v1/venue-presisi', jwtAuth.decodeToken, venuePresisiHandler.updateVenuePresisi);

    this.server.get('/pip/v1/cek-nik', pipHandler.getNIKFamiliesByNIK);

    routes(this.server);
    // Initiation
    mongoConnectionPooling.init();

    // for global variable
    // global.globalBucketName = config.get('/bucketName');;
    // global.globalSortCreatedAt = { createdAt : -1 };
  }
}

module.exports = AppServer;
