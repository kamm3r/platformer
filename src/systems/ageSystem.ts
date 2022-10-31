import { useFrame } from "@react-three/fiber"
import { archetype } from "miniplex"
import { queueDestroy } from "../actions"
import { ECS } from "../ecs"


const withLifetime = ECS.world.where(archetype("lifetime"))

export const AgeSystem = (): void => {
    useFrame((_, dt) => {
        for (const entity of withLifetime) {
            /* Skip if entity is already marked for destruction. */
            if (entity.destroy) continue

            entity.lifetime.age += dt

            /* If entity has a max age, and it's reached, mark it for destruction. */
            if (
                entity.lifetime.maxAge &&
                entity.lifetime.age >= entity.lifetime.maxAge
            ) {
                queueDestroy(entity)
            }
        }
    })
}