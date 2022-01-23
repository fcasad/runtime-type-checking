import { Static } from 'runtypes';
import * as rt from './runtypes';

export type Vector = Static<typeof rt.VectorRunType>;
export type Asteroid = Static<typeof rt.AsteroidRunType>;
export type Planet = Static<typeof rt.PlanetRunType>;
export type Rank = Static<typeof rt.RankRunType>;
export type CrewMember = Static<typeof rt.CrewMemberRunType>;
export type Ship = Static<typeof rt.ShipRunType>;
export type SpaceObject = Static<typeof rt.SpaceObjectRunType>;
