import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,Button,ScrollView,Input} from '@tarojs/components'
import '../../pages/introduction/index.css'
import { useState ,useEffect} from 'react';
import Tag from './tag';
import http from '../../api/http/Http';

let Tags=[]//标签数组

let personalityStr='活泼；宇宙直女；独处最开心；永远在减肥；新奇事物探索家；细腻；粗线条；拖延症；肥宅；感性；学霸；天然呆；话痨；路痴；独立；养生选手；高智商；不讲武德；聪明；理性；佛系；靠谱驴友；戏精；强迫症；钢铁直男；自来熟；谨慎；感染力强；毒舌；吃货；杠精；脑洞大；铁憨憨；文艺青年；逻辑鬼才；社恐；懒癌患者；笑点低；慢热；夜猫子；完美主义者；反射弧长；网抑云；乘风破浪；学渣；勇敢；社恐自闭小孩；行走的解忧杂货店；电瓶车小王子；弹舌口哨响指样样行；每天和宿管斗智斗勇'
let personalityAll=personalityStr.split('；')
for(var i=0;i<personalityAll.length;i++){
    var item={
        content:personalityAll[i],
        type:'personality',//分类
        selected:false,//选中与否
    }
    Tags.push(item)
}
let interestStr='宿舍咖啡师；混饭圈；轰趴专家；香水图鉴；运动神经满分；美妆；心理学；梦想家；coser；行走的美食攻略；相声；热爱文字；剧本杀；探店；声控；手账er；颜控；追番党；小众艺术；票圈摄影师；瑜伽；网游；手游；撸铁狂魔；追网文；搓麻将；撸猫；爱画画；爱k歌；二次元肥宅；摇滚；知晓中华上下五千年；沉迷摇滚；看综艺；电影；古风汉服；日常追剧；AJ控；冥想；学术宅；养多肉；穿搭；护肤达人；养宠物；球类；爱运动；蹦迪'
let interestAll=interestStr.split('；')
for(var i=0;i<interestAll.length;i++){
    var item={
        content:interestAll[i],
        type:'interest',//分类
        selected:false,//选中与否
    }
    Tags.push(item)
}
let experienceStr='穷游过；极限运动；街头拉二胡；跟着综艺学外语；山顶看日出；创建过社团；潜海；疫情摆摊；写过小说；跑过全马/半马；出过画集；看过极光；骑自行车去旅行；玩过乐队；减肥超过20斤；独立旅行过；玩过蹦极；人生的一半都在住校；失传多年的左撇子选手；做过up主；露宿过街头；留学多年'
let experienceAll=experienceStr.split('；')
for(var i=0;i<experienceAll.length;i++){
    var item={
        content:experienceAll[i],
        type:'experience',//分类
        selected:false,//选中与否
    }
    Tags.push(item)
}
let gameStr='欢乐麻将；第五人格；just dance；开心消消乐；金铲铲；王者荣耀；魔兽世界；动森岛主；穿越火线；剑三；双人成行；原神；斗地主；pico；闪耀暖暖；江南百景图；塞尔达传说；和平精英；分手厨房；光·遇；摩尔庄园；糖豆人夹缝生存；音游手残人；跳舞机小触；宝可梦；狼人杀；我的世界；阴阳师；Dota；DNF；炉石传说；明日方舟'
let gameAll=gameStr.split('；')
for(var i=0;i<gameAll.length;i++){
    var item={
        content:gameAll[i],
        type:'game',//分类
        selected:false,//选中与否
    }
    Tags.push(item)
}
let musicStr='什么都听；黑泡；黑胶唱片收藏控；尤克里里；日系纯音乐陪伴生活；后海大鲨鱼；电音；民谣；吃土也要玩乐队；网易云一起听；kpop；走到哪里都能bbox；freestyle；摇滚自由灵魂；livehouse常客；电音；粤语老歌听不腻；五音不全但热爱唱歌；沉迷古典；偏爱欧美流行；坚持做自己的音乐；精通多种乐器'
let musicAll=musicStr.split('；')
for(var i=0;i<musicAll.length;i++){
    var item={
        content:musicAll[i],
        type:'music',//分类
        selected:false,//选中与否
    }
    Tags.push(item)
}
let sportStr='散步；拳击；骑马；射箭；晨跑；保龄球；游泳；网球；篮球；滑雪；街头滑板少年；足球；瑜伽；泡健身房；羽毛球；乒乓球；颠球小天才；每周必举铁；徒步爱好者；野球场球王'
let sportAll=sportStr.split('；')
for(var i=0;i<sportAll.length;i++){
    var item={
        content:sportAll[i],
        type:'sport',//分类
        selected:false,//选中与否
    }
    Tags.push(item)
}
let activityStr='相声演出；舞台剧；户外露营；KTV；酒吧蹦迪；逛街shopping；美食聚餐；密室；桌游；脱口秀；线下剧本杀；艺术展览；电影院；城市徒步；livehouse'
let activityAll=activityStr.split('；')
for(var i=0;i<activityAll.length;i++){
    var item={
        content:activityAll[i],
        type:'activity',//分类
        selected:false,//选中与否
    }
    Tags.push(item)
}
let two_dimensionStr='ACG通吃；出没各种漫展；轻小说；家中摆满手办；咒术回战；老jo厨了；史莱姆；京阿尼yyds；Clannad；小排球一生推；白学家；一人之下；灵能百分百；弹幕即本体；全职高手；喜欢热血漫；比起追番更爱读原作漫画；乙女番赛高；老番考古学家；汉化组打杂工；新海诚；动漫；海贼王；灌篮高手；ACG配音大佬；看动漫只为声优；凉宫春日的忧郁；数码宝贝；Lolita；JK制服；假面骑士'
let two_dimensionAll=two_dimensionStr.split('；')
for(var i=0;i<two_dimensionAll.length;i++){
    var item={
        content:two_dimensionAll[i],
        type:'two_dimension',//分类
        selected:false,//选中与否
    }
    Tags.push(item)
}


