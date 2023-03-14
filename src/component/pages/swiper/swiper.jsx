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
    const [deletable, setdelete] = useState(false)
     


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
    
    if (Math.abs(angles) > 30) return
   
    if (touchMoveX > startX) {
      const _animation = Taro.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out',
        delay: 0,
        transformOrigin: 'left top 0',
      })
 
      _animation.translateX(0).step()
      setState(previousState => {
        return { ...previousState, animation: _animation.export(), }
      })
      setdelete(false)
    } else if (touchMoveX - startX < -10) {
      
      const _animation = Taro.createAnimation({
        duration: 300,
        timingFunction: 'ease-in-out',
        delay: 0,
        transformOrigin: 'left top 0',
      })
      
      _animation.translateX(-80).step()
      setState(previousState => {
        return { ...previousState, animation: _animation.export(), }
      })
      setdelete(true)
     
    }
  }
 
  const handleClick = () => {
   
      setState(previousState => {
        return { ...previousState, show:false, }
    })
   

  }
  
 
  
    return (
        <View style={state.show?{display:'block'}:{display:'none'}} className='playbox'>
            <View className='history' >
              {deletable?<View className='text' onClick={()=>{handleClick()}}>{'点我删除'}</View>:''}
              <View className='historyItem' >
                {/* <View className='itemDelete right' onClick={()=>{props.moveable?handleClick():''}}></View> */}
                <View
                  className='itemCover'
                  onTouchStart={touchstart}
                  onTouchEnd={touchmove}
                  animation={props.moveable?state.animation:''}>
                  {props.children}
                </View>
              </View>
            </View>
        </View>
      
    )
  
}