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
  enableShareAppMessage: true,
  disableScroll: true,
})

export default function gameCard() {
    const [lists, setlists] = useState('')
    const [page, setpage] = useState('')
    let Token = Taro.getStorageSync('token')
    let render = 0
    let realList = []
    let first = ''
    useLoad((props) => {
    
      var {list} = props
       if(list) {
        let newlists = [...list]
        // console.log(newlists);
        setlists([...newlists])
       }
       Detail()
      })
    
    async function Detail() {
      Taro.request({
          url:`https://www.melting-muxi.xyz:65000/api/v1/project/games/details?game_id=${Taro.getStorageSync(`key`)[0]}`,
          method:'GET',
          header: {
            'Authorization': Taro.getStorageSync('token'),
              'Content-Type': 'application/json',
              'Accept': '*/*',
          },
        }).then((res) => {
          console.log(res.data.data);
          let pageData = '';
          res.data.data.map((item)=>{
            if(item.Value == 'info')
             pageData = item
          })
          switch(Taro.getStorageSync(`key`)[0]) {
            case 1: 
              if(Taro.getStorageSync(`key`)[1] === '恐怖')
               setpage(pageData[1])
              else
                setpage(pageData[0])
              break;
            default: 
              setpage(pageData)
              if(!pageData)
              Taro.showModal({
                title:'抱歉',
                content:'该游戏暂不支持题卡文件生成',
                confirmText:'返回',
                showCancel:false,
                success: function (res) {
                  if (res.confirm) {
                    Taro.navigateBack()
                  }
                }
              })
              break;
          }
          
        })
        
    }
    if(page) {
      realList = page.split('\n')
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
              item[0]<9 && item[0]>1?render=render+1:''
              if(render<Taro.getStorageSync('key')[2])
              return (
                <View>
                  {item[0]<=9?<View className='placeholder'></View>:''}
                  {item[0] == '汤'?<View className='placeholder_small'></View>:''}
                  <View>{item}</View>
                </View>
              )
            })}
        </View>}
        {Taro.getStorageSync('key')[0] == 4 && <View className='gameCard-grid'>
            {realList.map((item,index)=>{
              if (item[0]==='情')
                first = item.split('：')[1]
              if(first == Taro.getStorageSync('key')[1])
              return (
                <View>
                  <View className='placeholder'></View>
                  {item[0] == '汤'?<View className='placeholder_small'></View>:''}
                  <View>{item}</View>
                </View>
              )
            })}
        </View>}
        {Taro.getStorageSync('key')[0] !== 1 && Taro.getStorageSync('key')[0] !== 4 && <View className='gameCard-grid'>
            {realList.map((item,index)=>{
              if (index <= Taro.getStorageSync('key')[1])
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
         
            Taro.showModal({
              title:'复制成功',
              content:'请返回上一页面继续选择',
              confirmText:'返回',
              showCancel:false,
              success: function (res) {
                if (res.confirm) {
                  Taro.navigateBack()
                }
              }
            })
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
        <Image className='gameimage' src={"https://s2.loli.net/2023/03/16/OH7CyAJk9ZpIKDg.png"}></Image>
    
    </View>
      
    
    
    
  )
}
