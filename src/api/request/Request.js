import React from 'react'
import Taro from '@tarojs/taro'


export default async function Request(method,url,Token,body) {
 
  let dataList = []
  const login = (auth,nickName) => {
    Taro.request({
      url: 'http://116.204.121.9:65000/api/v1/login', 
      method: method,
      header: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      data: JSON.stringify({
        auth:Taro.getStorageSync('auth'),
        nick_name:Taro.getStorageSync('nickName')
      }),
    }).then(async function(res) {
      Taro.setStorageSync('token',res.data.data.Token)
      return dataList
    })
  }

  const register = () => {
    body.photo = Taro.getStorageSync('qqurl')
    Taro.request({
      url: 'http://116.204.121.9:65000/api/v1/register', 
      method: method,
      header: {
        'Authorization': '',
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      // data: JSON.stringify(body),
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
          
        }).then(async function (res) {
          if(url === '/login' ) {
            if(res.statusCode !== 401) {
              Taro.setStorageSync('token',res.data.data.Token)
              dataList = [res.data.data]
              
            } else {
              register()
            }    
           } else if(res.statusCode === 403) {
            console.log('relogin');
            login()
            Taro.showToast({
              title: '请退出重进刷新',
              icon: 'error',
              duration: 3000
            })
           }
           else {
              
            res.data.data.qq?Taro.setStorageSync('nickName',res.data.data.qq):''
            res.data.data.qq?Taro.setStorageSync('url',res.data.data.photo):""
            return res
           }
          
        })
    }
    console.log('dataList',dataList);
    return dataList
}
