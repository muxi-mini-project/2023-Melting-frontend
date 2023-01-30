import { View, Image, Text } from '@tarojs/components'
import React, { useContext, useReducer, useEffect }from 'react'
import Taro from '@tarojs/taro'
import GameButton from '../../../component/pages/gameButton/gameButton'
import Games from '../../../component/pages/games/games'
import Gameselect from '../../../component/pages/gameselect/gameselect'
import GameSelctItem from '../../../component/pages/gameselectitem/gameSelectItem'
import Navbar from '../../../component/pages/navbarTop/navbarTop'
import Request from '../../../component/pages/request/request'
import './index.css'



definePageConfig({
  navigationStyle:"custom"
})

// 用usereducer减少通信复杂度
export const initialState = {
  list:['2','10','5']
}
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
const globalContext = React.createContext()


export default function index() {
  const [state, dispatch] = useReducer(reducer, initialState)
  Request('post','/project/games/find')
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

                <Gameselect text = '场地'>

                  <Placechild>
                    <GameSelctItem text = {'室内'} type ='1' ></GameSelctItem>
                    <GameSelctItem text = {'室外'} type ='1' ></GameSelctItem>
                  </Placechild>

                </Gameselect>

                <Gameselect text = '时间'>
            
                  <Placechild>
                    <GameSelctItem text = '10分钟' type ='2'></GameSelctItem>
                    <GameSelctItem text = '20分钟' type ='2'></GameSelctItem>
                    <GameSelctItem text = '30分钟' type ='2'></GameSelctItem>
                  </Placechild>

                </Gameselect>

                <Gameselect text = '人数'>

                  <Placechild>
                    <GameSelctItem text = '5人' type ='3'></GameSelctItem>
                    <GameSelctItem text = '10人' type ='3'></GameSelctItem>
                    <GameSelctItem text = '20人' type ='3'></GameSelctItem>
                  </Placechild>

                </Gameselect>

                
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
function SwitchCard() {
  const {state} = useContext(globalContext)
  console.log(state.list);
  return (
    <>
        <View className='ti'>{"项目安排"}</View>

            <View id='selebox' onClick={()=>{
              
              Taro.redirectTo({url:`/pages/game/details/details?place='${state.list[0]}'&time='${state.list[1]}'&number='${state.list[2]}`})
            }}>
              <Games name = 'jdi' number ='6' time = '30' place = '1' class = 'dhwq' tools = 'null' rules = 'null'></Games>
        </View>
    </>
  )
}


function Placechild(props) {
  const {dispatch} = useContext(globalContext)
  const {state} = useContext(globalContext)
  return (
    <View>

      {props.children.map((children,index)=>{
        // console.log('style:',state.list[children.props.type-1]);
        // console.log('index:',index);
        return (
          <View onTap={()=>{
            dispatch({
              type:`${children.props.type}`,
              value:`${index}`
            })
            }}>
            <GameSelctItem type = {children.props.type} text = {children.props.text}  style = {state.list[children.props.type-1]} index ={index}/>
          </View>
        )
      })}
      
    </View>
  )
}
