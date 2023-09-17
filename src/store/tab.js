export default{
    state:{
        isCollapse:false,//用于控制菜单的张开收起
         tablist:[{
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
          }]
    },
    mutations:{
        //xiugai
        CollapseMenu(state){state.isCollapse=!state.isCollapse},
       selectMenu(state,val){
        if(val.name !== 'home'){
           const index= state.tablist.findIndex(item=>item.name===val.name)
           if(index===-1){
          state.tablist.push(val)
           }
        }
       }
    }
}