import React, { useState } from 'react'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import Taro, {useLoad} from '@tarojs/taro'
import './plans.css'

definePageConfig({
  navigationStyle:"custom",
  enableShareAppMessage: true
})

export default function Plans() {
  const [authorize, setauthorize] = useState('')
  const [isshow, setisshow] = useState(false)
 
  
  useLoad((props) => {
    const {id} = props;
    id?setisshow(true):''
    id?setauthorize(id):''
  })
  
  return (
    <>
     <>
     <View>page/index/detail</View>
     {isshow && <View className='testbox'>{authorize}</View>}
     
    </>
    </>
   
  )
}

