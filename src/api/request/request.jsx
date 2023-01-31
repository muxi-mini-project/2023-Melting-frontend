import React from 'react'
import Taro from '@tarojs/taro'
import { useState } from 'react'


export default function Request(method,url,Token,body) {
  
  const [token, settoken] = useState(Token)
  console.log(Token);
  let dataList = []
    if(!Token && (url !== '/login')) {
      console.log('login first');
    } else {
      
      Taro.request({
          url: 'http://116.204.121.9:65000/api/v1'+url, 
          method: method,
          header: {
            'Authorization': Token,
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          data: JSON.stringify(body),
          success: function (res) {
           if(url === '/login') {
            settoken(res.data.data.Token)
           } else {
            console.log('返回数据：',res.data.data);
            dataList = [...res.data.data]
           }
           
           
          }
        })
    }
  
  return (url === '/login')?token:dataList
}
