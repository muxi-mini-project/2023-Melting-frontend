import React from 'react'
import { useState } from 'react'
import { View, Image, Button, Input } from '@tarojs/components'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import Taro from '@tarojs/taro'
import Request from '../../../api/request/Request'
import Put from '../../../api/request/Put'
import './infoEdit.css'
import '../index/index.css'


definePageConfig({
  navigationStyle:"custom"
})

export default  function Info() {
  const [position, setposition] = useState('')
  let Token = Taro.getStorageSync('token')
  
  const Form = require('../../../component/pages/wx-formdata-master/formData')
  let formData = new Form()
  let text = true
  async function Req() {
    await Request('get','/users',Token,)
      const gameList = await Request('get','/users',Token,)
      setposition(gameList.data.data.position)
  } 
  Req()
  // position()
  const handleChange = (value1,value2) => {
    if(value1.length<=8 && value2.length<=14) {
      text = true
      Put('/users',Token,{
       'qq': value1,
      'position': value2
     })
    }
    else {
      text = false
    }           
  }
  const showToast = (text,code) => {
    Taro.showToast({
      title: text,
      icon: code,
      duration: 2000
    })
  }
  const handleImage = () => {  
    Taro.chooseImage({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0]
        formData.appendFile("file", tempFilePaths, "file");
        formData.append("Name", "BU");
        let data = formData.getData();
        showToast( '上传中，请稍候','error')
        Taro.request({
          method:'PUT',
          url: 'http://116.204.121.9:65000/api/v1/users/photo',
          header: {
            'content-type': data.contentType,
            'Authorization': Token,
          },
          data: data.buffer,
          success: function (res) {
            console.log(res)
            // setsuccess(true)
            if(res.statusCode === 200)
            showToast('修改成功','success')
            else 
            showToast('上传失败','error')
          },
          fail: function (err) {
            console.log(err)
          }
        });

    }})
  }
  
  return (
    <>
      <Navbar src = "/mine/infoEdit.png" color = '' wid = '32vw' from = 'mine'></Navbar>
      <View className='info-background'>
          <View className='info-backhover'></View>
          <Image src={require('../../../image/mine/back.png')} className = 'info-backcover'></Image> 
          <View className='info-edit-box'>

             {/* 修改头像 */}
             <View className='info-image-box'>
              <Image src={require('../../../image/mine/photo.png')} className='info-class'></Image>
              <Button onClick={()=>{handleImage()}} className='info-change-image' >
                    <Image src={'http://'+Taro.getStorageSync("url")} className='info-edit-image'></Image>
              </Button>
             </View>
             

             {/* 修改昵称 */}
             <View className='info-image-box'>
                <Image src={require('../../../image/mine/name.png')} className='info-class'></Image>
                <Button  className='info-change-nickname'>
                    <Input value={Taro.getStorageSync('nickName')} onInput={(e)=>{  handleChange(e.detail.value,'') }} 
                    onBlur={()=>{!text?showToast( '昵称不能超过8个字符哦','error'):showToast('修改成功','success')}}></Input>
                </Button>
             </View>
              
              

            {/* 修改职位 */}
            <View className='info-image-box'>
                <Image src={require('../../../image/mine/position.png')} className='info-class'></Image>
                <Button  className='info-change-nickname'>
                      <Input value={position} onInput={(e)=>{  handleChange('',e.detail.value) }}
                      onBlur={()=>{!text?showToast( '职位不能超过14个字符哦','error'):showToast('修改成功','success')}}></Input>
                </Button>
            </View>
            
          </View>
          
          {/* 图片 */}
          <View className='imagecontainer'>
            <Image className='imageToSwip' src={require('../../../image/mine/img1.png')}></Image>
            <Image className='imageToSwip' src={require('../../../image/mine/img2.png')}></Image>
          </View>


          {/* 小冰块 */}
          <View className='icebox'>
            <Image src = {require('../../../image/mine/icelittle.png')} className = 'icelittle'></Image>
            <Image src = {require('../../../image/mine/icebig.png')}  className = 'icebig'></Image>
          </View>
      </View>
    </>
  )
}
