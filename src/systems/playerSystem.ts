import { useFrame } from "@react-three/fiber"
import { tagged, With } from "miniplex"
import { Vector3 } from "three"

import { ECS, Entity } from "../ecs"
import { spawnBullet } from "../entities/bullet"
import { useKeyboard } from "../utils/keyboard"

const tmpVec3 = new Vector3()

/* Create a type specifically for our player entity. */
export type Player = With<Entity, "isPlayer" | "transform" | "physics">

/* Create a predicate that narrows the type to the above. */
export const isPlayer = tagged<Player>("isPlayer")

const players = ECS.world.where(isPlayer)

let lastFireTime = 0

export const PlayerSystem = () => {
    const keyboard = useKeyboard()

    useFrame((_, dt) => {
        const [player] = players
        if (!player) return

        const input = {
            thrust: keyboard.getAxis("KeyS", "KeyW"),
            rotate: keyboard.getAxis("KeyA", "KeyD"),
            fire: keyboard.getKey("Space")
        }

        /* Forward thrust */
        if (input.thrust) {
            tmpVec3
                .set(0, input.thrust * 20, 0)
                .applyQuaternion(player.transform.quaternion)

            player.physics.velocity.addScaledVector(tmpVec3, dt)
            player.physics.sleeping = false
        }

        /* Rotation */
        if (input.rotate) {
            player.physics.angularVelocity.z -= input.rotate * 10 * dt
            player.physics.sleeping = false
        }

        /* Firing */
        const now = performance.now()
        if (input.fire && now > lastFireTime + 65) {
            lastFireTime = now
            spawnBullet()
        }
    })
}