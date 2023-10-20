import { engine, VideoPlayer } from "@dcl/sdk/ecs"

export function setScreenSource(link: string) {
    for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
        const videoPlayer = VideoPlayer.getMutableOrNull(entity)
        if (videoPlayer) {
            videoPlayer.src = link
        }
    }
}

export function playVideo() {
    for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
        const videoPlayer = VideoPlayer.getMutableOrNull(entity)
        if (videoPlayer) {
            videoPlayer.playing = true
        }
    }
}

export function loopVideo() {
    for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
        const videoPlayer = VideoPlayer.getMutableOrNull(entity)
        if (videoPlayer) {
            if (videoPlayer.loop) {
                videoPlayer.loop = !videoPlayer.loop
            } else { videoPlayer.loop = true }
        }
    }
}

export function pauseVideo() {
    for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
        const videoPlayer = VideoPlayer.getMutableOrNull(entity)
        if (videoPlayer) {
            videoPlayer.playing = false
        }
    }
}

export function stopVideo() {
    for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
        const videoPlayer = VideoPlayer.getMutableOrNull(entity)
        if (videoPlayer) {
            videoPlayer.playing = false
            videoPlayer.position = 0
        }
    }
}

export function volUp() {
    for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
        const videoPlayer = VideoPlayer.getMutableOrNull(entity)
        if (videoPlayer) {
            if (videoPlayer.volume) {
                if (videoPlayer.volume <= 0.9) {
                    videoPlayer.volume = videoPlayer.volume + 0.01
                } else { videoPlayer.volume = 1 }
            } else { videoPlayer.volume = 1 }
        }
    }
}

export function volDown() {
    for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
        const videoPlayer = VideoPlayer.getMutableOrNull(entity)
        if (videoPlayer) {
            if (videoPlayer.volume) {
                if (videoPlayer.volume >= 0.1) {
                    videoPlayer.volume = videoPlayer.volume - 0.01
                } else { videoPlayer.volume = 0.001 }
            } else { videoPlayer.volume = 1 }
        }
    }
}
