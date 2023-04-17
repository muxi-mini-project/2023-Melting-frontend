import React from 'react'
import {View} from '@tarojs/components'
import Taro, {useLoad} from '@tarojs/taro'
import Put from '../api/request/Put'
// import Request from '../api/request/Request'
import Request from '../api/request/Request'

export default  function index() {
  useLoad((props)=>{
    const {info_id} = props;
    // console.log('info_id',info_id);
  })
  let infoMock = '[0,144]'
  let infoMocckList = infoMock.slice(3,infoMock.length-1)
  let realList = infoMocckList.split(',')
  // console.log(realList);
  
  return (
    <>
        <View onTap={()=>{Taro.navigateTo({url:'/pages/game/index/index'})}}>game</View>
        <View onClick={()=>{Taro.navigateTo({url:'/pages/mine/index/index'})}}>mine</View>
        <View onClick={()=>{Taro.navigateTo({url:'/pages/toolkit/index/index'})}}>toolkit</View>
    </>
  )
}
