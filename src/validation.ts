import { SpaceObject, Asteroid, Planet, Ship, Vector, CrewMember, Rank } from './types';

function hasKey<K extends string>(x: unknown, y: K): x is { [key in K]: any } {
  return typeof x === 'object' && x !== null && y in x;
}

function isVector(x: unknown): x is Vector {
  return Array.isArray(x) && x.length === 3 && x.every(y => typeof y === 'number');
}

function isBaseSpaceObject(
  x: unknown,
): x is Pick<SpaceObject, 'type' | 'location' | 'mass' | 'name'> {
  return (
    hasKey(x, 'location') &&
    isVector(x.location) &&
    hasKey(x, 'mass') &&
    typeof x.mass === 'number' &&
    hasKey(x, 'name') &&
    typeof x.name === 'string'
  );
}

function isAsteroid(x: unknown): x is Asteroid {
  return isBaseSpaceObject(x) && hasKey(x, 'type') && x.type === 'asteroid';
}

function isPlanet(x: unknown): x is Planet {
  return (
    isBaseSpaceObject(x) &&
    hasKey(x, 'type') &&
    x.type === 'planet' &&
    hasKey(x, 'population') &&
    typeof x.population === 'number' &&
    hasKey(x, 'habitable') &&
    typeof x.habitable === 'boolean'
  );
}

function isRank(x: unknown): x is Rank {
  return typeof x === 'string' && ['captain', 'first mate', 'officer', 'ensign'].includes(x);
}

function isCrewMember(x: unknown): x is CrewMember {
  return (
    hasKey(x, 'name') &&
    typeof x.name === 'string' &&
    hasKey(x, 'age') &&
    typeof x.age === 'number' &&
    hasKey(x, 'rank') &&
    isRank(x.rank) &&
    hasKey(x, 'home') &&
    isPlanet(x.home)
  );
}

function isShip(x: unknown): x is Ship {
  return (
    isBaseSpaceObject(x) &&
    hasKey(x, 'type') &&
    x.type === 'ship' &&
    hasKey(x, 'crew') &&
    Array.isArray(x.crew) &&
    x.crew.every(isCrewMember)
  );
}

export function isSpaceObject(x: unknown): x is SpaceObject {
  return isAsteroid(x) || isPlanet(x) || isShip(x);
}
