import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import '../../index.css'
import Srollbox from '../../../../component/inroduction/Srollbox'
import { useState ,useEffect} from 'react';
import { getCurrentInstance } from '@tarojs/taro'
import {useDidShow,useDidHide} from '@tarojs/taro'
import http from '../../../../api/http/Http'

definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})


export default function preview(){
    const project=getCurrentInstance().router.params.project//项目id
    const back=getCurrentInstance().router.params.back//项目id
    const [name,setname]=useState('')//上传姓名
    useDidShow(() => {
    if(project=='undefined'?false:true){
    const res=http({
        method:'get',
        url:'https://www.melting-muxi.xyz:65000/api/v1/users',
        })
    res.then(data=>{setname(data.description)})}
  })
    const [pushtagsignal,setpushtagsignal]=useState(false)//向子组件传递上传标签的信号
    //const [seeshow,setseeshow]=useState(false)
    function selectedProgress(e){
        showTag=e.showTag
    }
    
    function pushtag(){
        if(project!=='undefined'&&name.trim()!=''){
            http({//更新名字信息
              method:'put',
              url:`https://www.melting-muxi.xyz:65000/api/v1/users`,
              data:{"description":name.toString()}
              })
              
              Taro.showModal({
                title: '上传成功',
                content: '快去看看伙伴们吧',
                confirmText:'看看别人',
                success: function (res) {
                  if (res.confirm) {
                    Taro.navigateTo({url:`/pages/introduction/details/seeothers/seeothers?project=${project}`})
                  } 
                }
              })
              setpushtagsignal(true)
          }
        else if(project=='undefined'){Taro.showToast({title: '这里是展示哦',icon:'none'})}
        else if(name.trim()==''){Taro.showToast({title: '请先输入名字',icon:'none'})} 
        //setseeshow(true)
    }
    return(
    <>
    
    <View className='page'>
    <Image  onClick={Taro.navigateBack} src={require('../../../../image/indexstart/back.png')} style={{display:back?'':'none',width:'25px',height:'25px',position:'absolute',top:'50px',left:'35px'}}></Image>
        
        <View className='topbox'>
            <Text className='topbox1'>标签选择</Text>
            <Text className='topbox2'>请选择能代表你的特质的5个标签</Text>
        </View>
        <View className='yourname'>你的名字:<Input className='name' maxlength='10' value={name} onInput={(e)=>{setname(e.detail.value)}}></Input></View>
        
        <Text className='titleSelected'>已选标签:</Text>
        
        

        
        <View className='Srollposition2'><Srollbox height='47vh' pushtagsignal={pushtagsignal} setpushtagsignal={setpushtagsignal} selectedProgress={selectedProgress}  tipnotshow='false' model='show' ></Srollbox></View>
        <View className='btnBox'>
            <Image src={require('../../../../image/introduction/push.png')} onClick={pushtag}></Image>
            {/* <Image src={require('../../../../image/introduction/seeothers.png')} style={{display:seeshow?'':'none'}}   onClick={()=>{Taro.navigateTo({url:`/pages/introduction/details/seeothers/seeothers?project=${project}`})}}></Image>   */}
        </View>  
        <Image className='bottomlogo' src={require('../../../../image/introduction/bottom.png')}></Image>
    </View>
    </>
    )
}
