import { Schemas, engine } from "@dcl/sdk/ecs";

const MoveTransportData = {
    start: Schemas.Vector3,
    end: Schemas.Vector3,
    fraction: Schemas.Float,
    speed: Schemas.Float,
}

export const LerpTransformComponent = engine.defineComponent("LerpTransformComponent", MoveTransportData)
