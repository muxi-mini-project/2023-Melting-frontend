import React, { useState } from 'react'
import {View} from '@tarojs/components'
import './index.css'

export default function GameSelctItem(props) {
  // const [state, setstate] = useState(initialState)
  return (
    <View className={(props.index == props.style)?'gameselectitem custom ':'gameselectitem alter'}>{props.text}</View>
  )
}
