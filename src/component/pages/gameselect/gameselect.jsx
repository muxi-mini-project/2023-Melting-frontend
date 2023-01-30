import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import './gameSelect.css'

export default function Gameselect(props) {
  const [state, setstate] = useState(true)
  return (
    <View className='gameselectbox' >
        {/* 标题栏 */}
        <View className='headtit'>

            <View onClick={()=>{
              setstate(!state)
            }}>
                {props.text}
                <Image src={require('../../../image/game/arrowdown.png')} className = 'gameselectimg'></Image>
            </View>
            
        </View>
        
        {/* 选项卡 */}
        <View className={state?'boxofchildren':'boxofchildrenalt'}>
            {props.children}
        </View>
      
    </View>
  )
}
