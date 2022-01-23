import express from 'express';

import { isSpaceObject } from './validation';

const app = express();

app.use(express.json());

app.post('/v1/space-objects', (req, res) => {
  if (!isSpaceObject(req.body)) {
    return res.status(400).json('Invalid space object');
  }
  // we can now safely access the following:
  const spaceObject = req.body;
  res.status(201).json(null);
});

export { app };
