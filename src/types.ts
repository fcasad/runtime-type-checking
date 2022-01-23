export type Vector = [number, number, number];

type SpaceObjectBase = {
  location: Vector;
  mass: number;
  name: string;
};

export type Asteroid = SpaceObjectBase & {
  type: 'asteroid';
};

export type Planet = SpaceObjectBase & {
  type: 'planet';
  population: number;
  habitable: boolean;
};

export type Rank = 'captain' | 'first mate' | 'officer' | 'ensign';

export type CrewMember = {
  name: string;
  age: number;
  rank: Rank;
  home: Planet;
};

export type Ship = SpaceObjectBase & {
  type: 'ship';
  crew: CrewMember[];
};

export type SpaceObject = Asteroid | Planet | Ship;
