import {
  Animator,
  engine,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Dropdown, Input, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { animations } from './utils/config'

var currentTextString = ""

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

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
        alignItems: 'center',
        justifyContent: 'space-around',
        padding:10
      }}
      uiBackground={{ color: Color4.fromHexString("#70ac76ff") }}
    >
      <UiEntity
        uiTransform={{
          width: '100%',
          height: 80,
          
        }}
        uiBackground={{
          textureMode: 'center',
          texture: {
            src: 'images/scene-thumbnail.png',
          },
        }}
        uiText={{ value: 'SDK7', fontSize: 18 }}
      />
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
        <Label
          uiTransform={{ width: 160, height:20 }}
          value= 'Wolf animation'
          fontSize={14}
          color={Color4.Black()}
         
        />
        <Dropdown
          options= {["Run", "Walk", "Creep", "Idle", "Site"]}
          uiTransform={{
            width: '100%', margin:5
          }}
          onChange={selectAnim}
          fontSize={14}
        />
      </UiEntity>      
    </UiEntity>
  </UiEntity>
)

function selectAnim(index: number) {
  for (const [entity] of engine.getEntitiesWith(Animator)) {
    const animator = Animator.getMutableOrNull(entity)
    if (animator) {
      Animator.playSingleAnimation(entity, animations[index])
    }
}
}


function setScreenSource(link: string) {
  for (const [entity] of engine.getEntitiesWith(VideoPlayer)) {
    const videoPlayer = VideoPlayer.getMutableOrNull(entity)
    if (videoPlayer) {
      videoPlayer.src = link
      videoPlayer.playing = true
    }
  }
}

