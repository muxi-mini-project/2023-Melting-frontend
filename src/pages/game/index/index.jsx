import { View, Image, Text } from '@tarojs/components'
import React, { useContext, useReducer, useEffect }from 'react'
import Taro from '@tarojs/taro'
import GameButton from '../../../component/pages/gameButton/gameButton'
import Games from '../../../component/pages/games/games'
import Gameselect from '../../../component/pages/gameselect/gameselect'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import Request from '../../../api/request/request'
import './index.css'
import { createContext } from 'react'
import GameSelctItem from '../../../component/pages/gameselectitem/gameSelectItem'
import { useState } from 'react'


definePageConfig({
  navigationStyle:"custom"
})

// 用usereducer减少通信复杂度
export const initialState = {
  list:['2','10','5']
}
let placeList = ['inside','outside']
let timeList = ['10','20','30']
let crowdList = ['5','10','20']
const reducer = (prevState,action) => {
  let newState = {...prevState}
  switch(action.type) {
      
      case '1': 
          newState.list[0] = action.value;
          return newState;
      case '2': 
          newState.list[1] =  action.value;
          return newState;
      case '3': 
          newState.list[2] = action.value;
          return newState;
      default:
          return prevState
  }
  // return prevState
}

// 使用usecontext配合usereducer
const globalContext = createContext()


export default function index() {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  let token =  Request('post','/login','',{
    "auth": "fugiat id",
    "nick_name": "我是傻逼"
  })

  let gameList = Request('post','/project/games/find',token,{
    "crowd": `${crowdList[state.list[2]]}`,
    'time':`${timeList[state.list[1]]}`,
    "venue": `${placeList[state.list[0]]}`,
  })
  console.log(gameList);
  // console.log('crowd',crowdList[state.list[2]]);
  return (
   <View>
          {/* 顶部导航栏 */}
        <Navbar src = "/game/title.png" color = '#f2e7b9' wid = '32vw'></Navbar>


        <View className='gamebackground'>
          <View className='gamebackover'></View>
          
          {/* 筛选栏 */}
          <View className='ti'>{"筛选条件"}</View>

          <globalContext.Provider value={{
            state,
            dispatch
          }}>

              <View id='filt'>

                <Gameselect text = '场地' ><Placechild type='1' ItemText = {placeList}></Placechild></Gameselect>

                <Gameselect text = '时间'  ><Placechild type='2' ItemText = {timeList}></Placechild></Gameselect>

                <Gameselect text = '人数' ><Placechild  type = '3' ItemText = {crowdList} ></Placechild></Gameselect>

                
              </View>

          
          </globalContext.Provider>
          
          {/* 选项卡部分 */}
          <globalContext.Provider value={{state}}>
            
             <SwitchCard></SwitchCard>

          </globalContext.Provider>
          

          {/* 按钮部分 */}
          <GameButton text1 = '生成题卡文件' url1 = '/details/details' text2 = '完成' url2 = '/index/index'></GameButton>

          {/* 图片部分 */}
          
        <Image className='gameimage' src={require('../../../image/game/snowman.png')}></Image>
          

          
          
        </View>
   </View>
  )
}

export function SwitchCard() {
  const {state} = useContext(globalContext)
  // console.log(state.list);
  return (
    <>
        <View className='ti'>{"项目安排"}</View>

            <View id='selebox' onClick={()=>{
              
              Taro.redirectTo({url:`/pages/game/details/details?place='${state.list[0]}'&time='${state.list[1]}'&number='${state.list[2]}`})
            }}>
              <Games name = 'jdi' number ='6' time = '30' place = '1' class = 'dhwq' tools = 'null' rules = 'null' clickable = {false}></Games>
        </View>
    </>
  )
}
export function Placechild(props) {
  const {dispatch} = useContext(globalContext)
  const {state} = useContext(globalContext)
  // console.log(state);
  const{
    type,
    ItemText
  } = props
  // console.log(type,ItemText);
  return (
    <View>

      {ItemText.map((text,index)=>{
        // console.log('style:',state.list[children.props.type-1]);
        // console.log('index:',index);
        return (
          <View onTap={()=>{
            dispatch({
              type:`${type}`,
              value:`${index}`
            })
            }}>
            <GameSelctItem type = {type} text = {text}  style = {state.list[props.type-1]} index ={index}/>
          </View>
        )
      })}
      
    </View>
  )
}


