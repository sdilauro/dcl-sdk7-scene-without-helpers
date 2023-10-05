import { Animator, GltfContainer, InputAction, MeshCollider, Transform, VideoPlayer, engine, pointerEventsSystem } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"
import { animations } from "../../utils/config"


export function wolf(position: Vector3, rotation: number) {
    let i: number = 0
    const wolf = engine.addEntity()
    Transform.create(wolf, { position: position, rotation: Quaternion.fromEulerDegrees(0, rotation, 0) })
    MeshCollider.create(wolf, { mesh: { $case: "box", box: { uvs: [] } } })

    GltfContainer.create(wolf, {
        src: 'assets/models/wolf/Wolf.gltf'
    })

    Animator.create(wolf, {
        states: [
            {
                clip: animations[0],
                playing: true,
                loop: true
            },
            {
                clip: animations[1],
                playing: true,
                loop: true
            },
            {
                clip: animations[2],
                playing: true,
                loop: true
            },
            {
                clip: animations[3],
                playing: true,
                loop: true
            },
            {
                clip: animations[4],
                playing: true,
                loop: true
            },
        ]
    })

    pointerEventsSystem.onPointerDown(

        {
            entity: wolf,
            opts: {
                button: InputAction.IA_POINTER,
                maxDistance: 20,
                hoverText: "Next animation"
            }
        },

        function () {
            if (i < animations.length - 1) {
                i = i + 1
            } else {
                i = 0
            }
            Animator.playSingleAnimation(wolf, animations[i])
            console.log(animations[i])
        })

    return wolf
}