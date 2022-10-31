import { Suspense } from 'react';
import * as RC from 'render-composer';
import { ECS } from './ecs';
import { Environment, Loader, PerspectiveCamera } from '@react-three/drei';
import { Player } from './entities/player';
import { Systems } from './systems';
import { Perf } from 'r3f-perf';
import { Asteroids } from './entities/asteroids';
import { Bullets } from './entities/bullet';

export default function App() {
  return (
    <>
      <Loader />
      <RC.Canvas shadows dpr={1}>
        <RC.RenderPipeline>
          <RC.EffectPass>
            <RC.SMAAEffect />
          </RC.EffectPass>
          <color args={['#223']} attach='background' />
          <Suspense fallback={'loading...'}>
            <Environment preset='dawn' />

            <ambientLight intensity={0.2} />
            <directionalLight
              position={[10, 10, 30]}
              castShadow
              intensity={1}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={200}
              shadow-camera-left={-100}
              shadow-camera-right={100}
              shadow-camera-top={100}
              shadow-camera-bottom={-100}
            />

            <ECS.Entity>
              <ECS.Component name='isCamera' value={true} />
              <ECS.Component name='transform'>
                <PerspectiveCamera position={[0, 0, 1000]} makeDefault />
              </ECS.Component>
            </ECS.Entity>

            <Player />
            <Asteroids />
            <Bullets />

            <Systems />

            <Perf position='bottom-right' matrixUpdate />
          </Suspense>
        </RC.RenderPipeline>
      </RC.Canvas>
    </>
  );
}
