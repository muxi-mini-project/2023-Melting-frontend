import { View, Image } from '@tarojs/components'
import './index.css'
import React, { useEffect } from 'react'
import ToolkitButton from '../../../component/pages/toolkitButton/toolkitButton'
import Navbar from '../../../component/pages/navbarTop/navbarTop'

definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})

export default function Toolkit() {
  return (
    <View>
      <Navbar src = '/toolkit/title.png' color = '#b3d5f1' wid = '36vw'></Navbar>
      <View id='back'>
        {/* <ToolkitButton page = 'fingerTop' name = '指尖模式'></ToolkitButton> */}
        {/* <ToolkitButton page = 'dice' name = '骰子'></ToolkitButton> */}
        <View className='toolkitbox'>
          <ToolkitButton page = 'random' name = '随机数字'></ToolkitButton>
          <ToolkitButton page = 'plate' name = '轮盘'></ToolkitButton>
        </View>
        
        {/* <ToolkitButton page = 'cardTurn' name = '翻卡片'></ToolkitButton> */}
      </View>
      <Image src={"https://s2.loli.net/2023/03/16/2flgNWybMmHRPk6.png"} id = 'backimg'></Image>
    </View>
   
  )
}
