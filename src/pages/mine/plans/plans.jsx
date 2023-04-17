import React, { useState, useEffect } from 'react'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import Taro, {useLoad,useDidShow} from '@tarojs/taro'
import Put from '../../../api/request/Put'
import Login from '../../log/login'
import VirtualList from '@tarojs/components/virtual-list'
import './plans.css'
import Request from '../../../api/request/Request'
import http from '../../../api/http/Http'
import ShowInfoBox from '../../planing/detail/showInfoBox'

definePageConfig({
  navigationStyle:"custom",
  enableShareAppMessage: true,
  
})

export default function Plans() {
  const [plan_list, setplan_list] = useState([])
  const [authorize, setauthorize] = useState(false)
  const [rerender, setrerender] = useState([])
  const [selected, setselected] = useState()
  const [token,setoken] = useState()
  // let authorize = false;
  let url = ''

function get(url,id) {Taro.request({
  url:`https://www.melting-muxi.xyz:65000/api/v1${url}`,
  method:'GET',
  header: {
    'Authorization': Taro.getStorageSync('token'),
      'Content-Type': 'application/json',
      'Accept': '*/*',
  },
}).then((res) => {
  let new_plan_list = res.data.data
  id?setplan_list([new_plan_list]):setplan_list(new_plan_list.reverse())
})} 

  useLoad((props) => {
    Taro.setStorageSync('token','')
    const {id} = props;
    id?(url = `/project?info_id=${id}`):(url = '/users/myproject')
    id?setauthorize(true):setauthorize(false)
    if(!token) {
      let timer = setInterval(() => {
      let Token = Taro.getStorageSync('token')
      if(Token) {
        clearInterval(timer)
        setoken(Token)
        get(url,id)
      }
   }, 1000);
  } else {
    get(url,id)
  }
  })
  async function del (id)  {
    Taro.showModal({
      title:"提示",
      content:"您确定要删除该项目吗",
      success:function (res) {
        if(res.confirm) {
          Request('delete',`/project?id=${id}`,Taro.getStorageSync('token'),{})
          Request('delete',`/project/template?id=${id}`,Taro.getStorageSync('token'),{})
          get(`/users/myproject`)
        }
      }
    })
  
  }
  async function join (id, item)  {
    Taro.showModal({
      title:'提示',
      content:"确认要加入该项目吗？",
      success: function (res) {
        if(res.confirm) {
          Request('get',`/join?id=${id}`,Taro.getStorageSync('token'),{})
          Taro.redirectTo({url:`/pages/introduction/details/preview/preview?project=${item.info_id}&authorize=${true}`})
          get(`/users/myproject`)
        }
      }
    })
   
   }
  Taro.useShareAppMessage((res) => {
    return {
      title: `快来加入${Taro.getStorageSync('nickName')}的项目吧`,
      path: `/pages/mine/plans/plans?id=${selected}&back=0`
    }
  })
  const list = [`通知文本：`,'项目安排：','预算设置：','标签云图：','加入人员：']
  
  return (
    <>
     {!token && <Login/>}
     <View className={!token?'plan-back':'plan-back plan-backblur'}>
        <Navbar src = "/mine/plans.png" color = '' wid = '32vw' from = 'mine'></Navbar>
        <View className='plan-backover'></View>
        <Image src={"https://s2.loli.net/2023/03/16/eINlqaMSjbV2RhW.jpg"} className = 'plan-backi'></Image>
        <View className='plan-info-box'> 
          {/* {authorize?<View>{Taro.getStorageSync('token')}</View>:''} */}
          {plan_list.map((item,index)=>{
            if(item)
            return (
              <View className='plan-box' onClick={()=>{
                authorize?join(item.info_id, item):''
                // authorize?:''
              }}>
                {/* {authorize?<View>{item}</View>:''} */}
                <Info list = {list} info_id = {item.info_id} title = {item.name} infolist = {plan_list[index]} index = {index}></Info>
                {rerender.includes(item.info_id)  && (
                  <>
                    <Image src={require('../../../image/mine/shared.png')} className='plan-shared'></Image>
                    <Image src={require('../../../image/mine/correct.png')} className='plan-correct'></Image>
                  </>
                )}
                <View className='plan-toolkit'>
                  <Button openType='share' className='plan-button share' onTap={()=>{
                    Taro.setStorageSync('info_id',item.info_id)
                    setselected(item.info_id)
                    setrerender([...rerender,item.info_id])
                    }}></Button>
                  <Image className='plan-delete plan-img' src={require('../../../image/mine/plan-delete.png')} onClick={()=>{del(item.info_id)}}></Image>
                  <Image className='plan-edit plan-img' src={require('../../../image/mine/plan-edit.png')} onClick={()=>{
                    let pages = Taro.getCurrentPages(); // 获取当前的页面栈 
                    let prevPage = pages[pages.length-3]; //  获取上一页面
                    prevPage.setData({ //设置上一个页面的值
                    project: item.info_id
                    });
                    if(!authorize) {
                      Taro.showModal({
                        title:'提示',
                        content:`确认要修改名为 ${'    "'+item.name+'"    '} 的项目吗`,
                        success: function (res) {
                          if(res.confirm) {
                            Taro.navigateBack({delta: 2})
                          } 
                        }
                      })
                      
                    } else {
                      join(item.info_id)
                    }
                    
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
  const [infoBox, setinfoBox] = useState(false)
  const [project_info, setproject_info] = useState([])
  const [url2, seturl] = useState([])
  let url = []
  const [gamename, setgamename] = useState('')
  let infoL = infolist.corporates
  let infoMocckList = infoL.slice(1,infoL.length-1)
  let realList = infoMocckList.split(',')
  useEffect(() => {
    realList.map((item, index) => {
      if(item.trim() )
      return  Taro.request({
        url: `https://www.melting-muxi.xyz:65000/api/v1/user?id=${item.trim()}`,
        method: 'GET',
        header: {
          'Authorization':'',
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },

      }).then((item)=>{
        url = [...url,item.data.data.photo]
        if(index === realList.length-1)
        seturl(url)
      })
    }) 
    http({
      method:'get',
      url:'https://www.melting-muxi.xyz:65000/api/v1/project',
      data:{info_id:props.info_id}
      }).then(data=>{
      if(data.department!='部门名称'){       
      setproject_info([data.department,data.name,data.aim,data.place,data.time,data.optional_tables])
  } })
  }, [])
  let namelist = infolist.game.split(',')
  namelist = namelist.filter((item) => {
    return item != ''
  })
  let gamenamlist = []
  if(gamename == '')
     namelist.map((item, index) => {
      Taro.request({
        url: `https://www.melting-muxi.xyz:65000/api/v1/project/games?game_id=${item}`, 
        method: "get",
        header: {
          'Authorization': Taro.getStorageSync('token'),
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
      }).then((res) =>{
        gamenamlist.push(res.data.data.gamename)
        if (index == namelist.length - 1)
        setgamename(gamenamlist)
      })
    })

  return (
    <>
        <View className='plan-text-box' style={{height:detailshow?'':'20vh',overflow:detailshow?'':'hidden'}}>
          <View className='plan-title'>{title}</View>
          <View className='plan-text' onClick={()=>{
            setinfoBox(true)
          }}>{list[0]}<View className='view-button'>点击显示</View></View>
          <View>{infoBox && project_info &&<ShowInfoBox project_info={project_info} setInfoTextshowOrnot={setinfoBox}/> }</View>
          <View className='plan-text'>{list[1]+(gamename)}</View>
          <View className='plan-text'>{list[2]+(infolist.budget)}</View>
          {/* <View className='plan-text'>{list[3]+(infolist.uid)}</View> */}
          <View className='plan-big-box'>
            <View className='plan-text plan-user-photo-box'>
              {list[4]}
              {url2.map((item)=>{
                return(
                  <Image className='plan-user-photo' src={'http://'+item}></Image>
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