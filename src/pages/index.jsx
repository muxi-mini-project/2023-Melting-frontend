import React from 'react'
import {View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import Put from '../api/request/Put'
// import Request from '../api/request/Request'

export default  function index() {
  async function request() {
    // const list = await Request('/users',Taro.getStorageSync('token'),{
    //   'qq':'',
    //  'position': ''
    // })
    // console.log('put',list);
    const list = await Taro.request({
      url:'http://116.204.121.9:65000/api/v1/project/newproject',
      method: 'POST',
      header: {
        'Authorization': Taro.getStorageSync('token'),
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      data:JSON.stringify( {
        info_id: '2123',
      })
    }).then(res => console.log(res.data.message))
  }
    request()
  return (
    <>
        <View onTap={()=>{Taro.navigateTo({url:'/pages/game/index/index'})}}>game</View>
        <View onClick={()=>{Taro.navigateTo({url:'/pages/mine/index/index'})}}>mine</View>
        <View onClick={()=>{Taro.navigateTo({url:'/pages/toolkit/index/index'})}}>toolkit</View>
    </>
  )
}
