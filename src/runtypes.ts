import * as rt from 'runtypes';

export const VectorRunType = rt.Tuple(rt.Number, rt.Number, rt.Number);

const BaseSpaceObjectRunType = rt.Record({
  location: VectorRunType,
  mass: rt.Number,
  name: rt.String,
});

export const AsteroidRunType = rt.Intersect(
  rt.Record({
    type: rt.Literal('asteroid'),
  }),
  BaseSpaceObjectRunType,
);

export const PlanetRunType = rt.Intersect(
  rt.Record({
    type: rt.Literal('planet'),
    population: rt.Number,
    habitable: rt.Boolean,
  }),
  BaseSpaceObjectRunType,
);

export const RankRunType = rt.Union(
  rt.Literal('captain'),
  rt.Literal('first mate'),
  rt.Literal('officer'),
  rt.Literal('ensign'),
);

export const CrewMemberRunType = rt.Record({
  name: rt.String,
  age: rt.Number,
  rank: RankRunType,
  home: PlanetRunType,
});

export const ShipRunType = rt.Intersect(
  rt.Record({
    type: rt.Literal('ship'),
    crew: rt.Array(CrewMemberRunType),
  }),
  BaseSpaceObjectRunType,
);

export const SpaceObjectRunType = rt.Union(AsteroidRunType, PlanetRunType, ShipRunType);
