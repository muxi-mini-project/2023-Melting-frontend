import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Text ,Image,Button} from '@tarojs/components'
import './index.css'
import { getCurrentInstance } from '@tarojs/taro'
import http from '../../api/http/Http'



export default function planingStep(){
    const project= getCurrentInstance().router.params.project//项目id
    const [stepfinish,setstepfinish]=useState([false,false,false])
    if(project){
        http({
            method:'get',
            url:'http://116.204.121.9:65000/api/v1/project',
            data:{info_id:project}
        })
    }
    /*http({
        method:'get',
        url:'http://116.204.121.9:65000/api/v1/users/myproject',
    })*/
    Taro.useShareAppMessage((res) => {
        if (res.from === 'button') {
          console.log(res.target)
        }
        return {
          title: '自定义转发标题',
          path:typeof project=='undefined'?'/pages/index/index': `/page/mine/plans/plans?id=${project}`
        }
      })
    function showsucess(){
      /*Taro.showToast({
        title: '保存成功,点击右下角分享即可邀请好友参加活动了哦',
        //icon: 'success',
        duration:3000,
      })*/
      Taro.showModal({
        title: '保存成功',
        content: '点击右下角分享即可邀请好友参加活动了哦',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
    return(
        <View className='prepage'>
            <Image onClick={Taro.navigateBack} src={require('../../image/indexstart/back.png')} style={{width:'25px',height:'25px',position:'absolute',top:'50px',left:'35px'}}></Image>

            <Text className='introduction'>点击进入你所需要的环节</Text>
            
            <View className='container'>
              
              <View className="choice"  style={{backgroundColor:stepfinish[0]?'#A7D3E5':'#F5EEEE'}} 
              onClick={()=>{Taro.navigateTo({url:`/pages/planing/index?project=${project}`});setstepfinish((prev)=>{prev[0] = true;const arrCopy = prev.slice();return arrCopy;})}}>
                Step1 策划准备 
                <View style={{display:stepfinish[0]?'none':''}}>
                    <Image src={require('../../image/preparation/smallleftice.png')} className='smallleftice'></Image>
                    <Image src={require('../../image/preparation/bigrightice.png')} className='bigrightice'></Image>
                </View>
              </View>
              
              <View className="choice"  style={{backgroundColor:stepfinish[1]?'#A7D3E5':'#F5EEEE'}}
              onClick={()=>{Taro.navigateTo({url:`/pages/introduction/index?project=${project}`});setstepfinish((prev)=>{prev[1] = true;const arrCopy = prev.slice();return arrCopy;})}}>
                Step2 自我介绍 
                <View style={{display:stepfinish[1]?'none':''}}>
                    <Image src={require('../../image/preparation/smallleftice.png')} className='smallleftice'></Image>
                    <Image src={require('../../image/preparation/bigrightice.png')} className='bigrightice'></Image>
                </View>
              </View>
              
              <View className="choice"  style={{backgroundColor:stepfinish[2]?'#A7D3E5':'#F5EEEE'}}
               onClick={()=>{Taro.navigateTo({url:`/pages/game/index/index?project_id=${project}`});setstepfinish((prev)=>{prev[2] = true;const arrCopy = prev.slice();return arrCopy;})}}>
                Step3 游戏项目 
                <View style={{display:stepfinish[2]?'none':''}}>
                    <Image src={require('../../image/preparation/smallleftice.png')} className='smallleftice'></Image>
                    <Image src={require('../../image/preparation/bigrightice.png')} className='bigrightice'></Image>
                </View>
              </View>
            
            </View>

            <Button className='finished' onClick={showsucess}>完成策划</Button>

            <View className='Navbarbottombox'>
                <View className='Navbarbottomitem' onClick={()=>{Taro.navigateTo({url:'/pages/toolkit/index/index'})}}><Image src={require('../../image/navbottom/tools.png')}/><Text>工具箱</Text></View>
                <View className='Navbarbottomitem' onClick={()=>{Taro.navigateTo({url:'/pages/mine/index/index'})}}><Image src={require('../../image/navbottom/mine.png')}/><Text>我的</Text></View>
                <View className='Navbarbottomitem'>
                  <Button style={{background:"url('../../image/navbottom/sharing.png')",width:'38px',height:'38px',backgroundSize:'38px,38px'}} className='sharebtn' openType='share'></Button>
                  <Text className='sharetext'>分享</Text>
                </View>
            </View>
        </View>
    )
}