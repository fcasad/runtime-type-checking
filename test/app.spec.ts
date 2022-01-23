import request from 'supertest';
import { set } from 'lodash';

import { app } from '../src/app';
import { getShip } from './fixtures';

test('valid request returns success response', async () => {
  const ship = getShip();
  const response = await request(app).post('/v1/space-objects').set('Accept', 'application/json').send(ship);
  expect(response.get('Content-Type')).toMatch(/json/);
  expect(response.status).toBe(201);
  expect(response.body).toBe(null);
});

test('invalid valid request returns error response', async () => {
  const invalidShip = set(getShip(), 'crew[0].home.habitable', 0);
  const response = await request(app).post('/v1/space-objects').set('Accept', 'application/json').send(invalidShip);
  expect(response.get('Content-Type')).toMatch(/json/);
  expect(response.status).toBe(400);
  expect(response.body).toBe('Invalid space object');
});
