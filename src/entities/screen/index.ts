import { engine, InputAction, Material, MeshCollider, MeshRenderer, PBMaterial_PbrMaterial, PBMeshRenderer, PBVideoEvent, PointerEvents, pointerEventsSystem, Transform, VideoEvent, videoEventsSystem, VideoPlayer } from '@dcl/sdk/ecs'
import { Color3, Color4, Vector3 } from '@dcl/sdk/math'



export function screen() {

    let playing: boolean = false

    const frame = engine.addEntity()

    Transform.create(frame, { position: Vector3.create(8, 4.2, 15), scale: Vector3.create(14, 7.9, 0.5) })
    MeshRenderer.createOrReplace(frame, { mesh: { $case: 'box', box: { uvs: [] } } })
    MeshCollider.createOrReplace(frame, { mesh: { $case: 'box', box: { uvs: [] } } })
    Material.setPbrMaterial(frame, { albedoColor: Color4.Black() })

    const screen = engine.addEntity()

    MeshRenderer.createOrReplace(screen, { mesh: { $case: 'plane', plane: { uvs: [] } } })
    Transform.create(screen, { position: { x: 0, y: 0, z: -0.55 }, scale: Vector3.create(0.9, 0.9, 1), parent: frame })

    // #2
    VideoPlayer.create(screen, {
        src: 'assets/videos/starwarstrailer.mp4',
        playing: playing,
        playbackRate: 1,
        volume: 0.2,
        loop: true
    })

    // #3
    const videoTexture = Material.Texture.Video({ videoPlayerEntity: screen })

    // #4
    Material.setPbrMaterial(screen, {
        texture: videoTexture,
        roughness: 1.0,
        specularIntensity: 0,
        metallic: 0,
    })


    pointerEventsSystem.onPointerDown(

        {
            entity: frame,
            opts: {
                button: InputAction.IA_POINTER,
                maxDistance: 20,
                hoverText: VideoPlayer.getMutable(screen).playing ? "Stop" : "Play"
            }
        },

        function () {
            const t = VideoPlayer.getMutable(screen)
            t.playing = !t.playing
            const hoverFeedback = PointerEvents.getMutable(frame)
            if (hoverFeedback.pointerEvents[0].eventInfo !== undefined) {
                if (t.playing) {
                    hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Stop'
                }
                if (!t.playing) {
                    hoverFeedback.pointerEvents[0].eventInfo.hoverText = 'Play'
                }
            }


        })

    /*  engine.addSystem(() => {
 
         for (const [_, value] of engine.getEntitiesWith(VideoEvent)) {
             for (const event of value) {
                 console.log({ videoEvent: event })
             }
         }
 
     }) */

    return frame
}

