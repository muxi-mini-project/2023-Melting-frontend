import React, {useEffect} from 'react'
import { useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Swiper from '../swiper/swiper'
import './games.css'
import Alert from '../alertPage/alertPage'

export default function Games(props) {
  const [click, setClick] = useState(props.clickable)
  const [isshow, setisshow] = useState(false)
  return (

    <>
    <Swiper moveable = {click}>
      <View className='gameInfoBox' onClick={()=>{
        if(click) {
          // Taro.redirectTo({url:`/component/pages/alertPage/alertPage?name=${props.name}`})
          
          Taro.setStorageSync('key',['name','','',''])
          setisshow(!isshow)
        }
      }}>
          <View className='checked'></View>
          <View className='gameName'>{props.name}</View>
          <View className='gameInfo'>适宜人数：{props.number} 时间：{props.time} 地点：{props.place}</View>
          <View className='gameInfo'>分类：{props.class}</View>
          <View className='gameInfo'>道具：{props.tools}</View>
          <View className='gameInfo'>游戏规则： {props.rules}</View>
          
          {/* <Alert type ={1}></Alert> */}
      </View>
    </Swiper>
    {click?<Alert isshow={isshow} type={props.name}></Alert>:''}
    </> 

  )
}
