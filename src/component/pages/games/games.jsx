import React, {useEffect} from 'react'
import { useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Swiper from '../swiper/swiper'
import './games.css'
import Alert from '../alertPage/alertPage'
import Put from '../../../api/request/Put'

export default function Games(props) {
  const [click, setClick] = useState(props.clickable)
  const [isshow, setisshow] = useState(false)
  const [list,setlist] = useState(Taro.getStorageSync('gameList'))
  let gamenamelist = []
  return (

    <>
    <Swiper moveable = {click}>
      <View className='gameInfoBox' onClick={()=>{
        if(click) {
          console.log(props);
          Taro.setStorageSync('key',[props.id,'','',''])
          setisshow(!isshow)
          if (!isshow) {
            if(!Taro.getStorageSync('gameList').includes(props.id)) {
              // setlist([...Taro.getStorageSync('gameList'),props.id])
              Taro.setStorageSync('gameList',[...Taro.getStorageSync('gameList'),props.id])
            }
          } else {
            let list = Taro.getStorageSync('gameList')
            list.splice(list.indexOf(props.id),1)
            Taro.setStorageSync('gameList',list)
          }
          Taro.getStorageSync('gameList').map(item => {
            Taro.request({
              url: `http://116.204.121.9:65000/api/v1/project/games?game_id=${item}`, 
              method: 'GET',
              header: {
                'Authorization': Taro.getStorageSync('token'),
                'Content-Type': 'application/json',
                'Accept': '*/*',
              },
              data: '',
            }).then((res)=>{
              gamenamelist = gamenamelist+'+'+res.data.data.gamename
              Put(`/project?id=${props.project_id}`,Taro.getStorageSync('token'),{game:gamenamelist})
              console.log('dddddaawdawddddddddddddddddddd',res.data.data.gamename);
            })
          })
          console.log('lissssssssssssssssssssssssstttttttttttttttt',list);
        }
      }}>
          <View className='checked'>{isshow && <Image className='game-check' src={require('../../../image/game/correct.png')}></Image>}</View>
          <View className='gameName'>{props.name}</View>
          <View className='gameInfo'>适宜人数 : {props.number}  时间 : {props.time}  地点 : {props.place}</View>
          <View className='gameInfo'>分类 : {props.class}</View>
          <View className='gameInfo'>道具 : {props.tools}</View>
          <View className='gameInfo'>游戏规则 : {props.rules}</View>
      </View>
    </Swiper>
    {isshow?<Alert isshow={isshow} type={props.name} id = {props.id}></Alert>:''}
    </> 

  )
}
