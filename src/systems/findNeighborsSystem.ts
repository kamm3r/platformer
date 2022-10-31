import { useFrame } from "@react-three/fiber"
import { archetype } from "miniplex"
import { ECS } from "../ecs"
import { getEntitiesInRadius } from "./spatialHashingSystem"

const entities = ECS.world.where(
    archetype("transform", "physics", "neighbors", "spatialHashing")
)

export const FindNeighborsSystem = (): void => {
    useFrame(() => {
        for (const entity of entities) {
            /* If the body is sleeping, skip it */
            if (entity.physics.sleeping) continue

            getEntitiesInRadius(
                entity.transform.position,
                Math.max(2, entity.physics.radius * 2),
                Infinity,
                entity.neighbors
            )
        }
    })
}