import express from 'express';
import {
  serve as swaggerUiServe,
  setup as swaggerUiSetup,
} from 'swagger-ui-express';

import config from '../config.js';
import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const swaggerDocument = require('./documentation/swagger.json');
import users from './components/users/index.js';
import auth from './components/auth/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rouer
app.use('/users', users);
app.use('/auth', auth);
app.use('/api-docs', swaggerUiServe, swaggerUiSetup(swaggerDocument));

app.listen(config.api.port, () => {
  console.log('listing port:', config.api.port);
});
