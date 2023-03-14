export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/index/second/index',
    //初始页面
    'pages/index/createNew/index',
    //创建新项目
    'pages/preparation/index',
    //主跳转页面
    'pages/planing/index',
    //step1
    'pages/introduction/index',
    'pages/introduction/details/preview/preview',
    'pages/introduction/details/seeothers/seeothers',
    //step2//参与者
    'pages/toolkit/index/index',
    //'pages/toolkit/fingerTop/fingerTop',
    //'pages/toolkit/dice/dice',
    'pages/toolkit/random/random',
    'pages/toolkit/plate/plate',
    //'pages/toolkit/cardTurn/cardTurn',
    //工具箱
    'pages/mine/index/index',
    'pages/mine/about/about',
    'pages/mine/infoEdit/infoEdit',
    'pages/mine/plans/plans',
    // 我的 界面 

    
    'pages/game/index/index',
    'pages/game/details/details',
    'pages/game/gameCard/gameCard',
    
    // 游戏 界面
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
    navigationStyle:"custom",
    //enablePullDownRefresh:'true'
  }
})
