import { AudioSource, AvatarAttach, Billboard, CameraModeArea, CameraType, engine, GltfContainer, InputAction, Material, MeshCollider, MeshRenderer, PBMeshCollider, PBMeshCollider_BoxMesh, PointerEvents, pointerEventsSystem, TextShape, TextureUnion, TextureWrapMode, Transform, VisibilityComponent } from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { cinema } from './entities/cinema'
import { nftDisplay } from './entities/nft_display'
import { nftBTTF, nftStarWars, stingray } from './utils/config'
import { setUVs } from './utils/functions'
import { wolf } from './entities/wolf/index'



export function main() {


    /* function machineNameSystem(dt: number) {
        let step: number = 0.1
        const bot: number = 2
        const top: number = 4
        let pos: Vector3 = Transform.getMutable(MachineName).position

        if (pos.y > top || pos.y < bot) {
            step = -step   //This is wrong: Step don't save value, is declared on each tick
        }

        Transform.getMutable(MachineName).position.y = Transform.getMutable(MachineName).position.y + step

    } */

    //engine.addSystem(machineNameSystem)

    const postersWall = engine.addEntity()
    const bucketParent = engine.addEntity()
    const popcornBucket = engine.addEntity()
    const popcornMachine = engine.addEntity()
    const popcornCollider = engine.addEntity()
    const machineName = engine.addEntity()
    const cameraForcer = engine.addEntity()
    let playing: boolean = false



    Transform.create(popcornMachine, { position: Vector3.create(2, 0, 1), scale: Vector3.create(1.5, 1.5, 1.5) })
    GltfContainer.getOrCreateMutable(popcornMachine, { src: "assets/models/machine/PopcornMachine.gltf" })
    AudioSource.create(popcornMachine, { playing: playing, loop: true, volume: 0.6, audioClipUrl: "assets/sounds/popcorn.mp3" })

    Transform.create(popcornCollider, { parent: popcornMachine, position: Vector3.create(0, .75, 0), scale: Vector3.create(1 / 1.5, 1.5, 1 / 1.5) })
    //MeshRenderer.getOrCreateMutable(PopcornCollider, { mesh: { $case: "box", box: { uvs: [] } } })
    MeshCollider.getOrCreateMutable(popcornCollider, { mesh: { $case: "box", box: PBMeshCollider_BoxMesh } })

    Transform.create(popcornBucket, {
        rotation: Quaternion.fromEulerDegrees(180, 0, 0),
        position: Vector3.create(0, 0.2, 0.1),
        parent: bucketParent
    })
    VisibilityComponent.createOrReplace(popcornBucket, { visible: false })
    GltfContainer.getOrCreateMutable(popcornBucket, { src: "assets/models/bucket/bucket.gltf" })

    AvatarAttach.create(bucketParent, { anchorPointId: 3 })

    Transform.create(cameraForcer, { parent: popcornMachine })
    CameraModeArea.create(cameraForcer, { mode: CameraType.CT_FIRST_PERSON, area: Vector3.create(3, 1, 3) })

    Transform.create(machineName, { parent: popcornMachine, position: Vector3.create(0, 2.5, 0) })

    Billboard.getOrCreateMutable(machineName, { billboardMode: 2 })
    TextShape.getOrCreateMutable(machineName, { text: `Free\nPopcorn\nhere\nvv`, fontSize: 2 })

    let Text: string = AudioSource.getMutable(popcornMachine).playing ? "Turn off" : "Start"

    pointerEventsSystem.onPointerDown(

        {
            entity: popcornCollider,
            opts: {
                button: InputAction.IA_POINTER,
                hoverText: Text,
                maxDistance: 0.75
            }
        },
        function () {
            const t = AudioSource.getMutable(popcornMachine)
            t.playing = !t.playing
            const hoverFeedback = PointerEvents.getMutable(popcornCollider)
            if (hoverFeedback.pointerEvents[0].eventInfo !== undefined) {
                if (t.playing) {
                    hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Turn Off'
                    VisibilityComponent.createOrReplace(popcornBucket, { visible: true })
                }
                if (!t.playing) {
                    hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Start'
                    VisibilityComponent.createOrReplace(popcornBucket, { visible: false })
                }
            }


        })

    cinema()


    Transform.createOrReplace(postersWall, { position: Vector3.create(0.2, 4.25, 8), scale: Vector3.create(8.5, 16, 0.2), rotation: Quaternion.fromEulerDegrees(0, 90, 90) })
    MeshRenderer.createOrReplace(postersWall, { mesh: { $case: "plane", plane: { uvs: setUVs(18, 10) } } })
    MeshCollider.createOrReplace(postersWall, { mesh: { $case: "plane", plane: { uvs: setUVs(18, 10) } } })
    Material.setPbrMaterial(
        postersWall,

        {
            texture:
                Material.Texture.Common({
                    src: 'assets/materials/bricks.png',
                    wrapMode: TextureWrapMode.TWM_REPEAT
                })
        })
    nftDisplay(Vector3.create(0.3, 2, 8), nftStarWars, 270, 4, "assets/videos/starwarstrailer.mp4")
    nftDisplay(Vector3.create(0.3, 2, 4), nftBTTF, 270, 4, "assets/videos/bttftrailer.mp4")
    nftDisplay(Vector3.create(0.3, 2, 12), stingray, 270, 4, "https://gateway.pinata.cloud/ipfs/Qmd3eMnYQsgXjuhad1fdUCBnCQvzpoLKwRkMUrBDjedGtT/Cozumel%20Diving.mp4")
    wolf(Vector3.create(8, .2, 8), 0)


}

