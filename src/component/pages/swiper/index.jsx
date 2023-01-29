import React, { Component, useState } from 'react'
import { ScrollView , View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.css'
import { useEffect } from 'react'
 
export default function Swiper(props) {
    const [state, setState] = useState({
        animation: '',
        startX: 0, // 开始坐标
        startY: 0,
        show: true,
      })
     
//   state = {
//     animation: '',
//     startX: 0, // 开始坐标
//     startY: 0,
//     show: true,
//   }
//   componentDidMount() {
//     // 页面渲染完成
//     // 实例化一个动画
//     // const animation = Taro.createAnimation({
//     //   duration: 400,
//     //   timingFunction: 'linear',
//     //   delay: 100,
//     //   transformOrigin: 'left top 0',
//     //   success: function (res) {
//     //     console.log(res)
//     //   },
//     // })
 
//     // this.setState({
//     //   animation: animation,
//     // })
//   }
    //   useEffect(() => {
    //     const animation = Taro.createAnimation({
    //         duration: 400,
    //         timingFunction: 'linear',
    //         delay: 100,
    //         transformOrigin: 'left top 0',
    //         success: function (res) {
    //           console.log(res)
    //         },
    //       })
       
    //       setState(previousState => {
    //         return { ...previousState, animation: animation }
    //       })
    //   })
    // const animation = Taro.createAnimation({
    //     duration: 400,
    //     timingFunction: 'linear',
    //     delay: 100,
    //     transformOrigin: 'left top 0',
    //     success: function (res) {
    //       console.log(res)
    //     },
    //   })
   
    //   setState(previousState => {
    //     return { ...previousState, animation: animation }
    //   })
 /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
      const angle = (start, end) => {
        const _X = end.X - start.X
        const _Y = end.Y - start.Y
        // 返回角度 /Math.atan()返回数字的反正切值
        return (360 * Math.atan(_Y / _X)) / (2 * Math.PI)
      }
  // 滑动开始
  const touchstart = (e) =>  {
    // console.log(e.changedTouches[0].clientX);
    // setState({
    //   startX: e.changedTouches[0].clientX,
    //   startY: e.changedTouches[0].clientY,
    // })
    setState(previousState => {
        return { ...previousState, startX: e.changedTouches[0].clientX,startY: e.changedTouches[0].clientY, }
      })
  }
 
  // 滑动事件处理 _index当前索引
  const touchmove = (e) => {
    const startX = state.startX // 开始X坐标
    const startY = state.startY // 开始Y坐标
    const touchMoveX = e.changedTouches[0].clientX // 滑动变化坐标
    const touchMoveY = e.changedTouches[0].clientY // 滑动变化坐标
    // console.log(state.startX);
    // var isLeft = _class.indexOf("leftMove") != -1; //往左滑的位置
    // var isRight = _class.indexOf("rightMove") != -1;//往右滑的位置
 
    // 获取滑动角度
    const angles = angle(
      { X: startX, Y: startY },
      { X: touchMoveX, Y: touchMoveY }
    )
    console.log(angles);
    // 滑动超过30度角 return
    if (Math.abs(angles) > 30) return
    // 右滑
    if (touchMoveX > startX) {
      console.log('右滑')
      // 实例化一个动画
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
      // 左滑
      console.log('左滑')
      // 实例化一个动画
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