import React from 'react'
import Taro from '@tarojs/taro'
// import FormData from 'form-data'

export default function Request(method,url,Token,body) {
  // const [url, seturl] = useState(urls)
  // const [token, settoken] = useState(Taro.getStorageSync('token'))
  let dataList = []
  // let formData = new FormData()
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
      // Taro.setStorageSync('success','1')
      // Taro.setStorageSync('nickName',res.data.data)
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
      //  console.log(res);
       login()
       
      }
    })
  }
  if(url === '/login' && (!body.auth || !body.nick_name))
  {
    // console.log('nickName or auth shouldnt be empty');
    return 0
  }
  
  if(url === '/register') {
      // console.log('register');
      register()
    }
    else if(!Token && (url !== '/login')) {
      console.log('login first');
      // login()
    } 
    else {
      // console.log('login');
      Taro.request({
          url: 'http://116.204.121.9:65000/api/v1'+url, 
          method: method,
          header: {
            'Authorization': Token?Token:'',
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          data: JSON.stringify(body),
          success: function (res) {
           if(url === '/login' ) {
            if(res.statusCode !== 401) {
              Taro.setStorageSync('token',res.data.data.Token)
              dataList = [res.data.data]
            } else {
              register()
            }    
           } else {

            console.log('返回数据：',res.data.data);
            dataList = [res.data.data]
            Taro.setStorageSync('list',res.data.data)
            Taro.setStorageSync('nickName',res.data.data.qq)
            Taro.setStorageSync('url',res.data.data.photo)
            // return dataList
           }
          },
          fail: function(res) {
            console.log(res);
            
          }
        })
    }
}
