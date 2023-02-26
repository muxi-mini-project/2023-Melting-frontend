import React, { useState } from 'react'
import { View } from '@tarojs/components'
import './random.css'

export default function random() {
  const [random, setrandom] = useState(0)
  let list = [1,2,3,4,5,6,7,8,9]
  function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const handleClick = () => {
   setrandom(getRandomNumber(0,8));
  }
  return (
    <View onClick={()=>handleClick()}>
      <View class="random-box">
        <View class="randombox-item">
          {list.map((item) => {
            return <View className='.span' style={{transform:`translate(-50%,-${random * 10}vh)`,transition:'all 2000ms'}}>{item}</View>
          })}
        </View>
      </View>
    </View>
  )
}