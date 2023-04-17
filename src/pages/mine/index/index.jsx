import { View, Image, Text } from '@tarojs/components'
import React, {useState} from 'react'
import MineButton from '../../../component/pages/mineButton/mineButton'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import './index.css'
import Login from '../../log/login'
import Request from '../../../api/request/Request'
import Taro, {useDidShow, useLoad} from '@tarojs/taro'

definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
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
      // console.log(gameList);
      setnickName( gameList.data.data.qq)
      setposition(gameList.data.data.position)
      seturl(gameList.data.data.photo) 
  } 
 
  useDidShow (()=>{
    let pages = Taro.getCurrentPages();
    let currPage = pages[pages.length - 1]; // 获取当前页面
    if (currPage.__data__.holder) { // 获取值
      // this.setState({ holder: currPage.__data__.holder })
      // console.log(currPage.__data__.holder);
    } 
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
              <Image src={"https://s2.loli.net/2023/03/16/eINlqaMSjbV2RhW.jpg"} className = 'backi'></Image>
              
              {/* 信息栏 */}
              <View id='infoBox'>
                {<Image src={url?'http://'+url:''} className='image'></Image>}
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
                      <Image className='imageToSwip' src={"https://s2.loli.net/2023/03/16/mUOexVIl1fzsqWh.png"}></Image>
                      <Image className='imageToSwip' src={"https://s2.loli.net/2023/03/16/KT1CLcE4w5U3aWt.png"}></Image>
                    </View>

              {/* </View> */}
            
              {/* 小冰块 */}
              <View className='icebox'>
                <Image src = {"https://s2.loli.net/2023/03/16/SIBdwhOisUWJQzD.png"} className = 'icelittle'></Image>
                <Image src = {"https://s2.loli.net/2023/03/16/lu9qcSFn631PETO.png"}  className = 'icebig'></Image>
              </View>
              
            </View>
        </View>
        
   </View>
  )
}
