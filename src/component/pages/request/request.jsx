import React from 'react'
import { useEffect } from 'react'
import Taro from '@tarojs/taro'


export default function Request(method,url) {
    
    
    Taro.request({
        url: 'http://116.204.121.9:65000/api/v1'+url, 
        method: method,
        header: {
          'Authorization': 'Authorization',
          'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
        }
      })
    
  return 0
}
