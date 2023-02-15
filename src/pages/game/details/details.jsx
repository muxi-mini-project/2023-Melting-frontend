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

definePageConfig({
  navigationStyle:"custom"
})

function Item({ style, index }) {
  return (
    <View
    className="item"
    style={{
      ...style,
      backgroundColor: index % 2 === 0 ? 'burlywood' : 'cadetblue'
    }}
  >
    {index}
  </View>
  )
}

export default function detail() {
  const [lists, setlists] = useState([])
  const [alertName, setalertName] = useState('')
  const list = new Array(10000).fill(0).map((item, i) => i);
  // const [list, setList] = useState(
  //   new Array(1000).fill(0).map(() => faker.lorem.paragraph())
  // );
  useLoad((props) => {
    
    var {list} = props
    console.log(list);
    let newlists = [...list.split(',')]
    setlists([...newlists])
    // console.log(lists);
  })
  
  
  setTimeout(() => {
    // console.log('lists:',lists);
  }, 0);
  
  return (
    <View >

      {/* <Alert></Alert> */}
      {/* 导航栏 */}
      <Navbar src = "/game/title.png" color = '#f2e7b9' wid = '32vw' from = 'game'></Navbar>

      <View className='bg'></View>
      {/* 选项卡 */}
      <View className='swipercon'>
      
        
       <FixedSizeList
        containerHeight={700}
        itemCount={list.length}
        itemHeight={.1}
        list = {lists}
      >
       
      </FixedSizeList>
      </View>
      
    
    
      {/* 按钮部分 */}
      <GameButton text1 = '生成题卡文件' url1 = '/details/details' text2 = '完成' url2 = '/index/index'></GameButton>

      {/* 图片部分 */}
      <Image className='gameimage' src={require('../../../image/game/snowman.png')}></Image>
    </View>
  )
}
