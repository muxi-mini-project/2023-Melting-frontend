import Taro from '@tarojs/taro'

export default async  function Put(url,Token,body) {
 
    let list = []
      list = await Taro.request({
          url: 'http://116.204.121.9:65000/api/v1'+url, 
          method: 'put',
          header: {
            'Authorization': Token?Token:'',
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          data: JSON.stringify(body),
    }).then(res =>res.data.data)
    // console.log('request',list);
 return list
}
