import { Vector3 } from 'three';
import { AgeSystem } from './systems/ageSystem';
import { AsteroidsSystem } from './systems/asteroidsSystem.';
import { CameraRigSystem } from './systems/cameraRigSystem';
import { DestroySystem } from './systems/destroySystem';
import { FindNeighborsSystem } from './systems/findNeighborsSystem';
import { PhysicsSystem } from './systems/physicsSystem';
import { PlayerSystem } from './systems/playerSystem';
import { SpatialHashingSystem } from './systems/spatialHashingSystem';

export const Systems = () => (
  <>
    <AgeSystem />
    <SpatialHashingSystem />
    <FindNeighborsSystem />
    <PhysicsSystem />
    <PlayerSystem />
    <AsteroidsSystem />
    <CameraRigSystem offset={new Vector3(0, -20, 30)} />
    <DestroySystem />
  </>
);
