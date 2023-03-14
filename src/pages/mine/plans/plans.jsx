import React, { useState } from 'react'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import Taro, {useLoad} from '@tarojs/taro'
import Put from '../../../api/request/Put'
import Login from '../../log/login'
import VirtualList from '@tarojs/components/virtual-list'
import './plans.css'
import Request from '../../../api/request/Request'

definePageConfig({
  navigationStyle:"custom",
  enableShareAppMessage: true
})

export default function Plans() {
  const [plan_list, setplan_list] = useState([])
  const [authorize, setauthorize] = useState(false)
  const [rerender, setrerender] = useState([])
  const [token,setoken] = useState(Taro.getStorageSync('token'))
  // let authorize = false;
  let url = ''
  function get(url) {Taro.request({
    url:`http://116.204.121.9:65000/api/v1${url}`,
    method:'GET',
    header: {
      'Authorization': Taro.getStorageSync('token'),
        'Content-Type': 'application/json',
        'Accept': '*/*',
    },
  }).then((res) => {
    let new_plan_list = [...res.data.data]
    setplan_list([...new_plan_list])
    console.log(new_plan_list);
  })} 
  useLoad((props) => {
    const {id} = props;
    // Taro.setStorageSync('uid',id)
    console.log('id',id);
    id?(url = `/project?info_id=${id}`):(url = '/users/myproject')
    id?setauthorize(true):setauthorize(false)
    if(!token) {
      let timer = setInterval(() => {
      let Token = Taro.getStorageSync('token')
     if(Token ) {
       clearInterval(timer)
       setoken(Token)
     }
   }, 2000);
  } else {
    get(url)
  }
  })
  async function del (id)  {
   await Request('delete',`/project?id=${id}`,Taro.getStorageSync('token'),{})
    get(`/users/myproject`)
  }
  async function join (id)  {
    await Request('get',`/join?id=${id}`,Taro.getStorageSync('token'),{})
     get(`/users/myproject`)
   }
  Taro.useShareAppMessage((res) => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: `/page/mine/plans/plans?id=${Taro.getStorageSync('info_id')}`
    }
  })
  // console.log(plan_list.length?plan_list[0].place:'');
  const list = [`通知文本：`,'项目安排：','预算设置：','标签云图：','加入人员：']
  
  return (
    <>
    {!token && <Login></Login>}
     <View className={!token?'plan-back':'plan-back plan-backblur'}>
        <Navbar src = "/mine/plans.png" color = '' wid = '32vw' from = 'mine'></Navbar>
        <View className='plan-backover'></View>
        <Image src={require('../../../image/mine/back.png')} className = 'plan-backi'></Image>
        <View className='plan-info-box'> 
        
          {plan_list.map((item,index)=>{
            return (
              <View className='plan-box' onClick={()=>{
                authorize?join(item.info_id):''
                authorize?Taro.redirectTo({url:`/pages/index?info_id=${item.info_id}`}):''
              }}>
                <Info list = {list} info_id = {item.info_id} title = {item.name} infolist = {plan_list} index = {index}></Info>
                {rerender.includes(item.info_id)  && (
                  <>
                    <Image src={require('../../../image/mine/shared.png')} className='plan-shared'></Image>
                    <Image src={require('../../../image/mine/correct.png')} className='plan-correct'></Image>
                  </>
                )}
                <View className='plan-toolkit'>
                  <Button openType='share' className='plan-button share' onTap={()=>{
                    Taro.setStorageSync('info_id',item.info_id)
                    setrerender([...rerender,item.info_id])
                    }}></Button>
                  <Image className='plan-delete plan-img' src={require('../../../image/mine/plan-delete.png')} onClick={()=>{del(item.info_id)}}></Image>
                  <Image className='plan-edit plan-img' src={require('../../../image/mine/plan-edit.png')} onClick={()=>{
                    !authorize?join(item.info_id):''
                    // Taro.redirectTo({url:`/pages/index?info_id=${item.info_id}`})
                    let pages = Taro.getCurrentPages(); // 获取当前的页面栈 
                    let prevPage = pages[pages.length-2]; //  获取上一页面
                    prevPage.setData({ //设置上一个页面的值
                    holder: 10086
                    });
                    Taro.navigateBack({
                    delta: 2
                    });
                  }}></Image>
                </View>
              </View>
            )
          })} 
        </View>
    </View>
    </>
   
  )
}
export function Info(props) {
  const {list,info_id,title,infolist,index} = props;
  const [detailshow, setdetailshow] = useState(false)
  const [url, seturl] = useState('')
  let infoL = infolist[index].corporates
  let infoMocckList = infoL.slice(3,infoL.length-1)
  let realList = infoMocckList.split(',')
  
  return (
    <>
        <View className='plan-text-box' style={{height:detailshow?'':'20vh',overflow:detailshow?'':'hidden'}}>
          <View className='plan-title'>{title}</View>
          <View className='plan-text'>{list[0]+(infolist.length?infolist[index].aim:'')}</View>
          <View className='plan-text'>{list[1]+(infolist.length?infolist[index].game:'')}</View>
          <View className='plan-text'>{list[2]+(infolist.length?infolist[index].budget:'')}</View>
          <View className='plan-text'>{list[3]+(infolist.length?infolist[index].uid:'')}</View>
          <View className='plan-big-box'>
            <View className='plan-text plan-user-photo-box'>
              {list[4]}
              {(detailshow) && realList.map((item, index) => {
                // console.log(item.trim());
                if(item.trim() && !url)
                Taro.request({
                  url: `http://116.204.121.9:65000/api/v1/user?id=${item.trim()}`,
                  method: 'GET',
                  header: {
                    'Authorization':'',
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                  },

                }).then((item)=>{
                  seturl(item.data.data.photo)
                })
                return (
                  <View className='plan-user-photo'><Image className='plan-pic' src={url?'http://'+url:'http://w'+Taro.getStorageSync('qqurl')}></Image></View>
                )
              })}
              {/* <Image></Image> */}
              
            </View>
            {realList.length>3 && <Image src={require('../../../image/mine/morehide.png')} className='soon'></Image>}
          </View>
          
          
        </View>
        <Image className='plan-open' src={require('../../../image/mine/plan-open.png')} onClick = {()=>{
          setdetailshow(!detailshow)
          }}></Image>
    </>
  )
}