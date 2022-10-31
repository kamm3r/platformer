import { useFrame } from "@react-three/fiber"
import { archetype } from "miniplex"
import { ECS } from "../ecs"

const withDestroy = ECS.world.where(archetype("destroy"))

export const DestroySystem = (): void => {
    useFrame(() => {
        for (const entity of withDestroy) {
            ECS.world.remove(entity)
        }
    })
}