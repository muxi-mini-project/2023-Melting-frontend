import React, {useEffect} from 'react'
import { useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import Taro,{useLoad} from '@tarojs/taro'
import Swiper from '../swiper/swiper'
import './games.css'
import Alert from '../alertPage/alertPage'
import Put from '../../../api/request/Put'

export default function Games(props) {
  const [click, setClick] = useState(props.clickable)
  const [isshow, setisshow] = useState(false)
  const [rule, setrule] = useState(props.rules)
  const [prepare, setprepare] = useState(props.prepare)
  let gamenamelist = []
 useEffect(() => {
  Taro.request({
    url: `https://www.melting-muxi.xyz:65000/api/v1/project/games/details?game_id=${props.id}`, 
    method: 'GET',
    header: {
      'Authorization': Taro.getStorageSync('token'),
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
  }).then((res) => {
    res.data.data[3].Key == 'rule'?setrule(res.data.data[3].Value):'无'
    res.data.data[2].Key == 'prepare'?setprepare(res.data.data[2].Value):'无'
  })
 }, [props.id])
  
  return (

    <>
    <Swiper moveable = {!click} project_id = {props.project_id} gamenamelist = {gamenamelist} id = {props.id} gamename = {props.name} >
      <View className='gameInfoBox' onClick={()=>{
        Taro.setStorageSync('key',[props.id,'','',''])
        if(click) {
          Taro.setStorageSync('key',[props.id,'','',''])
          setisshow(!isshow)
          if(props.issshow !== true) {
            if (!isshow) {
              Taro.showToast({
                title:'添加成功',
                icon:'success',
                duration:800
              })
              Taro.setStorageSync('key',[props.id,'','',''])
              if(!props.project_game.includes(props.id))
              Put(`/project?id=${props.project_id}`,Taro.getStorageSync('token'),{game:`${props.project_game},${props.id}`})
            } 
          
        }
        
      }
      }}>
          <View className='checked'>{(props.render_id === props.id) ? <Image className='game-check' src={require('../../../image/game/correct.png')}></Image>:''}</View>
          <View className='gameName'>{props.name}</View>
          <View className='gameInfo'>适宜人数 : {props.number}  时间 : {props.time}  地点 : {props.place}</View>
          <View className='gameInfo'>分类 : {props.class}</View>
          <View className='gameInfo'>道具 : {prepare}</View>
          <View className='gameInfo'>游戏规则 : {rule}</View>
      </View>
    </Swiper>
    {<Alert isshow={isshow} type={props.name} id = {props.id}></Alert>}
    </> 

  )
}
