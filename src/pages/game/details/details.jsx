import { View, Image } from '@tarojs/components'
import React from 'react'
import {useLoad} from '@tarojs/taro'
import GameButton from '../../../component/pages/gameButton/gameButton'
import Games from '../../../component/pages/games/games'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import './details.css'
import { useState, useRef, useEffect } from 'react'
import Alert from '../../../component/pages/alertPage/alertPage'
import FixedSizeList from '../../../component/pages/form/form'
import '../index/index.css'

definePageConfig({
  navigationStyle:"custom"
})



export default function detail() {
  const [lists, setlists] = useState([])
  const [alertName, setalertName] = useState('')
  const [project_id, setproject_id] = useState(0)
  const list = new Array(10000).fill(0).map((item, i) => i);
  useLoad((props) => {
    
    var {list,project_id} = props
   if( list) {
    let newlists = [...list.split(',')]
    console.log(newlists);
    setlists([...newlists])
    
   }
   console.log(project_id);
   setproject_id(project_id,()=>console.log('iddddddddddddddddddd',project_id))
  })
  
  
  
  return (
    <View >

      {/* 导航栏 */}
      <Navbar src = "/game/title.png" color = '#BCDEFF' wid = '32vw' from = 'game'></Navbar>

      <View className='bg'></View>
      {/* 选项卡 */}
      <View className='swipercon'>
      
       <FixedSizeList
        containerHeight={700}
        itemCount={list.length}
        itemHeight={.1}
        list = {lists}
        project_id = {project_id}
      >
       
      </FixedSizeList>
      </View>
      
    
    
      {/* 按钮部分 */}
      <GameButton text1 = '生成题卡文件' url1 = {`/gameCard/gameCard`} text2 = '完成' url2 = '/index/index'></GameButton>

      {/* 图片部分 */}
      <Image className='gameimage' src={require('../../../image/game/snowman.png')}></Image>
    </View>
  )
}
