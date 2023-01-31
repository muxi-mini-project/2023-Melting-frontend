import React, {useEffect} from 'react'
import { View, Image, Text } from '@tarojs/components'
import './games.css'

import Swiper from '../swiper/swiper'
import { useState } from 'react'
import Taro from '@tarojs/taro'

export default function Games(props) {
  const [click, setClick] = useState(props.clickable)
  return (

    <>
    <Swiper>
      <View className='gameInfoBox' onClick={()=>{
        if(click) {
          Taro.redirectTo({url:`/pages/game/index/index`})
        }
        
      }}>
          <View className='checked'></View>
          <View className='gameName'>{props.name}</View>
          <View className='gameInfo'>适宜人数：{props.number} 时间：{props.time} 地点：{props.place}</View>
          <View className='gameInfo'>分类：{props.class}</View>
          <View className='gameInfo'>道具：{props.tools}</View>
          <View className='gameInfo'>游戏规则： {props.rules}</View>
      </View>
    </Swiper>
    
    </> 

  )
}
