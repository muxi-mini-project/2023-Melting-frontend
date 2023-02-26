import React from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Request from '../../api/request/Request'
import { useState } from 'react'
import './login.css'
import Put from '../../api/request/Put'

export default function Login() {
    const [userInfo, setuserInfo] = useState([])
    const [change, setchange] = useState('授权')
    const [animation, setanimation] = useState('')
    const [show, setshow] = useState(true)
    const _animation = Taro.createAnimation({
      duration: 600,
      timingFunction: 'ease-in-out',
      delay: 100,
      transformOrigin: 'left top 0',
      
    })
    _animation.translateY(400).step()
    

    let realName = userInfo[0]
    let nickName = userInfo[1]?userInfo[1].split('/')[userInfo[1].split('/').length-2]:''
    let auth = userInfo[1]?userInfo[1].split('/')[userInfo[1].split('/').length-2].slice(-9):''
    nickName = (nickName.length > 7)?nickName.slice(-5):nickName
    console.log('info',userInfo[1])
    Request('post','/login','',{
        'nick_name':nickName,
        'auth':auth,
        'qq':realName
    })
    
    
  return (
    <>
    <View className='loginBox' animation={animation} >
          <View className='poptext'>{(realName)?`登录成功，欢迎你,${realName}`:'请授权QQ登录'}</View>
              <View className='popbutton'>
                <View >
                    <Button   
                          className="popauthorize"
                          open-type="getUserInfo"
                          onClick={()=>{
                            Taro.getUserInfo({
                              desc: '用于完善会员资料',
                                success: function(res) {
                                  var Info = res.userInfo
                                  setuserInfo([...userInfo,Info.nickName,Info.avatarUrl])
                                  setanimation(_animation.export())
                                  setTimeout(() => {
                                  setshow(false)
                                  }, 3000);
                                },
                                fail: function(res) {
                                setchange('登录')
                                }
                              })
                            
                          }}>
                          {change}
                    </Button>
              </View>
          </View>
      </View>
    </>
    
  )
}