export default function Srollbox(props){
    const [allTags,setallTag]=useState(Tags)//所有标签
    const [TagshowKind,setTagshowKind]=useState('personality')//标签类别
    const [Inputvalue,setInputvalue]=useState('')
    
    function changeSelected(tag){  
        const newTag=allTags.map((item)=>{
            if(item===tag){
                if(tagnum<5){item.selected=!item.selected;return item} 
                if(tagnum===5){
                    if(item.selected){item.selected=!item.selected;return item}
                    if(!item.selected){return item}
                }
            }
            else return item
        })
        setallTag(newTag);
    }//选择标签
    function addSelf(e){
        if(tagnum<5&&e.detail.value!=''){
        let selftag={
            content:e.detail.value,
            type:'slef',
            selected:true,
        }
        setInputvalue('')
        let nowTags=allTags
        setallTag(nowTags.push(selftag))
        setallTag(allTags.concat(allTags.concat+1))
    }}//自定义标签
    var selecedTags=allTags.filter((tag)=>{if(tag.selected){return tag}})//已选标签
    var tagnum=selecedTags.length
    const setpushtagsignal=props.setpushtagsignal
    if( props.pushtagsignal){
        let selecedTagsContent=[]
        for(var a=0;a<selecedTags.length;a++){
            selecedTagsContent.push(selecedTags[a].content)
        }
        http({
            url:'http://116.204.121.9:65000/api/v1/users',
            method:'put',
            data:{'tag':selecedTagsContent.toString()}
        })
        setpushtagsignal(false)
}
    return(
    <View>
        <ScrollView className='selectedTagBox' scrollY='true' style={{display:props.model=='show'?"":"none"}}>
            <View >
                {selecedTags.map((tag)=>{return tag.selected?<Tag tag={tag} changeSelected={changeSelected}></Tag>:''})}
                <View ><Input value={Inputvalue} className='tag' placeholder='+自定义' maxlength='8' onBlur={addSelf} style={{width:'50px'}}></Input></View>
            </View>
        </ScrollView>
        
            <View className='Srollbox' style={{height:props.height}}>
            <ScrollView className='tagKindbox' scrollX='true'>
                <View className="tagKind"style={{borderBottom:TagshowKind=='personality'?'2px solid #BDD8F0':''}} onClick={()=>{setTagshowKind('personality')}}>性格特质</View>
                <View className="tagKind"style={{borderBottom:TagshowKind=='interest'?'2px solid #BDD8F0':''}}  onClick={()=>{setTagshowKind('interest')}}>兴趣</View>
                <View className="tagKind"style={{borderBottom:TagshowKind=='experience'?'2px solid #BDD8F0':''}}  onClick={()=>{setTagshowKind('experience')}}>经历</View>
                <View className="tagKind"style={{borderBottom:TagshowKind=='game'?'2px solid #BDD8F0':''}}  onClick={()=>{setTagshowKind('game')}}>游戏</View>
                <View className="tagKind"style={{borderBottom:TagshowKind=='music'?'2px solid #BDD8F0':''}}  onClick={()=>{setTagshowKind('music')}}>音乐</View>
                <View className="tagKind"style={{borderBottom:TagshowKind=='sport'?'2px solid #BDD8F0':''}}  onClick={()=>{setTagshowKind('sport')}}>运动</View>
                <View className="tagKind"style={{borderBottom:TagshowKind=='activity'?'2px solid #BDD8F0':''}}  onClick={()=>{setTagshowKind('activity')}}>线下活动</View>
                <View className="tagKind"style={{borderBottom:TagshowKind=='two_dimension'?'2px solid #BDD8F0':''}}  onClick={()=>{setTagshowKind('two_dimension')}}>二次元</View>
            </ScrollView>
            <ScrollView className='tagshowbox' scrollY='true'>
                {allTags.map((tag)=>{if(tag.type==TagshowKind) {return<Tag tag={tag} changeSelected={changeSelected}></Tag>}})}
            </ScrollView>
            <Text className='tagTipBottom' style={{display:props.tipnotshow?'none':''}}>在结果预览中可以自定义哦~</Text>
        </View>
    </View>
    )
}

