import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import './gameSelect.css'
import { globalContext } from '../../../pages/game/index'
import { useContext } from 'react'
import GameSelctItem from '../gameselectitem/gameSelectItem'
// import { SwitchCard } from '../../../pages/game/index'
import { Placechild } from '../../../pages/game/index'

export default function Gameselect(props) {
  const [states, setstates] = useState(false)
  // const {state} = useContext(globalContext)
  // console.log(state);
  return (
    <View className='gameselectbox' >
        {/* 标题栏 */}
        <View className='headtit'>

            <View onClick={()=>{
              setstates(!states)
            }}>
                {props.text}
                <Image src={require('../../../image/game/arrowdown.png')} className = 'gameselectimg'></Image>
            </View>
            
        </View>
        
        {/* 选项卡 */}
        <View className={states?'boxofchildren':'boxofchildrenalt'}>
           {props.children}
        </View>
      
    </View>
  )
}
