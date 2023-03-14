import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import './gameSelect.css'


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
            }} >
                {props.text}
                <Image src={require('../../../image/game/arrowdown.png')} className = {states?'gameselectimg  select-noshow':'gameselectimg select-didshow'}></Image>
            </View>
            
        </View>
        
        {/* 选项卡 */}
        <View className={states?'boxofchildren noalt':'boxofchildren alt'} >
           {props.children}
        </View>
      
    </View>
  )
}