/*性格特质
活泼；宇宙直女；独处最开心；永远在减肥；新奇事物探索家；细腻；粗线条；拖延症；肥宅；感性；学霸；天然呆；话痨；路痴；独立；养生选手；高智商；不讲武德；聪明；理性；佛系；靠谱驴友；戏精；强迫症；钢铁直男；自来熟；谨慎；感染力强；毒舌；吃货；杠精；脑洞大；铁憨憨；文艺青年；逻辑鬼才；社恐；懒癌患者；笑点低；慢热；夜猫子；完美主义者；反射弧长；网抑云；乘风破浪；学渣；勇敢；社恐自闭小孩；行走的解忧杂货店；电瓶车小王子；弹舌口哨响指样样行；每天和宿管斗智斗勇.
兴趣
宿舍咖啡师；混饭圈；轰趴专家；香水图鉴；运动神经满分；美妆；心理学；梦想家；coser；行走的美食攻略；相声；热爱文字；剧本杀；探店；声控；手账er；颜控；追番党；小众艺术；票圈摄影师；瑜伽；网游；手游；撸铁狂魔；追网文；搓麻将；撸猫；爱画画；爱k歌；二次元肥宅；摇滚；知晓中华上下五千年；沉迷摇滚；看综艺；电影；古风汉服；日常追剧；AJ控；冥想；学术宅；养多肉；穿搭；护肤达人；养宠物；球类；爱运动；蹦迪.
特殊经历
穷游过；极限运动；街头拉二胡；跟着综艺学外语；山顶看日出；创建过社团；潜海；疫情摆摊；写过小说；跑过全马/半马；出过画集；看过极光；骑自行车去旅行；玩过乐队；减肥超过20斤；独立旅行过；玩过蹦极；人生的一半都在住校；失传多年的左撇子选手；做过up主；露宿过街头；留学多年.
游戏
欢乐麻将；第五人格；just dance；开心消消乐；金铲铲；王者荣耀；魔兽世界；动森岛主；穿越火线；剑三；双人成行；原神；斗地主；pico；闪耀暖暖；江南百景图；塞尔达传说；和平精英；分手厨房；光·遇；摩尔庄园；糖豆人夹缝生存；音游手残人；跳舞机小触；宝可梦；狼人杀；我的世界；阴阳师；Dota；DNF；炉石传说；明日方舟.
音乐
什么都听；黑泡；黑胶唱片收藏控；尤克里里；日系纯音乐陪伴生活；后海大鲨鱼；电音；民谣；吃土也要玩乐队；网易云一起听；kpop；走到哪里都能bbox；freestyle；摇滚自由灵魂；livehouse常客；电音；粤语老歌听不腻；五音不全但热爱唱歌；沉迷古典；偏爱欧美流行；坚持做自己的音乐；精通多种乐器.
运动
散步；拳击；骑马；射箭；晨跑；保龄球；游泳；网球；篮球；滑雪；街头滑板少年；足球；瑜伽；泡健身房；羽毛球；乒乓球；颠球小天才；每周必举铁；徒步爱好者；野球场球王.
线下兴趣活动
相声演出；舞台剧；户外露营；KTV；酒吧蹦迪；逛街shopping；美食聚餐；密室；桌游；脱口秀；线下剧本杀；艺术展览；电影院；城市徒步；livehouse.
二次元
ACG通吃；出没各种漫展；轻小说；家中摆满手办；咒术回战；老jo厨了；史莱姆；京阿尼yyds；Clannad；小排球一生推；白学家；一人之下；灵能百分百；弹幕即本体；全职高手；喜欢热血漫；比起追番更爱读原作漫画；乙女番赛高；老番考古学家；汉化组打杂工；新海诚；动漫；海贼王；灌篮高手；ACG配音大佬；看动漫只为声优；凉宫春日的忧郁；数码宝贝；Lolita；JK制服；假面骑士*/