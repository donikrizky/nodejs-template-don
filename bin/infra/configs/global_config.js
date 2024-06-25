require('dotenv').config();
const confidence = require('confidence');
const { name: serverName } = require('../../../package.json');

const config = {
  env: process.env.ENV,
  port: process.env.PORT,
  cors: {
    origins: process.env.CORS_ORIGINS,
    allowHeaders: process.env.CORS_ALLOW_HEADERS,
    exposeHeaders: process.env.CORS_EXPOSE_HEADERS,
    preflightMaxAge: process.env.CORS_PREFLIGHT_MAX_AGE || 10,
  },
  crypto: {
    secretKey: process.env.CRYPTO_SECRET_KEY,
    saltRounds: process.env.CRYPTO_SALT_ROUND || 10,
  },
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    }
  ],
  jwt: {
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    signOptions: {
      algorithm: process.env.JWT_SIGNING_ALGORITHM,
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      expiresIn: process.env.JWT_EXPIRATION_TIME
    },
    verifyOptions: {
      algorithm: process.env.JWT_SIGNING_ALGORITHM,
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER
    }
  },
  mongoDbUrl: process.env.MONGO_DATABASE_URL || 'mongodb://localhost:27017/sample',
  mysqlConfig: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  postgresqlUrl: process.env.POSTGRESQL_URL || 'postgresql://postgres:121314@localhost:5432/sample',
  elasticsearch: {
    logging: process.env.ELASTICSEARCH_LOGGING,
    logPrefix: process.env.ELASTICSEARCH_LOG_PREFIX,
    logLabel: process.env.ELASTICSEARCH_LOG_LABEL,
    node: process.env.ELASTICSEARCH_NODE,
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  },
  apm: {
    serviceName: process.env.ELASTIC_APM_SERVICE_NAME,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    serverUrl: process.env.ELASTIC_APM_SERVER_URL
  },
  ddTrace: {
    enable: process.env.DD_TRACE_ENABLED,
    env: process.env.DD_ENV,
    host: process.env.DD_AGENT_HOST,
  },
  monitoring: process.env.MONITORING || 0,
  kafka: {
    broker: process.env.KAFKA_HOST,
    mechanism: process.env.KAFKA_MECHANISM,
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  kafkaConfig: {
    clientId: serverName,
    // brokers: process.env.KAFKA_BROKERS.split(','),
    ssl: false,
    sasl: process.env.KAFKA_SASL_OK === 'yes' ? {
      mechanism: process.env.KAFKA_MECHANISM,
      username: process.env.KAFKA_SASL_USERNAME,
      password: process.env.KAFKA_SASL_PASSWORD
    } : undefined
  },
  rabbitmq: process.env.RABBITMQ_HOST || 'amqp://localhost',
  minio: {
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    endPoint: process.env.MINIO_END_POINT || 'foo.bar.com',
    defaultImage: process.env.MINIO_DEFAULT_IMAGE,
    port: process.env.MINIO_PORT,
    extDomain: process.env.MINIO_EXT_DOMAIN,
    useSSL: process.env.MINIO_SSL,
  },
  alioss: {
    region: process.env.ALIOSS_REGION || 'oss-ap-southeast-5',
    accessKeyId: process.env.ALIOSS_ACCESS_KEY_ID || 'foo',
    accessKeySecret: process.env.ALIOSS_ACCESS_KEY_SECRET || 'bar',
    bucketPrivate: process.env.ALIOSS_BUCKET_PRIVATE,
    endpoint: process.env.ALIOSS_END_POINT || 'foo.bar.com',
    subBucket: process.env.ALIOSS_SUB_BUCKET,
    topDir: process.env.ALIOSS_TOP_DIR,
  },
  aws: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
  bucketName: process.env.BUCKET_NAME,
  storaging: process.env.STORAGING || 0,
  tokenIzinKeramaian: process.env.TOKEN_IZIN_KERAMAIAN,
  urlIzinKeramaian: process.env.URL_IZIN_KERAMAIAN,
  urlFileIzinKeramaian: process.env.URL_FILE_IZIN_KERAMAIAN,
  urlPengajuanEvent: process.env.URL_PENGAJUAN_EVENT,

  bsreUsername: process.env.BSRE_USERNAME,
  bsrePassword: process.env.BSRE_PASSWORD,
  bsreUrl: process.env.BSRE_URL,

  urlBackOffice: process.env.URL_BACKOFFICE,
  urlLogoOss: process.env.URL_LOGO_OSS,

  smtp: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS
  },
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
