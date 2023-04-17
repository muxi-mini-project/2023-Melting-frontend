import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { View, Text ,Image,Button} from '@tarojs/components'
import './index.css'
import { getCurrentInstance, useDidShow } from '@tarojs/taro'
import http from '../../api/http/Http'
import Request from '../../api/request/Request'

definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})
export default function planingStep(){
    const project= getCurrentInstance().router.params.project//项目id
    let project2 = 0;
    const [stepfinish,setstepfinish]=useState([false,false,false])
    if(project){
        http({
            method:'get',
            url:'https://www.melting-muxi.xyz:65000/api/v1/project',
            data:{info_id:project}
        })
    } 
    useDidShow((props)=>{
      // const {project_id}
      let pages = Taro.getCurrentPages();
      let currPage = pages[pages.length - 1]; // 获取当前页面
      if (currPage.__data__.project) { // 获取值
        // console.log('lifeline',currPage.__data__.project);
        project2 = currPage.__data__.project
      } 

      // join(project2?project2:project)
       if(!project && !project2) {
        Taro.showModal({
          title:'提示',
          content:'您现在处在“随便逛逛”中，所做的任何修改都将无法生效，如需体验完整功能，请前往“修改草稿”或“新建活动”'
        })
       }

    })
  
    Taro.useShareAppMessage((res) => {
        if (res.from === 'button') {
          // console.log(res.target)
        }
        return {
          title: typeof project=='undefined'?'融冰melting':`快来加入我的项目吧`,
          path:typeof project=='undefined'?'/pages/index/index': `/pages/mine/plans/plans?id=${project2?project2:project}`
        }
      })
    function showsucess(){
      if(typeof project=='undefined'?false:true){
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
      else{
        Taro.showModal({
          title: '这里是展示哦',
          content: '去创建一个新项目吧',
          success: function (res) {
            if (res.confirm) {
              //console.log('用户点击确定')
            } else if (res.cancel) {
              //console.log('用户点击取消')
            }
          }
        })
      }
      
    }
    return(
        <View className='prepage'>
            <Image onClick={Taro.navigateBack} src={require('../../image/indexstart/back.png')} style={{width:'25px',height:'25px',position:'absolute',top:'50px',left:'35px',zIndex:10000}}></Image>

            <Image className='str' mode='aspectFit' src={require('../../image/preparation/str.png')}></Image>
            
            <View className='container'>
              
              <View className="choice"  style={{backgroundColor:stepfinish[0]?'#A7D3E5':'#F5EEEE'}} 
              onClick={()=>{Taro.navigateTo({url:`/pages/planing/index?project=${project2?project2:project}`});setstepfinish((prev)=>{prev[0] = true;const arrCopy = prev.slice();return arrCopy;})}}>
                Step1 策划准备 
                <View style={{display:stepfinish[0]?'none':''}}>
                    <Image src={require('../../image/preparation/smallleftice.png')} className='smallleftice'></Image>
                    <Image src={require('../../image/preparation/bigrightice.png')} className='bigrightice'></Image>
                </View>
              </View>
              
              <View className="choice"  style={{backgroundColor:stepfinish[1]?'#A7D3E5':'#F5EEEE'}}
              onClick={()=>{Taro.navigateTo({url:`/pages/introduction/index?project=${project2?project2:project}`});setstepfinish((prev)=>{prev[1] = true;const arrCopy = prev.slice();return arrCopy;})}}>
                Step2 自我介绍 
                <View style={{display:stepfinish[1]?'none':''}}>
                    <Image src={require('../../image/preparation/smallleftice.png')} className='smallleftice'></Image>
                    <Image src={require('../../image/preparation/bigrightice.png')} className='bigrightice'></Image>
                </View>
              </View>
              
              <View className="choice"  style={{backgroundColor:stepfinish[2]?'#A7D3E5':'#F5EEEE'}}
               onClick={()=>{Taro.navigateTo({url:`/pages/game/details/details?project_id=${project2?project2:project}`});setstepfinish((prev)=>{prev[2] = true;const arrCopy = prev.slice();return arrCopy;})}}>
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
                  <View className='button-view'><Button  style={{backgroundColor:'transparent',width:'38px',height:'38px',backgroundSize:'38px,38px'}} className='sharebtn' openType='share'></Button></View>
                  <Text className='sharetext'>分享</Text>
                </View>
            </View>
        </View>
    )
}