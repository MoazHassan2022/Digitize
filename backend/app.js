const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const activityRouter = require('./routes/activityRoutes');
const deliveryTeamRouter = require('./routes/deliveryTeamRoutes');
const deliveryWayRouter = require('./routes/deliveryWayRoutes');
const projectRouter = require('./routes/projectRoutes');
const rowRouter = require('./routes/rowRoutes');
const measurementRouter = require('./routes/measurementRoutes');
const siteEngineerRouter = require('./routes/siteEngineerRoutes');
const siteSupervisorMainRouter = require('./routes/siteSupervisorMainRoutes');
const siteSupervisorAssistantRouter = require('./routes/siteSupervisorAssistantRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const app = express();

// MIDDLEWARES

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'http://localhost:3001',
    'http://localhost:5000'
  );

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Set security HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: {
      allowOrigins: ['*'],
    },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['*'],
        scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
      },
    },
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body parser, reading date from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss()); // prevent dangerous of html and javascript code in the request

// Prevent paramete pollution by preventing for example writing sort twice
app.use(
  hpp({
    whitelist: ['status', 'priority', 'subject', 'category', 'project'], // keep multiple status and all of these in query
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Write down the date and log the headers
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// Limit requests from sam IP address
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000, // Ms: milliseconds, this will allow the same IP address to perform only 5000 request per hour
  message:
    'Too many requests from this IP address, please try again in an hour!',
});
app.use('/api', limiter); // limit only api requests

// ROUTES
app.use('/api/activities', activityRouter);
app.use('/api/deliveryTeams', deliveryTeamRouter);
app.use('/api/deliveryWays', deliveryWayRouter);
app.use('/api/projects', projectRouter);
app.use('/api/rows', rowRouter);
app.use('/api/measurementUnits', measurementRouter);
app.use('/api/siteEngineers', siteEngineerRouter);
app.use('/api/siteSupervisorMain', siteSupervisorMainRouter);
app.use('/api/siteSupervisorAssistant', siteSupervisorAssistantRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`هذا الرابط ${req.originalUrl} غير موجود على الخادم`, 404));
});

// Error handler middleware
app.use(globalErrorHandler);
module.exports = app;
