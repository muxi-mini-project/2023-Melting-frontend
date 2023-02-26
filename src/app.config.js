export default defineAppConfig({
  pages: [
    'pages/index',
    // 工具箱 界面
    'pages/toolkit/index/index',
    'pages/toolkit/fingerTop/fingerTop',
    'pages/toolkit/dice/dice',
    'pages/toolkit/random/random',
    'pages/toolkit/plate/plate',
    'pages/toolkit/cardTurn/cardTurn',



    // 我的 界面 
    'pages/mine/index/index',
    'pages/mine/about/about',
    'pages/mine/infoEdit/infoEdit',
    'pages/mine/plans/plans',


    // 游戏 界面
    
    'pages/game/index/index',
    'pages/game/details/details',
    'pages/game/gameCard/gameCard',
    

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#b3d4f1',
    navigationBarTitleText: '融冰melting',
    navigationBarTextStyle: 'white'
  },
})
