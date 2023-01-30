import { View, Image } from '@tarojs/components'
import './index.css'
import React, { useEffect } from 'react'
import ToolkitButton from '../../../component/pages/toolkitButton/toolkitButton'
import Navbar from '../../../component/pages/navbarTop/navbarTop'

definePageConfig({
  navigationBarTitleText: '工具箱',
  navigationStyle:"custom"
})

export default function Toolkit() {
  return (
    <View>
      <Navbar src = '/toolkit/title.png' color = '#b3d5f1' wid = '36vw'></Navbar>
      <View id='back'>
        <ToolkitButton page = 'fingerTop' name = '指尖模式'></ToolkitButton>
        <ToolkitButton page = 'dice' name = '骰子'></ToolkitButton>
        <ToolkitButton page = 'random' name = '随机数字'></ToolkitButton>
        <ToolkitButton page = 'plate' name = '轮盘'></ToolkitButton>
        <ToolkitButton page = 'cardTurn' name = '翻卡片'></ToolkitButton>
      </View>
      <Image src={require('../../../image/toolkit/back.jpg')} id = 'backimg'></Image>
    </View>
   
  )
}
