import {
  Animator,
  engine,
  UiText,
  VideoEvent,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Dropdown, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { animations } from './utils/config'

var currentTextString = ""

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

let src_value: string = ''
let playing_value:boolean = false
let position_value: number = 0
let volume_value: number = 1
let playbackRate_value: number = 1
let loop_value:boolean = false





const uiComponent = () => (
  
  <UiEntity
    uiTransform={{
      width: 400,
      height: 275,
      margin: '16px 0 8px 270px',
      padding: 10,
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
  >
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
          value={src_value}
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
          value={playing_value?"True":"False"}
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
          value={String(position_value)}
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
          value={String(volume_value)}
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
          value={String(playbackRate_value)}
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
          value={String(loop_value)}
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
          onChange={(e) =>{ currentTextString = e }}
          fontSize={14}
          placeholder={"SRC Link to play"}
          placeholderColor={Color4.Gray()}
        />
        <Button
          uiTransform={{ width: 160, margin:5}}
          value= 'Play'
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
      </UiEntity>      
    </UiEntity>
  </UiEntity>
)

function setScreenSource(link: string) {
  for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
    const videoPlayer = VideoPlayer.getMutableOrNull(entity)
    if (videoPlayer) {
      videoPlayer.src = link
      videoPlayer.playing = true
    }
  }
}

engine.addSystem(() => {
  for (const [_, value] of engine.getEntitiesWith(VideoPlayer)) {
    src_value = value.src.length>50 ? value.src.substring(0,50)+"..." : value.src
    playing_value = value.playing ? value.playing : false
    position_value = value.position ? value.position : 0
    volume_value = value.volume ? value.volume : 1
    playbackRate_value = value.playbackRate ? value.playbackRate : 1
    loop_value = value.loop ? value.loop : false
  }

})

