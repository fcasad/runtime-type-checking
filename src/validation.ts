import Ajv, { ValidateFunction } from 'ajv';

import { SpaceObject } from './types';

const schema = {
  definitions: {
    Vector: {
      type: 'array',
      items: { type: 'number' },
      minItems: 3,
      maxItems: 3,
    },
    BaseSpaceObject: {
      type: 'object',
      properties: {
        location: { $ref: '#/definitions/Vector' },
        mass: { type: 'number' },
        name: { type: 'string' },
      },
      required: ['location', 'mass', 'name'],
    },
    Asteroid: {
      type: 'object',
      allOf: [{ $ref: '#/definitions/BaseSpaceObject' }],
      properties: {
        type: { const: 'asteroid' },
      },
      required: ['type'],
    },
    Planet: {
      type: 'object',
      allOf: [{ $ref: '#/definitions/BaseSpaceObject' }],
      properties: {
        type: { const: 'planet' },
        population: { type: 'number' },
        habitable: { type: 'boolean' },
      },
      required: ['type', 'population', 'habitable'],
    },
    Rank: {
      type: 'string',
      enum: ['captain', 'first mate', 'officer', 'ensign'],
    },
    CrewMember: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        rank: { $ref: '#/definitions/Rank' },
        home: { $ref: '#/definitions/Planet' },
      },
      required: ['name', 'age', 'rank', 'home'],
    },
    Ship: {
      type: 'object',
      allOf: [{ $ref: '#/definitions/BaseSpaceObject' }],
      properties: {
        type: { const: 'ship' },
        crew: { type: 'array', items: { $ref: '#/definitions/CrewMember' } },
      },
      required: ['type', 'crew'],
    },
    SpaceObject: {
      type: 'object',
      anyOf: [{ $ref: '#/definitions/Asteroid' }, { $ref: '#/definitions/Planet' }, { $ref: '#/definitions/Ship' }],
    },
  },
};

const ajv = new Ajv({ schemas: [schema] });

export function isSpaceObject(x: unknown): x is SpaceObject {
  const validate = ajv.getSchema('#/definitions/SpaceObject') as ValidateFunction;
  return validate(x);
}
