import { SpaceObject } from './types';
import { SpaceObjectRunType } from './runtypes';

export function isSpaceObject(x: unknown): x is SpaceObject {
  return SpaceObjectRunType.guard(x);
}
