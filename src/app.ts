import cloneDeepWith from 'lodash/cloneDeepWith';
import express, { Request, Response, NextFunction } from 'express';
import swaggerUI, { JsonObject } from 'swagger-ui-express';

import swaggerDoc from './swagger.json';
import schema from './schema.json';
import { isSpaceObject } from './validation';

const app = express();

app.use(express.json());

type SwaggerDocsRequest = Request & {
  swaggerDoc?: JsonObject;
};

function makeSwaggerSchemas(): object {
  return cloneDeepWith(schema.definitions, (value, key) => {
    if (key === '$ref' && typeof value === 'string') {
      return value.replace('#/definitions', '#/components/schemas');
    }
  });
}

app.use(
  '/v1/api-docs',
  (req: SwaggerDocsRequest, res: Response, next: NextFunction) => {
    swaggerDoc.components.schemas = makeSwaggerSchemas();
    req.swaggerDoc = swaggerDoc;
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(),
);

app.post('/v1/space-objects', (req, res) => {
  if (!isSpaceObject(req.body)) {
    return res.status(400).json('Invalid space object');
  }
  // we can now safely access the following:
  const spaceObject = req.body;
  res.status(201).json(null);
});

export { app };
