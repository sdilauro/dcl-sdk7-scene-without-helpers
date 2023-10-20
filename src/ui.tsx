import {
  engine,
  UiCanvasInformation,
  VideoEvent,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { setScreenSource, playVideo, pauseVideo, stopVideo, volUp, volDown, loopVideo } from './utils/functions'

var currentTextString = "https://gateway.pinata.cloud/ipfs/Qmd3eMnYQsgXjuhad1fdUCBnCQvzpoLKwRkMUrBDjedGtT/Cozumel%20Diving.mp4"

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}


let currentOffsetValue: number = 0
let stateValue: number = 0
let tickNumberValue: number = 0
let timestampValue: number = 0
let videoLengthValue: number = 0

let srcValue: string = ''
let playingValue:boolean = false
let positionValue: number = 0
let volumeValue: number = 1
let playbackRateValue: number = 1
let loopValue:boolean = false

let margin_left: number = 0
let margin_top: number = 0
const ui_width: number = 450
const ui_height: number = 400

const uiComponent = () => (
  <UiEntity
  uiTransform={{
    width: ui_width,
    height: ui_height,
    justifyContent: 'center',
    alignItems: 'center',
    margin: {top:margin_top, left:margin_left},
    padding: 5,
    flexDirection:'column'
  }}
  uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding:10
      }}
      uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 30,
          alignItems: 'flex-start',
        }}
        uiText={{ value: 'Last Event', fontSize: 18, textAlign: 'middle-left' }}
      />
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Current Offset:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(currentOffsetValue)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="State:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(stateValue)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Tick Number:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(tickNumberValue)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Timestamp:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(timestampValue)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Video Length:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(videoLengthValue)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />  
      </UiEntity>  
    </UiEntity>
    <UiEntity
      uiTransform={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding:10
      }}
      uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 30,
          alignItems: 'flex-start',
        }}
        uiText={{ value: 'VideoPlayer State:', fontSize: 18, textAlign: 'middle-left' }}
      />
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="SRC:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={srcValue}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Playing:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={playingValue?"true":"false"}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Position:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(positionValue)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Volume:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(Math.round(volumeValue * 100) / 100)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Playback Rate:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(playbackRateValue)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 20,
          alignItems: 'flex-start',
        }}
      >
        <Label
          uiTransform={{
            width: '40%',
            height: 20,
            alignItems: 'flex-start', 
          }}
          value="Loop:"
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-right"
        />
        <Label
          uiTransform={{
            width: '100%',
            height: 20,
            alignItems: 'flex-start',
          }}
          value={String(loopValue)}
          color={Color4.White()}
          fontSize={12}
          font="serif"
          textAlign="middle-left"
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          }}
      >
        <Input
          uiTransform={{
            width: '100%',margin:5
          }}
          value={currentTextString}
          onChange={(e) =>{ currentTextString = e }}
          fontSize={14}
          placeholder={"SRC Link to play"}
          placeholderColor={Color4.Gray()}
        />
        <Button
          uiTransform={{ width: 160, margin:5}}
          value= 'Set SRC'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            setScreenSource(currentTextString)
          }}
        />
      </UiEntity>    
      <UiEntity
        uiTransform={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          }}
      >
        <Button
          uiTransform={{ width: 160, margin:5}}
          value= 'Play'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            playVideo()
          }}
        />
        <Button
          uiTransform={{ width: 160, margin:5}}
          value= 'Pause'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            pauseVideo()
          }}
        />
        <Button
          uiTransform={{ width: 160, margin:5}}
          value= 'Stop'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            stopVideo()
          }}
        />
        <Button
          uiTransform={{ width: 160, margin:5}}
          value= 'VOL+'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            volUp()
          }}
        />
        <Button
          uiTransform={{ width: 160, margin:5}}
          value= 'VOL-'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            volDown()
          }}
        />
        <Button
          uiTransform={{ width: 160, margin:5}}
          value= 'Loop'
          variant='primary'
          fontSize={14}
          onMouseDown={() => {
            loopVideo()
          }}
        />
      </UiEntity>    
    </UiEntity>
    
  </UiEntity>
)



engine.addSystem(() => {
  let canvas = UiCanvasInformation.get(engine.RootEntity)
  margin_left = canvas.width - 15 - ui_width
  margin_top = canvas.height - 15 - ui_height

  for (const [_, value] of engine.getEntitiesWith(VideoPlayer)) {
    srcValue = value.src.length > 40 ? value.src.substring(0, 40) + "..." : value.src
    playingValue = value.playing ? value.playing : false
    positionValue = value.position ? value.position : 0
    volumeValue = value.volume ? value.volume : 1
    playbackRateValue = value.playbackRate ? value.playbackRate : 1
    loopValue = value.loop ? value.loop : false
  }
})

engine.addSystem(() => {
    for (const [_, value] of engine.getEntitiesWith(VideoEvent)) {
      for (const event of value) {
        console.log({event})
        currentOffsetValue = event.currentOffset
        stateValue = event.state
        tickNumberValue = event.tickNumber
        timestampValue = event.timestamp
        videoLengthValue = event.videoLength
      }
    }
  }
)

