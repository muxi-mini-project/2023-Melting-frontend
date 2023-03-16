import React, { useState } from 'react'
import {RichText, View, Image, Button} from '@tarojs/components'
import Request from '../../../api/request/Request'
import Taro, { useLoad } from '@tarojs/taro'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import './gameCard.css'
import './gameCard.css'
import '../details/details.css'

definePageConfig({
  navigationStyle:"custom",
  enableShareAppMessage: true
})

export default function gameCard() {
    const [lists, setlists] = useState('')
    const [page, setpage] = useState('')
    let Token = Taro.getStorageSync('token')
    let realList = []
    useLoad((props) => {
    
      var {list} = props
       if(list) {
        let newlists = [...list]
        console.log(newlists);
        setlists([...newlists])
        
       }
       Detail()
      })
    
    async function Detail() {
      Taro.request({
          url:`http://116.204.121.9:65000/api/v1/project/games/details?game_id=${Taro.getStorageSync(`key`)[0]}`,
          method:'GET',
          header: {
            'Authorization': Taro.getStorageSync('token'),
              'Content-Type': 'application/json',
              'Accept': '*/*',
          },
        }).then((res) => {
          switch(Taro.getStorageSync(`key`)[0]) {
            case 1: 
              if(Taro.getStorageSync(`key`)[1] === '恐怖')
               setpage(res.data.info.恐怖)
              else
                setpage(res.data.info.非恐)
              break;
            default: 
              setpage(res.data.info)
              console.log('detail',res.data.info);
              break;
          }
          
        })
        
    }
    if(page) {
      realList = page.split('\n')
      console.log('liststtststststst',realList);
    }
  return (
    <View >

      {/* 导航栏 */}
      <Navbar src = "/game/title.png" color = '#BCDEFF' wid = '32vw' from = 'game'></Navbar>

      <View className='bg'></View>
        {/* 按钮部分 */}
        <View className='gamecardbox'>
        {Taro.getStorageSync('key')[0] === 1 && <View className='gameCard-grid'>
            {realList.map((item,index)=>{
              item[0]<=9?console.log(item[0]):'';
              return (
                <View>
                  {item[0]<=9?<View className='placeholder'></View>:''}
                  {item[0] == '汤'?<View className='placeholder_small'></View>:''}
                  <View>{item}</View>
                </View>
              )
            })}
        </View>}
        {Taro.getStorageSync('key')[0] !== 1 && <View className='gameCard-grid'>
            {realList.map((item,index)=>{
              if (index < Taro.getStorageSync('key')[1])
              return (
                <View>
                  <View className='placeholder'></View>
                  {item[0] == '汤'?<View className='placeholder_small'></View>:''}
                  <View>{item}</View>
                </View>
              )
            })}
        </View>}
        </View>
        <View className="gameboxbutton" onClick={()=>{
          Taro.setClipboardData({
            data: page,
            success: function (res) {
              Taro.getClipboardData({
                success: function (res) {
                  Taro.showToast({
                    title: '复制成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
          })
        }}>复制</View>
        <Image className='gameimage' src={require('../../../image/game/snowman.png')}></Image>
    
    </View>
      
    
    
    
  )
}
