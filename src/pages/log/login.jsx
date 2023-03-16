import React from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Request from '../../api/request/Request'
import { useState } from 'react'
import './login.css'
import Put from '../../api/request/Put'

export default function Login() {
    const [userInfo, setuserInfo] = useState([])
    const [change, setchange] = useState('一键授权登录')
    const [animation, setanimation] = useState('')
    const [show, setshow] = useState(true)
    const _animation = Taro.createAnimation({
      duration: 600,
      timingFunction: 'ease-in-out',
      delay: 100,
      // transformOrigin: 'top 0',
    })
    _animation.translateY(1100).scale(0).step()
    

    let realName = userInfo[0]
    let nickName = userInfo[1]?userInfo[1].split('/')[userInfo[1].split('/').length-2]:''
    let auth = userInfo[1]?userInfo[1].split('/')[userInfo[1].split('/').length-2].slice(-9):''
    nickName = (nickName.length > 7)?nickName.slice(-5):nickName
    Taro.setStorageSync('auth',auth)
    Taro.setStorageSync('nickName2',nickName)
    console.log('info',userInfo[1])
    Request('post','/login','',{
        'nick_name':nickName,
        'auth':auth,
        'qq':realName,
        // 'url':userInfo[1]
    })
    
    
  return (
    <View className='login-big-box' animation={animation}>
    <View className='loginBox'>
          <View className='poptext'>{(realName)?`登录成功，欢迎你,${realName}`:'小程序授权确认'}</View>
          <View className='popalert'>请授权登陆后，再进行操作</View>
              <View className='popbutton'>
                <View >
                    <Button   
                          id="popauthorize"
                          open-type="getUserInfo"
                          onClick={()=>{
                            Taro.getUserInfo({
                              desc: '用于完善会员资料',
                                success: function(res) {
                                  var Info = res.userInfo
                                  setuserInfo([...userInfo,Info.nickName,Info.avatarUrl])
                                  setanimation(_animation.export())
                                  Taro.setStorageSync('qqurl',Info.avatarUrl.slice(8))
                                  setTimeout(() => {
                                  setshow(false)
                                  }, 3000);
                                },
                                fail: function(res) {
                                setchange('一键登录')
                                }
                              })
                            
                          }}>
                          {change}
                    </Button>
              </View>
          </View>
      </View>
    </View>
    
  )
}