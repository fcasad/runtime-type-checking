import * as rt from 'runtypes';

import { SpaceObject } from './types';

const VectorRunType = rt.Tuple(rt.Number, rt.Number, rt.Number);

const BaseSpaceObjectRunType = rt.Record({
  location: VectorRunType,
  mass: rt.Number,
  name: rt.String,
});

const AsteroidRunType = rt.Intersect(
  rt.Record({
    type: rt.Literal('asteroid'),
  }),
  BaseSpaceObjectRunType,
);

const PlanetRunType = rt.Intersect(
  rt.Record({
    type: rt.Literal('planet'),
    population: rt.Number,
    habitable: rt.Boolean,
  }),
  BaseSpaceObjectRunType,
);

const RankRunType = rt.Union(
  rt.Literal('captain'),
  rt.Literal('first mate'),
  rt.Literal('officer'),
  rt.Literal('ensign'),
);

const CrewMemberRunType = rt.Record({
  name: rt.String,
  age: rt.Number,
  rank: RankRunType,
  home: PlanetRunType,
});

const ShipRunType = rt.Intersect(
  rt.Record({
    type: rt.Literal('ship'),
    crew: rt.Array(CrewMemberRunType),
  }),
  BaseSpaceObjectRunType,
);

const SpaceObjectRunType = rt.Union(AsteroidRunType, PlanetRunType, ShipRunType);

export function isSpaceObject(x: unknown): x is SpaceObject {
  return SpaceObjectRunType.guard(x);
}
