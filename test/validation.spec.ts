import { set, omit } from 'lodash';

import { isSpaceObject } from '../src/validation';
import { getAsteroid, getPlanet, getShip } from './fixtures';

test.each([
  ['valid asteroid', getAsteroid()],
  ['valid planet', getPlanet()],
  ['valid ship', getShip()],
])('%s should return true', (_, value) => {
  expect(isSpaceObject(value)).toBe(true);
});

test.each([
  // basic json types
  ['null', null],
  ['string', 'abc'],
  ['number', 42],
  ['boolean', true],
  ['array', []],
  ['object', {}],
  // invalid asteroid
  ['asteroid missing location', omit(getAsteroid(), 'location')],
  ['asteroid with location of wrong type', set(getAsteroid(), 'location', ['a', 'b', 'c'])],
  ['asteroid with location length too big', set(getAsteroid(), 'location', [1, 2, 3, 4])],
  ['asteroid with location length too small', set(getAsteroid(), 'location', [1, 2])],
  ['asteroid missing mass', omit(getAsteroid(), 'mass')],
  ['asteroid with mass of wrong type', set(getAsteroid(), 'mass', 'abc')],
  ['asteroid missing name', omit(getAsteroid(), 'name')],
  ['asteroid with name of wrong type', set(getAsteroid(), 'name', true)],
  ['asteroid missing type', omit(getAsteroid(), 'type')],
  ['asteroid with type incorrect', set(getAsteroid(), 'type', 'asteroids')],
  // invalid planet
  ['planet missing location', omit(getPlanet(), 'location')],
  ['planet location of wrong type', set(getPlanet(), 'location', ['a', 'b', 'c'])],
  ['planet location length too big', set(getPlanet(), 'location', [1, 2, 3, 4])],
  ['planet location length too small', set(getPlanet(), 'location', [1, 2])],
  ['planet missing mass', omit(getPlanet(), 'mass')],
  ['planet mass of wrong type', set(getPlanet(), 'mass', 'abc')],
  ['planet missing name', omit(getPlanet(), 'name')],
  ['planet name of wrong type', set(getPlanet(), 'name', true)],
  ['planet missing type', omit(getPlanet(), 'type')],
  ['planet type incorrect', set(getPlanet(), 'type', 'planets')],
  ['planet missing population', omit(getPlanet(), 'population')],
  ['planet population of wrong type', set(getPlanet(), 'population', 'abc')],
  ['planet missing habitable', omit(getPlanet(), 'habitable')],
  ['planet habitable of wrong type', set(getPlanet(), 'habitable', 0)],
  // invalid ship
  ['ship missing location', omit(getShip(), 'location')],
  ['ship location of wrong type', set(getShip(), 'location', ['a', 'b', 'c'])],
  ['ship location length too big', set(getShip(), 'location', [1, 2, 3, 4])],
  ['ship location length too small', set(getShip(), 'location', [1, 2])],
  ['ship missing mass', omit(getShip(), 'mass')],
  ['ship mass of wrong type', set(getShip(), 'mass', 'abc')],
  ['ship missing name', omit(getShip(), 'name')],
  ['ship name of wrong type', set(getShip(), 'name', true)],
  ['ship missing type', omit(getShip(), 'type')],
  ['ship type incorrect', set(getShip(), 'type', 'ships')],
  ['ship missing crew', omit(getShip(), 'crew')],
  ['ship crew of wrong type', set(getShip(), 'crew', [1, 2])],
  ['ship some crew of wrong type', set(getShip(), 'crew[1]', true)],
  ['ship crew member missing name', omit(getShip(), 'crew[0].name')],
  ['ship crew member name of wrong type', set(getShip(), 'crew[0].name', 42)],
  ['ship crew member missing age', omit(getShip(), 'crew[0].age')],
  ['ship crew member age of wrong type', set(getShip(), 'crew[0].age', true)],
  ['ship crew member missing rank', omit(getShip(), 'crew[0].rank')],
  ['ship crew member rank of wrong type', set(getShip(), 'crew[0].rank', 'abc')],
  ['ship crew member missing home', omit(getShip(), 'crew[0].home')],
  ['ship crew member home of wrong type', set(getShip(), 'crew[0].home', 'abc')],
  ['ship crew member home missing location', omit(getShip(), 'crew[0].home.location')],
  ['ship crew member home location of wrong type', set(getShip(), 'crew[0].home.location', ['a', 'b', 'c'])],
  ['ship crew member home location length too big', set(getShip(), 'crew[0].home.location', [1, 2, 3, 4])],
  ['ship crew member home location length too small', set(getShip(), 'crew[0].home.location', [1, 2])],
  ['ship crew member home missing mass', omit(getShip(), 'crew[0].home.mass')],
  ['ship crew member home mass of wrong type', set(getShip(), 'crew[0].home.mass', 'abc')],
  ['ship crew member home missing name', omit(getShip(), 'crew[0].home.name')],
  ['ship crew member home name of wrong type', set(getShip(), 'crew[0].home.name', true)],
  ['ship crew member home missing type', omit(getShip(), 'crew[0].home.type')],
  ['ship crew member home type incorrect', set(getShip(), 'crew[0].home.type', 'planets')],
  ['ship crew member home missing population', omit(getShip(), 'crew[0].home.population')],
  ['ship crew member home population of wrong type', set(getShip(), 'crew[0].home.population', 'abc')],
  ['ship crew member home missing habitable', omit(getShip(), 'crew[0].home.habitable')],
  ['ship crew member home habitable of wrong type', set(getShip(), 'crew[0].home.habitable', 0)],
])('%s should return false', (_, value) => {
  expect(isSpaceObject(value)).toBe(false);
});
