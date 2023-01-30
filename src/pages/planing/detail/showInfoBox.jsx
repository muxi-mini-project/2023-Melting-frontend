import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,Textarea} from '@tarojs/components'
import { useState ,useEffect} from 'react';
import './index.css'

let teamName='木犀团队'
let time='本周末(10.9)上午10:00'
let where='南湖综合楼n517'
let activity='迎新活动'
let goal='新老成员交流感情'
let thingToprepare='花生瓜子'
let infotext=`\xa0\xa0\xa0\xa0\xa0\xa0\xa0欢迎大家加入${teamName},我们将于${time}在${where}举行${activity},旨在${goal}。届时请备好${thingToprepare},准时出席!`

function copy(){
    Taro.setClipboardData({
        data: infotext,
        success: function (res) {
          Taro.getClipboardData({
            success: function (res) {
              console.log(res.data) // data
            }
          })
        }
      })
}
export default function showInfoBox(props){
    return(
        <View>
        
            
            <View className='InfoContentBox'>
                <Text className='InfoContentTitile'>通知</Text>
                <Image className='closeicon' src={require('../../../image/planing/closeicon.png')} onClick={()=>{props.setInfoTextshowOrnot(false)}}></Image>
                <Text className='InfoContent'>{infotext}</Text>
                <Image className='changeicon' src={require('../../../image/planing/changeicon.png')} onClick></Image>
            </View>
            
            
            <Button className='copybtn' onClick={copy}>复制</Button>
        
            <View className='drawer_screen'></View>

        </View>
    )
}