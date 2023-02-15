import React, { useState } from 'react'
import { View } from '@tarojs/components'
import './mineButton.css'
import Alert from '../alertpage/alertPage'
import Taro from '@tarojs/taro'

export default function MineButton(props) {
  const [state, setstate] = useState(false)
  return (
   <View className = 'minebutton' onTap={()=>{
     (props.page !== 'about' )? Taro.navigateTo({url:`/pages/mine/${props.page}/${props.page}`}):''
      setstate(!state)
   }}>{props.name}
   {props.page === 'about' && <Alert isshow = {state} type = {props.page}></Alert>}
   </View>
  )
}
