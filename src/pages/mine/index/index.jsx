import { View, Image, Text } from '@tarojs/components'
import React, {useState} from 'react'
import MineButton from '../../../component/pages/mineButton/mineButton'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import './index.css'
import Login from '../../log/login'
import Request from '../../../api/request/Request'
import Taro, {useDidShow, useLoad} from '@tarojs/taro'

definePageConfig({
  navigationStyle:"custom"
})

export default function Mineindex() {
  const [nickName, setnickName] = useState( Taro.getStorageSync('nickName'))
  const [position, setposition] = useState( '')
  const [url, seturl] = useState( '')
  
  let Token = Taro.getStorageSync('token')
  let timer = null
  let gameList = []
  async function InfoData() {
    const info = await Request('get','/users',Token,)
      return info;
  }
  async function Req() {
    await Request('get','/users',Token,)
      gameList = await InfoData()
      console.log(gameList);
      setnickName( gameList.data.data.qq)
      setposition(gameList.data.data.position)
      seturl(gameList.data.data.photo) 
  } 
 
  useDidShow (()=>{
    if(!Token) {
      timer = setInterval(() => {
         Token = Taro.getStorageSync('token')
         gameList = InfoData()
        if(Token && gameList) {
          clearInterval(timer)
         Req()
        } else {
          InfoData()
        }
      }, 2000);
    } else {     
      Req()
    }
  })
  return (
   <View>
      {!Token && <Login></Login>}
        {/* 顶部导航栏 */}
        <View>
            <View className={!Token?'background':'background backblur'} >
            <Navbar src = "/mine/title.png" color = '' wid = '22vw'></Navbar>
              <View className='backover'></View>
              <Image src={require('../../../image/mine/back.png')} className = 'backi'></Image>
              
              {/* 信息栏 */}
              <View id='infoBox'>
                {<Image src={url?'http://'+url:require('../../../image/mine/back.png')} className='image'></Image>}
                <View id='textBox'>
                  <Text className='id'>{nickName}</Text>
                  <Text className='detail'>{position}</Text>
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

              {/* </View> */}
            
              {/* 小冰块 */}
              <View className='icebox'>
                <Image src = {require('../../../image/mine/icelittle.png')} className = 'icelittle'></Image>
                <Image src = {require('../../../image/mine/icebig.png')}  className = 'icebig'></Image>
              </View>
              
            </View>
        </View>
        
   </View>
  )
}
