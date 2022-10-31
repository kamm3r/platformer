import { Entity } from '../ecs';

export const RenderableEntity = (props: { entity: Pick<Entity, 'render'> }) => (
  <>{props.entity.render}</>
);
