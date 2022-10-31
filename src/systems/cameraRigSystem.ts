import { useFrame } from "@react-three/fiber"
import { archetype } from "miniplex"
import { Vector3 } from "three"
import { ECS } from "../ecs"

const bodyTarget = new Vector3()
const lookTarget = new Vector3()

const players = ECS.world.where(archetype("isPlayer", "transform"))
const cameras = ECS.world.where(archetype("isCamera", "transform"))

export const CameraRigSystem = ({
    offset = new Vector3()
}: {
    offset?: Vector3
}): void => {
    useFrame((_, dt) => {
        const [player] = players
        const [camera] = cameras

        if (!player || !camera) return

        bodyTarget.copy(player.transform.position).add(offset)
        lookTarget.copy(camera.transform.position).sub(offset)

        camera.transform.position.lerp(bodyTarget, dt * 2)
        camera.transform.lookAt(lookTarget)
    })
}