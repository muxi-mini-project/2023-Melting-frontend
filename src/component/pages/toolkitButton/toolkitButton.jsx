import React from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './toolkitButton.css'

export default function ToolkitButton(props) {
//   console.log(props.src);
  return (
   <View className = 'button' onTap={()=>{
      Taro.redirectTo({url:`/pages/toolkit/${props.page}/${props.page}`})
   }}>{props.name}
      <Image src = {require(`../../../image/toolkit/${props.page}.png`) } id='buttonImg'></Image>
      {/* <Image src = {require(`../../../pages/image/toolkit/zhi_jian.png`) }></Image> */}
   </View>
  )
}
