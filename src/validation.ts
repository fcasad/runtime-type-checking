import joi from 'joi';

import { SpaceObject } from './types';

const vectorSchema = joi
  .array()
  .ordered(joi.number().required(), joi.number().required(), joi.number().required())
  .required();

const baseSpaceObjectSchema = joi
  .object()
  .keys({
    location: vectorSchema,
    mass: joi.number().required(),
    name: joi.string().required(),
  })
  .required();

const asteroidSchema = baseSpaceObjectSchema.keys({ type: joi.string().valid('asteroid').required() });

const planetSchema = baseSpaceObjectSchema.keys({
  type: joi.string().valid('planet').required(),
  population: joi.number().required(),
  habitable: joi.boolean().required(),
});

const rankSchema = joi.string().valid('captain', 'first mate', 'officer', 'ensign').required();

const crewMemberSchema = joi
  .object()
  .keys({
    name: joi.string().required(),
    age: joi.number().required(),
    rank: rankSchema,
    home: planetSchema,
  })
  .required();

const shipSchema = baseSpaceObjectSchema.keys({
  type: joi.string().valid('ship').required(),
  crew: joi.array().items(crewMemberSchema).required(),
});

const spaceObjectSchema = joi.alternatives().try(asteroidSchema, planetSchema, shipSchema).required();

export function isSpaceObject(x: unknown): x is SpaceObject {
  return !spaceObjectSchema.validate(x).error;
}
