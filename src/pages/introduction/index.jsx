import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import './index.css'
import Srollbox from '../../component/inroduction/Srollbox'
import { useState ,useEffect} from 'react';
import { getCurrentInstance } from '@tarojs/taro'
import {useDidShow,useDidHide} from '@tarojs/taro'
import http from '../../api/http/Http'
definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})
export default function Introduction(){
  const project=getCurrentInstance().router.params.project//项目id
  const [departmentinit,setdepartmentinit]=useState('')//初始部门
  const [department,setdepartment]=useState('')//上传部门
  useDidShow(() => {
    if(project=='undefined'?false:true){
    const res=http({
        method:'get',
        url:'https://www.melting-muxi.xyz:65000/api/v1/project',
        data:{info_id:project}
        })
    res.then(data=>{setdepartmentinit(data.department);})}
  })
  useDidHide(()=>{
    
    if(project=='undefined'?false:true&&department.trim()!=''){
      http({//更新部门信息
        method:'put',
        url:`https://www.melting-muxi.xyz:65000/api/v1/project?id=${project}`,
        data:{"department":department.toString()}
        })
    }
  })
  return(
        <View className='page'>
          <Image onClick={Taro.navigateBack} style={{width:'125px',height:'25px',position:'absolute',top:'50px',left:'35px'}} src={require('../../image/introduction/title.png')}></Image>
          
          <View className="intoDetailbox">
            <Text className="textrow">规则说明:活动开始时，从“我的策划案” 中打开策划案</Text>
            <Text className="textrow">策划者打开该策划案，将小程序分享到群里，</Text>
            <Text className="textrow">  成员点击链接，进入同一房间，选择五个描述自己的标签，</Text>
            <Text className="textrow"> 策划可邀请成员根据标签进行自我介绍</Text>
            <Text className="textrow">也可生存词云图保存留念</Text>
            <View className='department'>部门名称 <Input maxlength='10' placeholder={departmentinit} className='departmentInput'onBlur={(e)=>{setdepartment(e.detail.value);}}></Input></View>           
          
          </View>  

          
          <View className='Srollposition1'><Srollbox height='50Vh' model='notshow'></Srollbox></View>
          {/* {<Image className='btnleft' src={require('../../image/introduction/setfinish.png')}/>} */}
          <Image className='btnright' src={require('../../image/introduction/preview.png')} onClick={()=>{Taro.navigateTo({url:`/pages/introduction/details/preview/preview?project=${project}&back=1`})}} />
          <Image className='iceright' src={require('../../image/preparation/bigrightice.png')}></Image>
          {/* <Image className='icetwo' src={require('../../image/introduction/icetwo.png')}/> */}
        <Image className='bottomlogo' src={require('../../image/introduction/bottom.png')}></Image>
      </View>
        
    )
}