import { Schemas, engine } from "@dcl/sdk/ecs";

export const TimerComponent = engine.defineComponent(
    "TimerComponent",
    {
        t: Schemas.Float,
    })