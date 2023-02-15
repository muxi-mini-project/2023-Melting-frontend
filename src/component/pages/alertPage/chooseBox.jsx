import React from 'react'
import { useState } from 'react'
import { View, Image } from '@tarojs/components'
import './alertPage.css'
import Taro from '@tarojs/taro'

export  default function ChooseBox(props) {
    const [states, setstates] = useState(false)
    const [selected, setselected] = useState()
    const {list, objList, title} = props
    // const {state} = useContext(globalContext)
    // console.log(state);
    return (
      <View className='gameselectbox' >
  
          {/* 标题栏 */}
          <View className='headtit'>
  
              <View onClick={()=>{
                setstates(!states)
              }}>
                  {title}
                  <Image src={require('../../../image/game/arrowdown.png')} className = 'gameselectimg'></Image>
              </View>
              
          </View>
          
          {/* 选项卡 */}
          <View className={states?'boxofchildren':'boxofchildrenalt'}>
             {list.map((item,index)=>{
                return <View className={(index === selected)?'gameselectitem custom ':'gameselectitem alter'}  onClick={()=>{
                    setselected(index)
                    // console.log('sele',item);
                    objList.splice(props.index+1,1,item)
                    Taro.setStorageSync('key',objList)
                    // console.log('getstoragelist:',Taro.getStorageSync('key'));
                }}>{item}</View>
             })}
          </View>
        
      </View>
    )
  }