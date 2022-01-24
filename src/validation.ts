import Ajv, { ValidateFunction } from 'ajv';

import { SpaceObject } from './types';
import schema from './schema.json';

const ajv = new Ajv({ schemas: [schema] });

export function isSpaceObject(x: unknown): x is SpaceObject {
  const validate = ajv.getSchema('#/definitions/SpaceObject') as ValidateFunction;
  return validate(x);
}
