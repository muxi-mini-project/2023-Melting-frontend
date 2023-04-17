import Taro from '@tarojs/taro'
import React from 'react'
import { View, Text ,Image,} from '@tarojs/components'
import '../../pages/introduction/index.css'
import { useState ,useEffect} from 'react';
import http from '../../api/http/Http';
import Tag from './tag';


export default function Perbox(props){
    const [userinfo,setuserinfo]=useState([])
    const [tag,settag]=useState([])
    useEffect(()=>{
    http({
        url:`https://www.melting-muxi.xyz:65000/api/v1/user?id=${props.uid.trim()}`,
        method:'get',
    }).then(data=>{setuserinfo(data);settag(data.tag.split(',').map((tag)=>{return {content:tag,selected:true}}));
    props.settagsword((prev)=>{let newarr=prev.concat(data.tag.split(','));return newarr})
})
},[])
    return(
        <View className='personbox'>
            <View className='photo_name'>            
                <Image src={`http://${userinfo.photo}`} ></Image>
                <View className='name_description'>{userinfo.description}</View>
            </View>
            <View className='line'></View>

            <View className='Tags_box_per_big'>  
                <View className='Tags_box_per'>
                    {tag.map((tag)=>{return <Tag tag={tag} />})}
                </View>
            </View>  
        </View>
    )
}