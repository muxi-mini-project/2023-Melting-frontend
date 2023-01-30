import React, { useState } from 'react'
import { View } from '@tarojs/components'
import './mineButton.css'
import Alert from '../alertpage/alertPage'

export default function MineButton(props) {
  const [state, setstate] = useState(false)
  return (
   <View className = 'minebutton' onTap={()=>{
      // Taro.redirectTo({url:`/pages/mine/${props.page}/${props.page}`})
      setstate(!state)
   }}>{props.name}
   <Alert isshow = {state} page = {props.page}></Alert>
   </View>
  )
}
