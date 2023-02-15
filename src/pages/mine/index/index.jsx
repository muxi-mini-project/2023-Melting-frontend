import { View, Image, Text } from '@tarojs/components'
import React, {useState} from 'react'
import MineButton from '../../../component/pages/mineButton/mineButton'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
// import Request from '../../../api/request/Request'
import './index.css'
import Login from '../../log/login'
import Request from '../../../api/request/Request'
import Taro, {useDidShow} from '@tarojs/taro'
import getInfo from '../../../api/request/getInfo'

import Put from '../../../api/request/Put'
definePageConfig({
  navigationStyle:"custom"
})

export default function index() {
  const [nickName, setnickName] = useState( Taro.getStorageSync('nickName'))
  const [position, setposition] = useState( '')
  
  let Token = Taro.getStorageSync('token')
  let timer = null
  let gameList = []
  const InfoData = () => Request('get','/users',Token,)
  // Taro.usePullDownRefresh()
  
  useDidShow (()=>{
    if(!Token) {
      timer = setInterval(() => {
         Token = Taro.getStorageSync('token')
         gameList = Taro.getStorageSync('list')
        if(Token && gameList) {
          clearInterval(timer)
          setnickName( gameList.qq)
          setposition( gameList.position)
          // console.log('返回1：',nickName,gameList); 
          Taro.setStorageSync('list',gameList)
        } else {
          InfoData()
        }
      }, 2000);
     
      // console.log('timing',Token);
    } else {
      Request('get','/users',Token,)
      setTimeout(()=>{
        gameList =Taro.getStorageSync('list')
        setnickName( gameList.qq)
        setposition(gameList.position)
        Taro.setStorageSync('list',gameList)
      console.log('返回2：',gameList);
      },1000)
      
    }
    
    // getInfo(Tok
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
                {<Image src={Taro.getStorageSync('url')?'http://'+Taro.getStorageSync('url'):'../../../image/mine/back.png'} className='image'></Image>}
                <View id='textBox'>
                  <Text className='id'>{Taro.getStorageSync('list').qq}</Text>
                  <Text className='detail'>{Taro.getStorageSync('list').position}</Text>
                </View>
              </View>

              {/* <View className='info-bottom'> */}
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
