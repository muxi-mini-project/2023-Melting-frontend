import React, {useEffect} from 'react'
import { View, Image, Text } from '@tarojs/components'
import './games.css'

import Swiper from '../swiper/swiper'

export default function Games(props) {
  
  return (

    <>
    <Swiper>
      <View className='gameInfoBox' >
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
