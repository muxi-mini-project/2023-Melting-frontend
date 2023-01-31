import { View, Image, Text } from '@tarojs/components'
import React from 'react'
import MineButton from '../../../component/pages/mineButton/mineButton'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import Request from '../../../api/request/request'
import './index.css'

definePageConfig({
  navigationStyle:"custom"
})

export default function index() {
  Request('get','http://116.204.121.9:65000/api/v1')
  return (
   <View>
        {/* 顶部导航栏 */}
        <Navbar src = "/mine/title.png" color = '' wid = '32vw'></Navbar>


        <View className='background'>
          <View className='backover'></View>
          <Image src={require('../../../image/mine/back.png')} className = 'backi'></Image>
          {/* 信息栏 */}
          <View id='infoBox'>
            <Image src='' className='image'></Image>
            <View id='textBox'>
              <Text className='id'>李华</Text>
              <Text className='detail'>666</Text>
            </View>
          </View>

          {/* 选项卡部分 */}
          <View id='navigatebar'>
            <MineButton page = 'infoEdit' name = '编辑资料'></MineButton>
            <MineButton page = 'plans' name = '我的策划案'></MineButton>
            <MineButton page = 'about' name = '关于我们'></MineButton>
          </View>

          {/* 图片部分 */}
          <View className='imagecontainer'>
            <Image className='imageToSwip' src={require('../../../image/mine/img1.png')}></Image>
            <Image className='imageToSwip' src={require('../../../image/mine/img2.png')}></Image>
          </View>

          {/* 小冰块 */}
          <View className='icebox'>
            <Image src = {require('../../../image/mine/icelittle.png')} className = 'icelittle'></Image>
            <Image src = {require('../../../image/mine/icebig.png')}  className = 'icebig'></Image>
          </View>
          
        </View>
   </View>
  )
}
