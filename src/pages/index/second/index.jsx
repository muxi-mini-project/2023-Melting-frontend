import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image} from '@tarojs/components'
import '../index.css'
import http from '../../../api/http/Http';
definePageConfig({
  navigationStyle:"custom",
  disableScroll: true
})
export default function indexDetail(){
  /*onClick={()=>{Taro.navigateTo({url:'')}}  */
  async function getOneIn(){//获取最新的项目跳转
    const res= http({
      url:'https://www.melting-muxi.xyz:65000/api/v1/users/myproject',
      method:'get',
    })
    res.then(data=>{
      // console.log(data);
      if(data.statusCode != 404) {
        Taro.navigateTo({url:`/pages/preparation/index?project=${data[data.length-1].info_id}`})
      } else {
        Taro.showToast({
          title:'请先创建一个项目',
          icon:'error',
          duration:2000
        })
      }
    })
  }


  return(
        <View className='index'>
          <Image onClick={Taro.navigateBack} src={require('../../../image/indexstart/back.png')} style={{width:'25px',height:'25px',position:'absolute',top:'50px',left:'35px'}}></Image>
            
            <View className='container'>
              
              <View className="choice" onClick={()=>{Taro.navigateTo({url:'/pages/index/createNew/index'})}}>新建活动 <Image src={require('../../../image/indexstart/twoice.png')} /> </View>
              
              <View className="choice" onClick={getOneIn}>修改草稿 <Image src={require('../../../image/indexstart/twoice.png')}  /> </View>
              
              <View className="choice" onClick={()=>{Taro.navigateTo({url:'/pages/preparation/index'})}}>随便逛逛 <Image src={require('../../../image/indexstart/twoice.png')} /> </View>
            
            </View>
          
          <Text className='producer'>出品方：木犀团队</Text>
        </View>
    )
  }   
