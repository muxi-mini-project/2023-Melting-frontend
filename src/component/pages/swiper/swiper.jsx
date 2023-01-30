import React, { Component, useState } from 'react'
import { ScrollView , View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './swiper.css'
import { useEffect } from 'react'
 
export default function Swiper(props) {
    const [state, setState] = useState({
        animation: '',
        startX: 0, 
        startY: 0,
        show: true,
      })
     


      const angle = (start, end) => {
        const _X = end.X - start.X
        const _Y = end.Y - start.Y
        return (360 * Math.atan(_Y / _X)) / (2 * Math.PI)
      }
  
  const touchstart = (e) =>  {
    
    setState(previousState => {
        return { ...previousState, startX: e.changedTouches[0].clientX,startY: e.changedTouches[0].clientY, }
      })
  }
 
  
  const touchmove = (e) => {
    const startX = state.startX 
    const startY = state.startY 
    const touchMoveX = e.changedTouches[0].clientX 
    const touchMoveY = e.changedTouches[0].clientY 
    
    const angles = angle(
      { X: startX, Y: startY },
      { X: touchMoveX, Y: touchMoveY }
    )
    console.log(angles);
    
    if (Math.abs(angles) > 30) return
   
    if (touchMoveX > startX) {
      console.log('右滑')
      
      const _animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'linear',
        delay: 100,
        transformOrigin: 'left top 0',
        success: function (res) {
          console.log('chenggong')
        },
      })
 
      _animation.translateX(0).step()
      setState(previousState => {
        return { ...previousState, animation: _animation.export(), }
      })
    } else if (touchMoveX - startX < -10) {
      
      console.log('左滑')
      
      const _animation = Taro.createAnimation({
        duration: 400,
        timingFunction: 'linear',
        delay: 100,
        transformOrigin: 'left top 0',
        success: function (res) {
          console.log(res)
        },
      })
      
      _animation.translateX(-80).step()
      setState(previousState => {
        return { ...previousState, animation: _animation.export(), }
      })
     
    }
  }
 
  
  
 
  
    return (
        <View style={state.show?{display:'block'}:{display:'none'}} className='playbox'>
            <ScrollView className='history' scrollY>
                
                <View className='historyItem' onClick={()=>{
                        setState(previousState => {
                            return { ...previousState, show:false, }
                        })
                    }}>
                <View className='text'>删除</View>
                    {/* 删除 */}
                    <View className='itemDelete right' ></View>
            
                    {/* 遮盖层 */}
                    <View
                        className='itemCover'
                        onTouchStart={touchstart}
                        onTouchEnd={touchmove}
                        animation={state.animation}
                    >
                        {props.children}
                    </View>
                </View>
            </ScrollView>
        </View>
      
    )
  
}