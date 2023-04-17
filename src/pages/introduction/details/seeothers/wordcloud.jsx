import React from 'react'
import { View,ScrollView} from '@tarojs/components'
import '../../index.css'


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
function randomColor() {
  var col = "#";
  for (var i = 0; i < 6; i++) col+=parseInt(Math.random() * 16).toString(16);
  return col;
}
function Word(props){
  const a=getRandomInt(1,20)
  const b=getRandomInt(5,9)
  return(
      <View className='item' style={{transform:a%3==0?'':'rotate(-45deg)',
                                    fontSize:a%3==0?`${b*5}px`:`${b*3}px`,
                                    color:randomColor(),
                                    fontWeight:'800',
                                    display:'inlineFlex'}}>
        {props.content}</View>
  )
}


export default function Wordcloud(props){
let tagsword=props.tagsword
//let copy=tagsword
//let tagsword=['java','学习','干饭干饭干饭','CSGO','二次元','篮球','跑步','不吃肉会死','188','可爱小正太','出没各种漫展','黑胶唱片收藏控','穿越火线','王者荣耀','混饭圈','永远在减肥','咒术回战','老jo厨了','酒吧蹦迪','乒乓球','Python','C++','高数不挂','NBA','KTV','吉他guitar','新海诚','原神','单机游戏','steam','火影忍者']
tagsword.sort(function(){return Math.random()>0.5?-1:1;})//乱序排列
  return(

      <View className='wordcloudbox'
          onClick={()=>{props.setshow(false)}}>
        <View>{tagsword.map((word)=>{
          return<Word content={word} ></Word>
        })}
        </View>
      </View>
  )
}