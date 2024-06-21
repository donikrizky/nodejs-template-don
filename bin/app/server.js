const restify = require('restify');
const cors = require('../middlewares/cors');
const project = require('../../package.json');
const jwtAuth = require('../auth/jwt_auth_helper');
const routes = require('../routes');
const gracefulShutdown = require('./graceful_shutdown');
const healthCheck = require('./health_check');
const venueHandler = require('../modules/venue/handlers/api_handler');
const eventHandler = require('../modules/event/handlers/api_handler');
const eventV2Handler = require('../modules/event_v2/handlers/api_handler');
const venuePresisiHandler = require('../modules/venue-presisi/handlers/api_handler');
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

    // pengajuan event
    // read
    this.server.get('/event/v1/event/:eventId', jwtAuth.decodeToken, eventHandler.getEventById);
    this.server.get('/event/v1/event/verifikasi-berkas/:eventId', jwtAuth.decodeToken, eventHandler.getVerifikasiBerkas);
    this.server.get('/event/v1/event', jwtAuth.decodeToken, eventHandler.ossFormGetEvents);
    this.server.get('/event/v1/event/download-izin/:eventId', jwtAuth.decodeToken, eventHandler.getDownloadIzin)
    this.server.get('/event/v1/event/check-upload/:eventId', jwtAuth.decodeToken, eventHandler.getCheckUpload)
    this.server.get('/event/v1/event/cek-rekomendasi-teknis', jwtAuth.decodeToken, eventHandler.cekRekomendasiTeknis)
    this.server.get('/event/v1/event/template/organizer-statement', jwtAuth.decodeToken, eventHandler.getOrganizerStatementTemplate);

    // write
    this.server.post('/event/v2/event/first-draft', jwtAuth.decodeToken, eventHandler.createFirstDraftEventV2);
    this.server.put('/event/v1/event/second-draft', jwtAuth.decodeToken, eventHandler.createSecondDraftEvent);
    this.server.put('/event/v2/event/third-draft', jwtAuth.decodeToken, eventHandler.createThirdDraftEventV2);
    this.server.del('/event/v1/event/:eventId', jwtAuth.decodeToken, eventHandler.deleteEvent);
    this.server.post('/event/v1/event/clone', jwtAuth.decodeToken, eventHandler.cloneEvent);

    // dashboard
    // read
    this.server.get('/event/v1/dashboard/event/:eventId', jwtAuth.decodeToken, eventHandler.dashboardDisparekrafGetEventById);
    this.server.get('/event/v1/dashboard/event', jwtAuth.decodeToken, eventHandler.dashboardDisparekrafGetEvents);
    this.server.get('/event/v1/dashboard/event/marves', jwtAuth.decodeToken, eventHandler.dashboardGetEventsMarves);
    this.server.get('/event/v1/dashboard/event-proposal/:eventId', jwtAuth.decodeToken, eventHandler.getEventProposal);
    // metric
    this.server.get('/event/v1/dashboard/metric/summary', jwtAuth.decodeToken, eventHandler.getMetricSummary);
    this.server.get('/event/v1/dashboard/metric/percentage', jwtAuth.decodeToken, eventHandler.getMetricPercentage);
    this.server.get('/event/v1/dashboard/metric/review', jwtAuth.decodeToken, eventHandler.getMetricReview);
    this.server.get('/event/v1/dashboard/metric/year', jwtAuth.decodeToken, eventHandler.getMetricYearly);
    this.server.get('/event/v1/dashboard/metric/month', jwtAuth.decodeToken, eventHandler.getMetricMonthly);
    this.server.get('/event/v1/dashboard/metric/date-range', jwtAuth.decodeToken, eventHandler.getMetricDateRange);

    // write
    this.server.put('/event/v1/dashboard/verifikasi-berkas-disparekraf', jwtAuth.decodeToken, eventHandler.updateVerifikasiBerkasDisparekraf);
    this.server.post('/event/v1/dashboard/review-berkas-disparekraf', jwtAuth.decodeToken, eventHandler.reviewVerifikasiBerkasDisparekraf);
    this.server.post('/event/v1/dashboard/generate-recommendation', jwtAuth.decodeToken, eventHandler.generateRecommendation);
    this.server.post('/event/v1/dashboard/review-generate-recommendation', jwtAuth.decodeToken, eventHandler.reviewGenerateRecommendation);

    // dashboard venue
    this.server.get('/event/v1/dashboard-venue/event', jwtAuth.decodeToken, eventHandler.dashboardVenueGetEvents);
    this.server.get('/event/v1/dashboard-venue/event/:eventId', jwtAuth.decodeToken, eventHandler.dashboardVenueGetDetailEvent);
    this.server.put('/event/v1/dashboard-venue/verifikasi-venue', jwtAuth.decodeToken, eventHandler.dashboardVenueVerifikasi);

    this.server.post('/event/v1/event/review', jwtAuth.decodeToken, eventHandler.writeReview);

    //venue-presisi
    this.server.post('/event/v1/venue-presisi', jwtAuth.decodeToken, venuePresisiHandler.updateVenuePresisi);

    // verifikasi qrcode
    this.server.get('/doc-validation/v1', eventHandler.qrValidation);

    // send email new akun
    this.server.post('/event/v1/dashboard/email-new-user', eventHandler.sendEmailNewUser);

    // Refactor
    // event v2
    this.server.post('/event/v1/migrate-new-db', eventV2Handler.migrateDataToNewDB);
    this.server.post('/event/v3/event/first-draft', jwtAuth.decodeToken, eventV2Handler.createFirstDraftEvent);
    this.server.put('/event/v2/event/second-draft', jwtAuth.decodeToken, eventV2Handler.createSecondDraftEvent);
    this.server.put('/event/v3/event/third-draft', jwtAuth.decodeToken, eventV2Handler.createThirdDraftEvent);
    this.server.get('/event/v2/event/:eventId', jwtAuth.decodeToken, eventV2Handler.getEventById);
    this.server.post('/event/v2/event/clone', jwtAuth.decodeToken, eventV2Handler.cloneEvent);
    this.server.del('/event/v2/event/:eventId', jwtAuth.decodeToken, eventV2Handler.deleteEvent);

    routes(this.server);
    //Initiation
    mongoConnectionPooling.init();

    global.globalBucketName = config.get('/bucketName');;
    global.globalSortCreatedAt = { createdAt : -1 };
  }
}

module.exports = AppServer;
