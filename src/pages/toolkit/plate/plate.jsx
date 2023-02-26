import React, { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {useReady} from '@tarojs/taro'
import './plate.css'

export default function plate() {
  const [startDeg, setstartDeg] = useState(0)
  const [rotateDegree, setrotateDegree] = useState(0)
  const giftArr = [
    {giftName: 'iphone xs'},
    {giftName: '小米智能音箱'},
    {giftName: 'ThinkPad X390 LTE版'},
    {giftName: 'air pods 2'},
    {giftName: '雷蛇鼠标'}
  ]
  const deg = [[1, 59], [61, 119], [121, 179], [181, 239], [241, 299], [301, 359]] 
  const randomNum = (minNum, maxNum) => {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  } 
 
  const handleClick = () => {
    const giftIndex = randomNum(0, 5)
    const targetDegree = randomNum(deg[giftIndex][0], deg[giftIndex][1])
    let rotateDeg = 0
        // 递归计算下次要转到的度数
        let i = 0
        const _fn = (n = 0) => {
            if (targetDegree + 360 * n > startDeg) {
                rotateDeg = targetDegree + 360 * n
            } else {
                i++
                _fn(i)
            }
        }
    _fn()
    setstartDeg(rotateDeg + 360*10)
    setrotateDegree(rotateDeg)
  }
  

  return (
    <>
      <View className='turntable' style={{transition:'all 6500ms',transform:`rotate(${rotateDegree}deg)`}}>1</View>
      <View className='pointer' onClick={handleClick}>1</View>
    </>
  )
}