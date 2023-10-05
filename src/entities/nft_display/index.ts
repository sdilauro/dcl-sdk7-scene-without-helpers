import { engine, Transform, NftShape, MeshCollider, PBMeshCollider, pointerEventsSystem, InputAction, PointerEvents, VideoPlayer, Entity } from "@dcl/sdk/ecs"
import { Quaternion, Vector3 } from "@dcl/sdk/math"


export function nftDisplay(position: Vector3, urn: string, rotation: number, scale: number, file: string) {
    const collider = engine.addEntity()
    Transform.create(collider, {
        position: position,
        scale: Vector3.create(2, 2, 1),
        rotation: Quaternion.fromEulerDegrees(0, rotation, 0)
    })
    MeshCollider.create(collider, { mesh: { $case: "plane", plane: { uvs: [] } } })



    const nft = engine.addEntity()

    Transform.create(nft, {
        position: position,
        scale: Vector3.create(scale, scale, 1),
        rotation: Quaternion.fromEulerDegrees(0, rotation, 0)
    })

    NftShape.create(nft, {
        urn: urn,
    })

    pointerEventsSystem.onPointerDown(

        {
            entity: collider,
            opts: {
                button: InputAction.IA_POINTER,
                maxDistance: 20,
                hoverText: "Select movie"
            }
        },

        function () {
            for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
                const videoPlayer = VideoPlayer.getMutableOrNull(entity)
                if (videoPlayer) {
                    videoPlayer.src = file
                }
            }

        })


    return nft
}
