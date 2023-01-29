import { View, Image } from '@tarojs/components'
import React from 'react'
import Alert from '../../../component/pages/alertpage'
import GameButton from '../../../component/pages/gameButton'
import Games from '../../../component/pages/games'
import Navbar from '../../../component/pages/navbarTop'
import './details.css'



definePageConfig({
  navigationStyle:"custom"
})



export default function detail() {
  return (
    <View >

      {/* <Alert></Alert> */}
      {/* 导航栏 */}
      <Navbar src = "/game/title.png" color = '#f2e7b9' wid = '32vw' from = 'game'></Navbar>

      <View className='bg'></View>
      {/* 选项卡 */}
      <View className='swipercon'>
        <Games name = 'jdi' number ='6' time = '30' place = '1' class = 'dhwq' tools = 'null' rules = 'null'></Games>
        <Games name = 'jdim' number ='6' time = '30' place = '1' class = 'dhwq' tools = 'null' rules = 'nuqefqweeqwrfwqfasfasddqwdqwdll'></Games>
        <Games name = 'jdcwi' number ='6' time = '30' place = '1' class = 'dhwq' tools = 'null' rules = 'null'></Games>
        <Games name = 'jdicawq' number ='6' time = '30' place = '1' class = 'dhwq' tools = 'null' rules = 'null'></Games>
        <Games name = 'jdiawe' number ='6' time = '30' place = '1' class = 'dhwq' tools = 'null' rules = 'hdoiqwhgfoqiwhfhdoiqwhgfoqiwhfhdoiqwhgfoqiwhhdoiqwhgfoqiwhfhdoiqwhgfoqiwhfhdoiqwhgfoqiwhhdoiqwhgfoqiwhfhdoiqwhgfoqiwhfhdoiqwhgfoqiwhhdoiqwhgfoqiwhfhdoiqwhgfoqiwhfhdoiqwhgfoqiwhf'></Games>
      </View>
      
    
    
      {/* 按钮部分 */}
      <GameButton text1 = '生成题卡文件' url1 = '/details/details' text2 = '完成' url2 = '/index/index'></GameButton>

      {/* 图片部分 */}
      <Image className='gameimage' src={require('../../../image/game/snowman.png')}></Image>
    </View>
  )
}
