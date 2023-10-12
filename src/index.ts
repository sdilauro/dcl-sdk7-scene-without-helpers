import { Billboard, ColliderLayer, engine, InputAction, inputSystem, Material, MeshCollider, MeshRenderer, PointerEvents, pointerEventsSystem, PointerEventType, RaycastQueryType, RaycastResult, raycastSystem, Schemas, TextShape, Transform } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { TimerComponent } from './components/index'



export function main() {

    let playing: Boolean = false
    let paused: Boolean = false
    let points_value: number = 0



    const RAY_INTERVAL = 1


    const Points = engine.addEntity()
    const Cube = engine.addEntity()
    const Pivot = engine.addEntity()
    const Tower = engine.addEntity()
    const Lamp = engine.addEntity()
    const Ray = engine.addEntity()
    const RaycastEntity = engine.addEntity()
    const PlayerCollider = engine.addEntity()
    const Timer = engine.addEntity()

    TimerComponent.create(Timer, { t: 0 })


    MeshCollider.create(PlayerCollider, { mesh: { $case: "box", box: { uvs: [] } }, collisionMask: ColliderLayer.CL_CUSTOM1 })
    Transform.create(PlayerCollider, { parent: engine.PlayerEntity, scale: Vector3.create(1, 2, 1) })
    Transform.createOrReplace(RaycastEntity, { parent: Pivot })

    engine.addSystem((dt) => {
        let rotation = Transform.getMutable(Pivot).rotation
        let position = Transform.getMutable(Pivot).position
        if (playing && !paused) {
            Transform.createOrReplace(
                Pivot,
                {
                    position: position,
                    rotation: Quaternion.multiply(
                        rotation,
                        Quaternion.fromAngleAxis(dt * 50, Vector3.Up())
                    )
                }
            )
        }

    })

    engine.addSystem((dt) => {
        for (const [entity] of engine.getEntitiesWith(TimerComponent)) {
            const timer = TimerComponent.getMutable(entity)
            timer.t = timer.t + dt

            if (timer.t > RAY_INTERVAL) {
                timer.t = 0
                raycastSystem.registerLocalDirectionRaycast(
                    {
                        entity: Pivot,
                        opts: {
                            queryType: RaycastQueryType.RQT_HIT_FIRST,
                            direction: Vector3.Forward(),
                            maxDistance: 5.5,
                            collisionMask: ColliderLayer.CL_CUSTOM1
                        },
                    },
                    function (raycastResult) {
                        if (playing && !paused) {
                            if (raycastResult.hits.length > 0) {
                                console.log(raycastResult.hits)
                                stopGame()

                            } else {
                                points_value = points_value + 1
                                TextShape.createOrReplace(Points, { text: String(points_value) })
                            }
                        }

                    }
                )
            }
        }
    })

    Transform.create(Pivot, { position: Vector3.create(8, 0.5, 8) })

    Transform.createOrReplace(Tower, {
        scale: Vector3.create(1, 2, 1),
        parent: Pivot
    })
    MeshRenderer.create(Tower, { mesh: { $case: "cylinder", cylinder: { radiusTop: .5, radiusBottom: 0.5 } } })


    Transform.createOrReplace(Lamp, {
        position: Vector3.create(0, 1, 0),
        parent: Pivot
    })
    MeshRenderer.create(Lamp, { mesh: { $case: "sphere", sphere: {} } })
    MeshCollider.create(Lamp, { mesh: { $case: "sphere", sphere: {} } })




    Transform.createOrReplace(Ray, {
        position: Vector3.create(0, 0, 3),
        parent: Pivot,
        scale: Vector3.create(1, 5, 1),
        rotation: Quaternion.fromAngleAxis(90, Vector3.Right())
    })
    MeshRenderer.create(Ray, { mesh: { $case: "cylinder", cylinder: { radiusBottom: 0.1, radiusTop: 0.1 } } })

    Transform.create(Cube, { position: Vector3.create(6, 0.5, 6) })
    MeshRenderer.create(Cube, { mesh: { $case: "box", box: { uvs: [] } } })
    MeshCollider.create(Cube, { mesh: { $case: "box", box: { uvs: [] } } })

    TextShape.create(Points, { text: String(points_value), fontSize: 5 })
    Transform.create(Points, { parent: Lamp, position: Vector3.create(0, 1, 0) })
    Billboard.create(Points)


    PointerEvents.create(Lamp, {
        pointerEvents: [
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_PRIMARY,
                    showFeedback: true,
                    hoverText: "Pause/Resume Game",
                    maxDistance: 8
                },

            },
            {
                eventType: PointerEventType.PET_DOWN,
                eventInfo: {
                    button: InputAction.IA_POINTER,
                    showFeedback: true,
                    hoverText: "Start/Stop Game",
                    maxDistance: 8
                },

            }
        ]
    })

    engine.addSystem(() => {
        if (inputSystem.isTriggered(InputAction.IA_POINTER, PointerEventType.PET_DOWN, Lamp)) {
            if (!playing && !paused) {
                startGame()
            } else if (!paused) {
                stopGame()
            }
        }
        if (inputSystem.isTriggered(InputAction.IA_PRIMARY, PointerEventType.PET_DOWN, Lamp)) {
            if (playing) {
                paused = !paused
            }
        }
    })

    function stopGame() {
        playing = false
        paused = false
        Material.setPbrMaterial(
            Lamp, {
            metallic: 2,
            roughness: 0,
            specularIntensity: 1,
            directIntensity: 0,
            emissiveColor: Color4.Red(),
            emissiveIntensity: 2
        })
        Transform.createOrReplace(
            Pivot,
            {
                position: Vector3.create(8, 0.5, 8),
                rotation: Quaternion.fromAngleAxis(0, Vector3.Up())
            }
        )
    }

    function startGame() {
        playing = true
        paused = false
        Material.setPbrMaterial(
            Lamp, {
            metallic: 2,
            roughness: 0,
            specularIntensity: 1,
            directIntensity: 0,
            emissiveColor: Color4.Green(),
            emissiveIntensity: 2
        })
        points_value = 0
        TextShape.createOrReplace(Points, { text: String(points_value) })
        Transform.createOrReplace(
            Pivot,
            {
                position: Vector3.create(8, 0.5, 8),
                rotation: Quaternion.fromAngleAxis(0, Vector3.Up())
            }
        )
    }


}


