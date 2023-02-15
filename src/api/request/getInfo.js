import React from 'react'
import Request from './Request'
import SimpleRequest from './Put'
import Taro from '@tarojs/taro'

export default function getInfo(Token,method,url, body) {
  let timer = null
  let InfoList = []
  const InfoData = () => Request(method,url,Token,body)
  if(!Token) {
    timer = setInterval(() => {
       Token = Taro.getStorageSync('token')      
      if(Token) {
        clearInterval(timer)
        InfoData()
        console.log(Taro.getStorageSync('list'));
      }
    }, 2000);
  } else {
    InfoList =InfoData()
    InfoData()
    console.log(Taro.getStorageSync('list'));
  }
  return {Token:Token,list:Taro.getStorageSync('list')}
   
  
  
}
