import { SpaceObject } from '../src/types';

export const getAsteroid = (): SpaceObject => ({
  type: 'asteroid',
  name: 'Europa',
  location: [0, 12, 34],
  mass: 25,
});

export const getPlanet = (): SpaceObject => ({
  type: 'planet',
  name: 'Saturn',
  location: [22, 44, 66],
  mass: 99,
  population: 0,
  habitable: false,
});

export const getShip = (): SpaceObject => ({
  type: 'ship',
  name: 'Planet Express',
  location: [99, 99, 99],
  mass: 5,
  crew: [
    {
      name: 'Leela',
      age: 30,
      rank: 'captain',
      home: {
        type: 'planet',
        population: 8,
        habitable: true,
        location: [0, 0, 0],
        mass: 86,
        name: 'Earth',
      },
    },
  ],
});
