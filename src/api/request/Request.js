import React from 'react'
import Taro from '@tarojs/taro'
// import FormData from 'form-data'

export default async function Request(method,url,Token,body) {
  
  let dataList = []
  
  const login = () => {
    Taro.request({
      url: 'http://116.204.121.9:65000/api/v1/login', 
      method: method,
      header: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      data: JSON.stringify(body),
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  }
  const register = () => {
    Taro.request({
      url: 'http://116.204.121.9:65000/api/v1/register', 
      method: method,
      header: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      data: JSON.stringify(body),
      success: function (res) {
       login()
      }
    })
  }
  if(url === '/login' && (!body.auth || !body.nick_name))
  {
    return 0
  }
  
  if(url === '/register') {
      register()
    }
    else if(!Token && (url !== '/login')) {
      console.log('login first');
    } 
    else {
      dataList = await Taro.request({
          url: 'http://116.204.121.9:65000/api/v1'+url, 
          method: method,
          header: {
            'Authorization': Token?Token:'',
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          data: JSON.stringify(body),
          
        }).then((res) => {
          if(url === '/login' ) {
            if(res.statusCode !== 401) {
              Taro.setStorageSync('token',res.data.data.Token)
              dataList = [res.data.data]
            } else {
              register()
            }    
           } else {
            Taro.setStorageSync('nickName',res.data.data.qq)
            Taro.setStorageSync('url',res.data.data.photo)
            return res
           }
          
        })
    }
    return dataList
}
